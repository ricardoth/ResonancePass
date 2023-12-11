import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { LoginScreen } from "../pages/login/LoginScreen"
import { HomeRoutes } from "./HomeRoutes"
import { EventScreen } from "../pages/event/EventScreen"
import { ShopTicket } from "../pages/buys/ShopTicket"
import { ConfirmShop } from "../pages/buys/ConfirmShop"
import { PrivateRoute } from "./PrivateRoute"
import { ChangePassword } from "../pages/account/ChangePassword"
import { RouteHistoryProvider } from "../context/historyContext"
import { MyTickets } from "../pages/tickets/MyTickets"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <RouteHistoryProvider>
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
                    path="/changePassword"
                    element={
                        <PrivateRoute>
                            <ChangePassword />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/carro" 
                    element={
                        <PrivateRoute>
                            <ShopTicket />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/confirmShop" 
                    element={
                        <PrivateRoute>
                            <ConfirmShop />
                        </PrivateRoute>
                    }
                />

                <Route 
                    path="/misTickets" 
                    element={
                        <PrivateRoute>
                            <MyTickets />
                        </PrivateRoute>
                    }
                />

            </Routes>
            </RouteHistoryProvider>
        </BrowserRouter>
    )
}
