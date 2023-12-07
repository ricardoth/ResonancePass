import { AuthAction, AuthState } from "../../entities/AuthState";

export interface AuthContextProps {
    loginState: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}