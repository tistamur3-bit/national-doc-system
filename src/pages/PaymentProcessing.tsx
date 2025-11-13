import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tawtheeqLogo from "@/assets/tawtheeq-logo.png";

const PaymentProcessing = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Navigate to ATM pin after 3 seconds
    const navigationTimer = setTimeout(() => {
      navigate('/atm-pin');
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary/20 to-background z-50 flex items-center justify-center">
      <div className="text-center space-y-8 px-4 max-w-2xl">
        {/* Logo with pulse animation */}
        <div className="flex justify-center animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <img
              src={tawtheeqLogo}
              alt="توثيق - نظام التوثيق الوطني"
              className="h-24 w-auto relative z-10 drop-shadow-xl"
            />
          </div>
        </div>

        {/* Processing text */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold text-foreground">
            جاري معالجة عملية الدفع
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            نحن نعمل على التحقق من عملية الدفع وإتمام التسجيل
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            يرجى الانتظار لحظات قليلة
          </p>
        </div>

        {/* Payment icon */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-full mx-auto space-y-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground text-center">جاري التحقق من عملية الدفع...</p>
        </div>

        {/* Spinner */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>عملية دفع آمنة ومشفّرة</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
