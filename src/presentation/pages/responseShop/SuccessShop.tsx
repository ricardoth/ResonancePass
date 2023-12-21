import { useLocation } from "react-router-dom"
import { NavbarEvent } from "../../components/navbar/NavBarEvent"

export const SuccessShop = () => {
    const location = useLocation();
    console.log(location)
    return (

        <>
            <NavbarEvent />
            <div>SuccessShop</div>
        </>
        
    )
}
