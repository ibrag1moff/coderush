import { UserProfile } from "@/components/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <>
      <UserProfile />
    </>
  );
}
