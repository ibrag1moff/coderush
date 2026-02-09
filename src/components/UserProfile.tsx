"use client";
import Image from "next/image";
import { useAppSelector } from "@/hooks/redux";
import { ProfileItem } from "@/components/ProfileItem";
import { StatItem } from "@/components/StatItem";

export const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white">
          {user.photoUrl ? (
            <Image
              src={user.photoUrl}
              alt="User avatar"
              fill
              className="object-cover"
            />
          ) : (
            (user.displayName?.charAt(0).toUpperCase() ?? "U")
          )}
        </div>

        {/* Basic info */}
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100">
            {user.displayName ?? "Anonymous typist"}
          </h1>
          <p className="text-neutral-400">{user.email ?? "-"}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-neutral-800" />

      {/* Profile details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProfileItem label="User ID" value={user.id} />
        <ProfileItem
          label="Account created"
          value={
            user.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "-"
          }
        />
        <ProfileItem
          label="Last login"
          value={
            user.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
              : "-"
          }
        />
        <ProfileItem label="Phone number" value={user.phoneNumber ?? "-"} />
      </div>

      {/* Typing stats placeholder */}
      <div className="mt-10 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-100">
          Typing stats
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatItem label="Avg WPM" value="—" />
          <StatItem label="Best WPM" value="—" />
          <StatItem label="Accuracy" value="—" />
          <StatItem label="Tests taken" value="—" />
        </div>
      </div>
    </div>
  );
};
