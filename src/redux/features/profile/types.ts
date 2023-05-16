export interface ProfileRequest {
  email: string;
  id: string;
}

export interface MeResponse {
  email: string;
  id: string;
}

export interface ProfileResponse {
  bio?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  user?: {
    email?: string;
  };
}

export interface Profile {
  bio?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
}
export interface InitialState {
  authProfile: Profile;
}
