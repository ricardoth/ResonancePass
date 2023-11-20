import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { LoginScreen } from "../pages/login/LoginScreen"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginScreen />
                        </PublicRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
