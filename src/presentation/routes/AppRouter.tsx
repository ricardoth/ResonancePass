import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { LoginScreen } from "../pages/login/LoginScreen"
import { HomeRoutes } from "./HomeRoutes"
import { ShopTicket } from "../pages/buys/ShopTicket"
import { ConfirmShop } from "../pages/buys/ConfirmShop"
import { PrivateRoute } from "./PrivateRoute"
import { RouteHistoryProvider } from "../context/historyContext"
import { MyTickets } from "../pages/tickets/MyTickets"
import { AccountTabs } from "../pages/account/AccountTabs"
import { SuccessShop } from "../pages/responseShop/SuccessShop"
import { FailureShop } from "../pages/responseShop/FailureShop"
import { PendingShop } from "../pages/responseShop/PendingShop"

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
                        path="/carro/:eventName" 
                        element={
                            <PrivateRoute>
                                <ShopTicket />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/confirmShop/:eventName" 
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

                    <Route 
                        path="/misDatos" 
                        element={
                            <PrivateRoute>
                                <AccountTabs />
                            </PrivateRoute>
                        }
                    />

                    <Route 
                        path="/successShop" 
                        element={
                            <PrivateRoute>
                                <SuccessShop />
                            </PrivateRoute>
                        }
                    />

                    <Route 
                        path="/failureShop" 
                        element={
                            <PrivateRoute>
                                <FailureShop />
                            </PrivateRoute>
                        }
                    />

                    <Route 
                        path="/pendingShop" 
                        element={
                            <PrivateRoute>
                                <PendingShop />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </RouteHistoryProvider>
        </BrowserRouter>
    )
}
