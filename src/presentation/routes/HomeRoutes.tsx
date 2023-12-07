import { Route, Routes } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"
import { LayoutEvent } from "../pages/layoutEvents/LayoutEvent"
import { CarouselEvent } from "../components/carouselEvent/CarouselEvent"

export const HomeRoutes = () => {
    return (
        <>
            <Navbar />
            <CarouselEvent />

            <div>
                <Routes>
                    <Route path="/*" element={ <LayoutEvent /> } />
                </Routes>
            </div>
        </>
    )
}
