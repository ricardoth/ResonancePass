import { Route, Routes } from "react-router-dom"
import { LayoutEvent } from "../pages/layoutEvents/LayoutEvent"
import { EventScreen } from "../pages/event/EventScreen"
import { RegisterPage } from "../pages/account/RegisterPage"
import { ResetPassword } from "../pages/account/ResetPassword"
import { WorkWithUs } from "../pages/home/WorkWithUs"
import { ContactPage } from "../pages/home/ContactPage"
import { TermsConditionsPage } from "../pages/home/TermsConditionsPage"

export const HomeRoutes = () => {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/*" element={ <LayoutEvent /> } />
                    <Route path="/eventos/:eventName" element={ <EventScreen /> } />
                    <Route path="/registerPage" element={ <RegisterPage /> } />
                    <Route path="/resetPassword" element={ <ResetPassword /> } />

                    <Route path="/workWithUs" element={ <WorkWithUs /> } />
                    <Route path="/contactPage" element={ <ContactPage /> } />
                    <Route path="/termsAndCondition" element={ <TermsConditionsPage /> } />
                </Routes>
            </div>
        </>
    )
}
