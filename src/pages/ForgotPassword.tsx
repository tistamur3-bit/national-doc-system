import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // سيتم إضافة الوظيفة لاحقاً
    console.log("Email/Username:", email);
    console.log("ID/Passport:", idNumber);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-[#E31E24] text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <h1 className="text-xl font-bold">هل نسيت كلمة المرور؟</h1>
          
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
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
          <div className="text-center px-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              يُرجى إدخال اسم المستخدم أو البريد الإلكتروني، ورقم البطاقة الشخصية القطرية أو رقم جواز السفر ليصلك رابط إعادة تعيين كلمة المرور.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Email/Username Input */}
            <div>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني أو اسم المستخدم"
                className="w-full h-14 text-base text-center rounded-full border-2 border-gray-300 focus:border-[#E31E24] focus:ring-0"
                required
              />
            </div>

            {/* ID/Passport Input */}
            <div>
              <Input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="رقم البطاقة الشخصية القطرية أو جواز السفر"
                className="w-full h-14 text-base text-center rounded-full border-2 border-gray-300 focus:border-[#E31E24] focus:ring-0"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-bold bg-[#E31E24] hover:bg-[#c91a1f] text-white rounded-full"
              >
                تأكيد
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
