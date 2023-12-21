export const useLogin = () => {
    const userToken = localStorage.getItem('loginState');
    // Agrega aquí cualquier lógica adicional para validar el token
    return !!userToken;
}