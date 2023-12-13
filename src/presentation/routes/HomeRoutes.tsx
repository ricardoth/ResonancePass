import { Route, Routes } from "react-router-dom"
import { LayoutEvent } from "../pages/layoutEvents/LayoutEvent"
import { EventScreen } from "../pages/event/EventScreen"
import { RegisterPage } from "../pages/account/RegisterPage"
import { ResetPassword } from "../pages/account/ResetPassword"

export const HomeRoutes = () => {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/*" element={ <LayoutEvent /> } />
                    <Route path="/eventScreen" element={ <EventScreen /> } />
                    <Route path="/registerPage" element={ <RegisterPage /> } />
                    <Route path="/resetPassword" element={ <ResetPassword /> } />
                </Routes>
            </div>
        </>
    )
}
