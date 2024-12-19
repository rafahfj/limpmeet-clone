import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateNotLog({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (user === null) {
    return children;
  } else {
    return <Navigate to={"/dashboard"} />;
  }
}
