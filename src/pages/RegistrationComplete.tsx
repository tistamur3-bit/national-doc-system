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
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-semibold">المبلغ المطلوب:</span>
                  <span className="text-xl font-bold text-primary">10 ريال قطري</span>
                </div>
                
                <div className="space-y-3 pt-3">
                  <p className="text-sm text-muted-foreground">
                    يرجى اختيار طريقة الدفع المناسبة:
                  </p>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 text-right"
                      dir="rtl"
                    >
                      <span>💳 بطاقة الائتمان / الخصم المباشر</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 text-right"
                      dir="rtl"
                    >
                      <span>🏦 التحويل البنكي</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 text-right"
                      dir="rtl"
                    >
                      <span>📱 المحفظة الإلكترونية</span>
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-4 border-t">
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
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                // Handle payment submission
                alert("تم تقديم الدفع بنجاح");
                setShowPaymentDialog(false);
              }}
            >
              تأكيد الدفع
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegistrationComplete;
