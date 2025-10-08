import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Token-i saxla
      localStorage.setItem("token", token);
      // İstədiyin səhifəyə yönləndir
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <p>Loading...</p>;
}

export default GoogleLoginCallback;
