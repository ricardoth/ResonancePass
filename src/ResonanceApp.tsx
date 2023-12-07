import { ToastContainer } from "react-toastify";
import { AppRouter } from "./presentation/routes/AppRouter";
import { AuthProvider } from "./presentation/context/authContext";
import { useEffect, useReducer } from "react";
import { authReducer } from "./application/reducers/authReducer";

const init: any = () => {
    console.log(localStorage)
    // return JSON.parse(localStorage.getItem('user')) || { logged: false };
    return { logged: false };
}

const ola: any = {};

function ResonanceApp() {
    const [ loginState, dispatch ] = useReducer(authReducer, ola, init);

    useEffect(() => {
        console.log(loginState)
    }, [loginState]);

    return (
        <>
            <AuthProvider>
                <AppRouter />
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
                theme="dark"
                />
            <ToastContainer />
        </>
    )
}

export default ResonanceApp;