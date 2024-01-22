import { ToastContainer } from "react-toastify";
import { AppRouter } from "./presentation/routes/AppRouter";
import { AuthProvider } from "./presentation/context/authContext";
import { useEffect, useReducer } from "react";
import { authReducer } from "./application/reducers/authReducer";
import { TicketProvider } from "./presentation/context/ticketContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { environment } from "./environment/environment.dev";

const init = () => {
    //localStorage.clear();
    let user;
    const loginState = localStorage.getItem('loginState');
 
    try {
        user = loginState ? JSON.parse(loginState) : null;
    } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
    }
    return user || { logged: false };
}

function ResonanceApp() {
    const [ user ] = useReducer(authReducer, undefined, init);

    useEffect(() => {
        if (!user) return;

        // if(loginState.logged) {
        //     const basicInfoUser: any = {
        //         type: types.login,
        //         payload: user.user
        //     }
        //     console.log(basicInfoUser)
        //    localStorage.setItem('user', JSON.stringify(user));
            
        // }
    }, [user]);

    return (
        <>
            <AuthProvider>
                <TicketProvider>
                    <PayPalScriptProvider 
                    options={{
                        clientId: environment.PUBLIC_KEY_PAYPAL,
                        currency: 'CLP'
                    }}>
                        <AppRouter />
                    </PayPalScriptProvider>
                </TicketProvider>
            </AuthProvider>
            
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
                />
            {/* <ToastContainer /> */}
        </>
    )
}

export default ResonanceApp;