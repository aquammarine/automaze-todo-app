interface UserProfile {
  id: string;
  email: string;
}

export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
}
