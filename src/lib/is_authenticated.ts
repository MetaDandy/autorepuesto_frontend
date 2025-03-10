export const isAuthenticated = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  return !!token
}
