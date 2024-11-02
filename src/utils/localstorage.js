export const setIsAuthenticatedToLocal = (params) => {
  localStorage.setItem("auth" , params)
}

export const getIsAuthenticatedToLocal = () => {
    const auth = localStorage.getItem("auth")
    return auth;
}

export const setIsRoleToLocal = (userData) => {
    localStorage.setItem("role", userData)
}

export const getIsRoleToLocal = () => {
   const role = localStorage.getItem("role");
   return role;
}

export const getUserFromLocal = () => {
   const user = localStorage.getItem("user")
   return user;

}