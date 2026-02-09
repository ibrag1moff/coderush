import { useAppDispatch } from "@/hooks/redux";
import { firebaseAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CustomLoading } from "@/components/CustomLoading";
import { logout, setUser } from "@/features/auth/authSlice";

export const AuthListener = () => {
  const [, setCookie, removeCookie] = useCookies(["user_token"]);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(
          setUser({
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            metadata: {
              creationTime: user.metadata.creationTime!,
              lastSignInTime: user.metadata.lastSignInTime!,
            },
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
          }),
        );
        setCookie("user_token", token, { path: "/", maxAge: 60 * 60 * 24 * 7 });
      } else {
        dispatch(logout());
        removeCookie("user_token");
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) return <CustomLoading />;

  return null;
};
