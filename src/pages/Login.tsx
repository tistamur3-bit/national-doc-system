import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import nasName from "@/assets/nas-name.png";
import tawtheeqLogo from "@/assets/tawtheeq-logo.png";
import { Eye, EyeOff, User } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isRobot, setIsRobot] = useState(false);

  const handleLogin = () => {
    // Login logic will be implemented later
    console.log("Login attempt:", { username, password });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src={nasName} alt="NAS" className="h-12" />
          <img src={tawtheeqLogo} alt="Tawtheeq" className="h-12" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-foreground mb-8 text-center">
            المصادقة مع اسم المستخدم وكلمة المرور
          </h1>

          {/* Login Form */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-6 justify-end">
              <h2 className="text-xl font-semibold text-foreground">
                الدخول بواسطة إسم المستخدم
              </h2>
              <User className="h-6 w-6 text-foreground" />
            </div>

            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-base text-right block">
                  اسم المستخدم
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="اسم المستخدم"
                  className="text-base text-right"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base text-right block">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة المرور"
                    className="text-base text-right pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="space-y-2">
                <Label className="text-base text-right block">التحقق</Label>
                <div className="flex items-center gap-3 justify-end">
                  <span className="text-sm text-muted-foreground">
                    أنا لست برنامج روبوت
                  </span>
                  <Checkbox
                    checked={isRobot}
                    onCheckedChange={(checked) => setIsRobot(checked as boolean)}
                    className="h-6 w-6"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  className="px-12 text-base"
                  onClick={handleLogin}
                >
                  سُجّل
                </Button>
              </div>

              {/* Links */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <button
                  className="text-primary hover:underline text-base"
                  onClick={() => {}}
                >
                  هل نسيت كلمة المرور؟
                </button>
                <button
                  className="text-primary hover:underline text-base"
                  onClick={() => navigate("/register")}
                >
                  إنشاء حساب جديد
                </button>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="flex justify-end mt-6">
            <Button
              variant="outline"
              size="lg"
              className="px-8"
              onClick={handleCancel}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 نظام التوثيق الوطني - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
