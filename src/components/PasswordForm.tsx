import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

const PasswordForm = () => {
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleBack = () => {
    navigate("/personal-info");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-right">إنشاء كلمة المرور</h2>

      <div className="space-y-6 mb-8">
        {/* قواعد كلمة المرور */}
        <div className="bg-white rounded-lg p-6 border border-border">
          <div className="flex items-start gap-2 mb-4">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
            <h3 className="font-semibold text-right">قواعد إدخال كلمة المرور</h3>
          </div>
          <ul className="space-y-2 text-right text-sm text-muted-foreground">
            <li>• يجب أن تتكون كلمة المرور من 8 أحرف على الأقل</li>
            <li>• يجب أن تحتوي على حرف كبير واحد على الأقل (A-Z)</li>
            <li>• يجب أن تحتوي على حرف صغير واحد على الأقل (a-z)</li>
            <li>• يجب أن تحتوي على رقم واحد على الأقل (0-9)</li>
            <li>• يجب أن تحتوي على رمز خاص واحد على الأقل (!@#$%^&*)</li>
          </ul>
        </div>

        {/* إدخال كلمة المرور */}
        <div>
          <Label htmlFor="password" className="text-right block mb-2">
            أدخل كلمة المرور
          </Label>
          <Input id="password" type="password" className="text-right bg-white" />
        </div>

        {/* إعادة إدخال كلمة المرور */}
        <div>
          <Label htmlFor="confirmPassword" className="text-right block mb-2">
            أعد إدخال كلمة المرور
          </Label>
          <Input id="confirmPassword" type="password" className="text-right bg-white" />
        </div>

        {/* reCAPTCHA */}
        <div className="flex justify-start">
          <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleRecaptchaChange} />
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
        <div className="flex gap-3">
          <Button variant="outline" className="min-w-24" onClick={handleBack}>
            رجوع
          </Button>
          <Button variant="outline" className="min-w-24" onClick={handleCancel}>
            إلغاء
          </Button>
        </div>
        
        <Button className="min-w-32 bg-primary hover:bg-primary/90">
          استمر
        </Button>
      </div>
    </div>
  );
};

export default PasswordForm;
