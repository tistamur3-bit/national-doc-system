import { useState } from "react";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const steps = [
  { number: 1, title: "نوع الحساب" },
  { number: 2, title: "البيانات الشخصية" },
  { number: 3, title: "كلمة المرور" },
  { number: 4, title: "إتمام التسجيل" },
];

const RegistrationComplete = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'payment' | 'card-payment' | 'unavailable'>('welcome');

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 bg-white">
        <Stepper currentStep={4} steps={steps} />
        
        <div className="max-w-4xl mx-auto mt-8">
          {currentView === 'welcome' && (
            <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border">
              <h2 className="text-2xl font-bold mb-6 text-right text-foreground">
                إتمام عملية التسجيل
              </h2>
              <div className="space-y-4 text-right text-base leading-relaxed text-foreground">
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
              </div>
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={() => setCurrentView('payment')}
                  className="min-w-48 bg-primary hover:bg-primary/90"
                >
                  متابعة إلى الدفع
                </Button>
              </div>
            </div>
          )}

          {currentView === 'payment' && (
            <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border">
              <h2 className="text-2xl font-bold mb-6 text-right text-foreground">
                بوابة الدفع الإلكتروني
              </h2>
              <div className="bg-background rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="font-semibold text-foreground">المبلغ المطلوب:</span>
                  <span className="text-xl font-bold text-primary">10 ريال قطري</span>
                </div>
                
                <div className="space-y-3 pt-3">
                  <p className="text-sm text-muted-foreground text-right">
                    يرجى اختيار طريقة الدفع المناسبة:
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-14 text-right border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      dir="rtl"
                      onClick={() => setCurrentView('card-payment')}
                    >
                      <span className="text-base">💳 بطاقة الائتمان / بطاقة الخصم المباشر</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-14 text-right border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      dir="rtl"
                      onClick={() => setCurrentView('unavailable')}
                    >
                      <span className="text-base"> Apple Pay</span>
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                  🔒 جميع المعاملات آمنة ومشفرة
                </p>
              </div>
              <div className="flex justify-start mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentView('welcome')}
                >
                  رجوع
                </Button>
              </div>
            </div>
          )}

          {currentView === 'card-payment' && (
            <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-right mb-2 text-foreground">
                  بوابة الدفع الإلكتروني
                </h2>
                <p className="text-right text-sm text-muted-foreground">
                  يرجى إدخال معلومات البطاقة بشكل دقيق
                </p>
              </div>
              
              <div className="space-y-5">
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

              <div className="flex gap-3 flex-row-reverse mt-8">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  onClick={() => {
                    alert("تم تأكيد الدفع بنجاح");
                  }}
                >
                  تأكيد الدفع - 10.00 ر.ق
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentView('payment')}
                >
                  رجوع
                </Button>
              </div>
            </div>
          )}

          {currentView === 'unavailable' && (
            <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border max-w-xl mx-auto">
              <h2 className="text-xl font-bold mb-4 text-right text-foreground">
                طريقة الدفع غير متاحة
              </h2>
              <p className="text-right text-base leading-relaxed text-foreground mb-6">
                نعتذر، طريقة الدفع المحددة غير متاحة في الوقت الحالي. يرجى التكرم باختيار وسيلة دفع بديلة لإتمام عملية الدفع.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                onClick={() => setCurrentView('payment')}
              >
                العودة لاختيار طريقة الدفع
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistrationComplete;
