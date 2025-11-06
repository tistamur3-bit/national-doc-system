import { useNavigate, useLocation } from "react-router-dom";
import { X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "example@outlook.com";

  // Mask email for privacy (show first 2 chars and last domain)
  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");
    if (username.length <= 2) return email;
    const masked = username.substring(0, 2) + "*****";
    return `${masked}@${domain}`;
  };

  const handleResendEmail = () => {
    // سيتم إضافة وظيفة إعادة إرسال البريد لاحقاً
    console.log("Resending email to:", email);
  };

  const handleComplete = () => {
    navigate("/processing-request");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      {/* Top Background Section */}
      <div className="bg-[#8FD5C7] h-64 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-black" />
        </button>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Phone/Card with Login */}
            <div className="w-40 h-56 bg-gradient-to-br from-purple-200 to-purple-100 rounded-2xl border-4 border-purple-500 shadow-xl flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 bg-white rounded-full mb-4 flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full"></div>
              </div>
              <div className="space-y-2 w-full">
                <div className="h-2 bg-purple-300 rounded w-3/4 mx-auto"></div>
                <div className="h-2 bg-purple-300 rounded w-full"></div>
                <div className="flex gap-1 justify-center mt-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
                <div className="mt-3 bg-pink-400 text-white text-xs py-1 px-3 rounded text-center font-semibold">
                  Login
                </div>
              </div>
            </div>
            
            {/* Shield with Checkmark */}
            <div className="absolute -bottom-4 -right-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white transform rotate-[-10deg]">
                <ShieldCheck className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12 max-w-2xl">
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            يُرجى التحقق من بريدك الإلكتروني!
          </h1>

          {/* Description */}
          <div className="text-center space-y-4 px-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              قمنا بإرسال رسالة إلى البريد الإلكتروني{" "}
              <span className="font-bold text-gray-900">{maskEmail(email)}</span>{" "}
              تحتوي على إرشادات حول كيفية إعادة تعيين كلمة المرور.
            </p>
          </div>

          {/* Resend Link */}
          <div className="text-center pt-4">
            <button
              onClick={handleResendEmail}
              className="text-[#E31E24] font-semibold text-lg underline hover:text-[#c91a1f] transition-colors"
            >
              إعادة إرسال البريد الإلكتروني
            </button>
          </div>

          {/* Complete Button */}
          <div className="pt-8">
            <Button
              onClick={handleComplete}
              className="w-full h-14 text-lg font-bold bg-[#E31E24] hover:bg-[#c91a1f] text-white rounded-full"
            >
              تم الاستلام
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailVerification;
