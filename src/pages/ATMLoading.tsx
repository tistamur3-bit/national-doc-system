import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";

const ATMLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/atm-pin");
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoadingScreen />;
};

export default ATMLoading;
