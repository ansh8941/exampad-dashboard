export interface LoginRequest {
  email: string;
  password: string;
}

export interface InitialState {
  isAuthanticate: boolean;
}

export interface AuthState {
  user?: null | any;
  access_token: null | string;
}

export interface LoginResponse {
  accessToken: string;
}
