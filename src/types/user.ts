export interface UserMetadataPlain {
  creationTime: string | null;
  lastSignInTime: string | null;
}

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  metadata: UserMetadataPlain | null;
  phoneNumber: string | null;
  photoUrl: string | null;
}
