import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { notify } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { logout, setUser } from "@/features/auth/authSlice";
import { FirebaseError } from "@firebase/app";

const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
};

type Provider = keyof typeof providers;

export const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies(["user_token"]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogin = async (provider: Provider) => {
    setIsLoading(true);
    try {
      const { user } = await signInWithPopup(firebaseAuth, providers[provider]);
      const firebaseToken = await user.getIdToken();

      if (firebaseToken) {
        setCookie("user_token", firebaseToken, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      dispatch(
        setUser({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          metadata: user.metadata,
          phoneNumber: user.phoneNumber,
          photoUrl: user.photoURL,
        }),
      );

      notify.success("Signed in successfully");
      router.push("/");
    } catch (e) {
      console.log("Login Error", e);
      notify.error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    setIsLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      const firebaseToken = await user.getIdToken();

      if (firebaseToken) {
        setCookie("user_token", firebaseToken, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      dispatch(
        setUser({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          metadata: user.metadata,
          phoneNumber: user.phoneNumber,
          photoUrl: user.photoURL,
        }),
      );

      notify.success("Logged in successfully");
      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("Email login error", e);

        if (e.code === "auth/invalid-credential") {
          notify.error("Email or password is incorrect");
        } else if (e.code === "auth/user-not-found") {
          notify.error("User not found");
        } else {
          notify.error("Login failed");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    dispatch(logout());
    removeCookie("user_token");
    router.push("/login");
    notify.success("Logged out successfully");
  };

  return {
    isLoading,
    handleGoogleLogin: () => handleLogin("google"),
    handleGithubLogin: () => handleLogin("github"),
    handleLoginWithEmailAndPassword,
    handleLogout,
  };
};
