import { ToastContainer } from "react-toastify";
import { AppRouter } from "./presentation/routes/AppRouter";
import { AuthContext, AuthProvider } from "./presentation/context/authContext";
import { useContext, useEffect, useReducer } from "react";
import { authReducer } from "./application/reducers/authReducer";
// import { types } from "./types/types";

const init = () => {
    //localStorage.clear();
    let user;
    // const userString = localStorage.getItem('user');
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
    const { loginState } = useContext(AuthContext);

    useEffect(() => {
        console.log('useReducer', user)
        // console.log('localstorage', localStorage.getItem('user'))
        console.log('localstorage', localStorage.getItem('loginState'))

        if (!user) return;
        
        // const basicInfoUser: any = {
        //     type: types.login,
        //     payload: user.user
        // }
        // dispatchLoginState(basicInfoUser)
        //dispatch(basicInfoUser);

        console.log('useContext', loginState)
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