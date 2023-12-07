import { AuthAction, AuthState } from "../../entities/AuthState";

export interface AuthContextProps {
    loginState: AuthState;
    dispatchLoginState: React.Dispatch<AuthAction>;
}