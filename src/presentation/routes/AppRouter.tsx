import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { LoginScreen } from "../pages/login/LoginScreen"
import { HomeRoutes } from "./HomeRoutes"
import { EventScreen } from "../pages/event/EventScreen"
import { ShopTicket } from "../pages/buys/ShopTicket"

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

                <Route 
                    path="/*"
                    element={
                        <PublicRoute>
                            <HomeRoutes />
                        </PublicRoute>
                    }
                />

                <Route 
                    path="/eventScreen"
                    element={
                        <PublicRoute>
                            <EventScreen />
                        </PublicRoute>
                    }
                /> 

                <Route
                    path="/carro" 
                    element={
                        <PublicRoute>
                            <ShopTicket />
                        </PublicRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
