import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

const AccountTypeForm = () => {
  const [accountType, setAccountType] = useState<string>("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  
  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-right">اختر نوع الحساب</h2>
      
      <div className="mb-8 flex items-start gap-2 text-sm text-primary">
        <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <span className="text-right">نوع الحساب</span>
      </div>

      <div className="mb-8">
        <RadioGroup value={accountType} onValueChange={setAccountType} className="space-y-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="citizens" className="text-base cursor-pointer flex-1 text-right">
              المواطنين القطريين والمقيمين
            </Label>
            <RadioGroupItem value="citizens" id="citizens" />
          </div>

          <div className="flex items-center gap-3">
            <Label htmlFor="visitors" className="text-base cursor-pointer flex-1 text-right">
              الزوار والمستخدمين من خارج دولة قطر
            </Label>
            <RadioGroupItem value="visitors" id="visitors" />
          </div>
        </RadioGroup>
      </div>

      {accountType === "citizens" && (
        <div className="space-y-6 mb-8">
          <div className="text-right mb-6">
            <p className="font-bold leading-relaxed" style={{ color: '#a94a4c' }}>
              <span className="block mb-1">إرشاد</span>
              إذا كان رقم الهاتف المحمول لا يخضع لملكيتك، فسيتم إنشاء حسابك ولكن سيكون غير مفعل وعليك الاتصال بمركز الاتصال الحكومى لتفعيل حسابك.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="nationalId" className="text-right block mb-2">
                رقم البطاقة الشخصية
              </Label>
              <Input 
                id="nationalId" 
                type="text" 
                className="text-right bg-white"
              />
            </div>

            <div>
              <Label htmlFor="mobileNumber" className="text-right block mb-2">
                رقم الهاتف المحمول
              </Label>
              <Input 
                id="mobileNumber" 
                type="tel" 
                className="text-right bg-white"
              />
            </div>

            <div className="flex justify-start">
              <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                onChange={handleRecaptchaChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
        <div className="flex gap-3">
          <Button variant="outline" className="min-w-24">
            رجوع
          </Button>
          <Button variant="outline" className="min-w-24">
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

export default AccountTypeForm;
