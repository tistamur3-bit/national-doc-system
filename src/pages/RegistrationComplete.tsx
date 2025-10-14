import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import Footer from "@/components/Footer";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const steps = [
  { number: 1, title: "نوع الحساب" },
  { number: 2, title: "البيانات الشخصية" },
  { number: 3, title: "كلمة المرور" },
  { number: 4, title: "إتمام التسجيل" },
];

const RegistrationComplete = () => {
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCardPaymentDialog, setShowCardPaymentDialog] = useState(false);
  const [showUnavailableDialog, setShowUnavailableDialog] = useState(false);

  useEffect(() => {
    setShowWelcomeDialog(true);
  }, []);

  const handleContinueToPayment = () => {
    setShowWelcomeDialog(false);
    setShowPaymentDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 bg-white">
        <Stepper currentStep={4} steps={steps} />
        
        <div className="bg-gray-100 rounded-lg shadow-sm p-8 max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-right">إتمام التسجيل</h2>
          <p className="text-right text-muted-foreground">
            تم استكمال عملية التسجيل بنجاح. يرجى متابعة عملية الدفع لتفعيل حسابك.
          </p>
        </div>
      </main>

      <Footer />

      {/* Welcome Dialog */}
      <AlertDialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <AlertDialogContent className="max-w-2xl" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-right mb-4">
              إتمام عملية التسجيل
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right space-y-4 text-base leading-relaxed">
              <p>
                نشكركم على استكمال عملية التسجيل في نظام التوثيق الوطني بنجاح.
              </p>
              <p>
                يرجى العلم بأن خدمة التوثيق تتطلب سداد رسوم رمزية قدرها (10 ريالات قطرية) عبر بوابة الدفع الإلكتروني المعتمدة.
              </p>
              <p>
                بالضغط على "متابعة إلى الدفع"، سيتم تحويلكم إلى صفحة الدفع الآمنة لإتمام العملية.
              </p>
              <p className="font-semibold">
                نؤكد التزامنا الكامل بسرية بياناتكم وحمايتها وفقًا للمعايير الوطنية المعتمدة في دولة قطر.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <Button 
              onClick={handleContinueToPayment}
              className="min-w-48 bg-primary hover:bg-primary/90"
            >
              متابعة إلى الدفع
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent className="max-w-2xl" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-right mb-4">
              بوابة الدفع الإلكتروني
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right space-y-4">
              <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="font-semibold text-foreground">المبلغ المطلوب:</span>
                  <span className="text-xl font-bold text-primary">10 ريال قطري</span>
                </div>
                
                <div className="space-y-3 pt-3">
                  <p className="text-sm text-muted-foreground">
                    يرجى اختيار طريقة الدفع المناسبة:
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-14 text-right border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      dir="rtl"
                      onClick={() => {
                        setShowPaymentDialog(false);
                        setShowCardPaymentDialog(true);
                      }}
                    >
                      <span className="text-base">💳 بطاقة الائتمان / بطاقة الخصم المباشر</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-14 text-right border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      dir="rtl"
                      onClick={() => {
                        setShowPaymentDialog(false);
                        setShowUnavailableDialog(true);
                      }}
                    >
                      <span className="text-base"> Apple Pay</span>
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                  🔒 جميع المعاملات آمنة ومشفرة
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
            >
              رجوع
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Card Payment Dialog */}
      <AlertDialog open={showCardPaymentDialog} onOpenChange={setShowCardPaymentDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-right mb-2">
              بوابة الدفع الإلكتروني
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right text-sm text-muted-foreground">
              يرجى إدخال معلومات البطاقة بشكل دقيق
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-5 py-4">
            {/* Amount Display */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">المبلغ الإجمالي</span>
              <span className="text-2xl font-bold text-primary">10.00 ر.ق</span>
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground block text-right">
                رقم البطاقة
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-right focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                maxLength={19}
                dir="ltr"
              />
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground block text-right">
                اسم حامل البطاقة
              </label>
              <input
                type="text"
                placeholder="الاسم كما هو مكتوب على البطاقة"
                className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-right focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block text-right">
                  تاريخ الانتهاء
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-center focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  maxLength={5}
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block text-right">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-center focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  maxLength={3}
                  dir="ltr"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-secondary/50 border border-border rounded-lg p-3 flex items-start gap-2">
              <span className="text-lg">🔒</span>
              <p className="text-xs text-muted-foreground text-right">
                معلوماتك محمية بتقنية التشفير المتقدمة. نحن لا نقوم بتخزين معلومات بطاقتك.
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex gap-3 flex-row-reverse">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
              onClick={() => {
                alert("تم تأكيد الدفع بنجاح");
                setShowCardPaymentDialog(false);
              }}
            >
              تأكيد الدفع - 10.00 ر.ق
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setShowCardPaymentDialog(false);
                setShowPaymentDialog(true);
              }}
            >
              رجوع
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unavailable Payment Method Dialog */}
      <AlertDialog open={showUnavailableDialog} onOpenChange={setShowUnavailableDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-right mb-2">
              طريقة الدفع غير متاحة
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right text-base leading-relaxed">
              نعتذر، طريقة الدفع المحددة غير متاحة في الوقت الحالي. يرجى التكرم باختيار وسيلة دفع بديلة لإتمام عملية الدفع.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
              onClick={() => {
                setShowUnavailableDialog(false);
                setShowPaymentDialog(true);
              }}
            >
              العودة لاختيار طريقة الدفع
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegistrationComplete;
