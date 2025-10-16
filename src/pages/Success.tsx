import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import nasName from "@/assets/nas-name.png";
import tawtheeqLogo from "@/assets/tawtheeq-logo.png";
import securePaymentLogos from "@/assets/secure-payment-logos.png";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-white" dir="rtl">
      {/* Header with logos */}
      <header className="bg-white border-b border-border py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <img 
              src={nasName} 
              alt="نظام التوثيق الوطني" 
              className="h-16 object-contain"
            />
            <img 
              src={tawtheeqLogo} 
              alt="توثيق" 
              className="h-16 object-contain"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border border-border">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"></div>
                <div className="relative bg-green-500/10 rounded-full p-6">
                  <CheckCircle2 className="w-24 h-24 text-green-600" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center space-y-6 mb-10">
              <h1 className="text-4xl font-bold text-foreground">
                يُرجى انتظار اتصال موظف مركز الاتصال لإتمام تفعيل حسابكم
              </h1>
              
              <div className="space-y-4 text-right bg-primary/5 rounded-lg p-6 border border-primary/20">
                <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-5 mb-4">
                  <p className="text-base text-amber-950 text-right leading-relaxed font-medium">
                    <strong className="text-lg">ملاحظة هامة:</strong>
                    <br />
                    <span className="block mt-2">
                      سيتم التواصل معكم من قِبل موظف مركز الاتصال في الفترة القادمة، وذلك لاستكمال إجراءات تفعيل حسابكم وتمكينكم من الاستفادة الكاملة من خدمات نظام التوثيق الوطني.
                    </span>
                  </p>
                </div>

                <p className="text-lg text-foreground leading-relaxed">
                  نود إعلامكم بأن عملية التسجيل في نظام التوثيق الوطني (توثيق) قد تمت بنجاح.
                </p>
                
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <p className="font-semibold text-foreground">
                    ✓ تم التحقق من هويتكم بنجاح
                  </p>
                  <p className="font-semibold text-foreground">
                    ✓ تم تفعيل حسابكم في النظام
                  </p>
                  <p className="font-semibold text-foreground">
                    ⏳ بانتظار تفعيل الحساب من خلال موظف مركز الاتصال
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-5 border border-primary/20">
                <p className="text-base text-foreground font-medium">
                  يمكنكم الآن الاستفادة من جميع خدمات نظام التوثيق الوطني والخدمات الحكومية الإلكترونية المتكاملة في دولة قطر
                </p>
              </div>
            </div>

            {/* Payment logos */}
            <div className="mb-8 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground mb-4">
                عملية الدفع آمنة ومحمية
              </p>
              <div className="flex justify-center">
                <img 
                  src={securePaymentLogos} 
                  alt="طرق الدفع الآمنة"
                  className="w-full max-w-md opacity-80"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => navigate('/')}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
              >
                الانتقال إلى الصفحة الرئيسية
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-2">
                في حال وجود أي استفسار، يرجى التواصل مع فريق الدعم الفني
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              🔒 جميع بياناتكم محمية ومشفرة وفقاً لأعلى معايير الأمان الدولية
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 نظام التوثيق الوطني (توثيق) - دولة قطر. جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Success;
