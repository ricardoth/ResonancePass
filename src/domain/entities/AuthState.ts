export interface User {
    name: string;
    email: string;
}

export interface AuthState {
    logged: boolean;
    user: User | null;
}

export type AuthAction = 
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };