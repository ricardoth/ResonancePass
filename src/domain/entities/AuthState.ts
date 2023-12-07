export interface AuthState {
    logged: boolean;
    user: any;
}

export type AuthAction = 
    | { type: 'LOGIN'; payload: any }
    | { type: 'LOGOUT';  };