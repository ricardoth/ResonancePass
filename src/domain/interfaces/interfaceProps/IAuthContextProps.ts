import { AuthAction, AuthState } from "../../entities/AuthState";

export interface AuthContextProps {
    userState: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}