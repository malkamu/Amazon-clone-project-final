import React, { useContext, useEffect } from "react";
import { DataContext } from "../Component/DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children, msg, redirect }) {
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);
//   console.log("user", user);

  return children;
}

export default ProtectedRoute;
