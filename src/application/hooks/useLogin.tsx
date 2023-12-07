export const useLogin = () => {
    const userToken = localStorage.getItem('user');
    // Agrega aquí cualquier lógica adicional para validar el token
    return !!userToken;
}