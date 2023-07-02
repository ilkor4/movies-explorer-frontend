import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLogged, element: Component }) {
  return(
    isLogged ? Component : <Navigate to='/' replace />
  )
}
