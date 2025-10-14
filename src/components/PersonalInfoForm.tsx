import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-right">البيانات الشخصية</h2>

      <div className="space-y-6 mb-8">
        {/* الجنسية */}
        <div>
          <Label htmlFor="nationality" className="text-right block mb-2">
            الجنسية
          </Label>
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="اختر الجنسية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qatar">القطرية</SelectItem>
              <SelectItem value="saudi">السعودية</SelectItem>
              <SelectItem value="uae">الإمارات</SelectItem>
              <SelectItem value="kuwait">الكويت</SelectItem>
              <SelectItem value="bahrain">البحرين</SelectItem>
              <SelectItem value="oman">العمان</SelectItem>
              <SelectItem value="egypt">المصرية</SelectItem>
              <SelectItem value="jordan">الأردنية</SelectItem>
              <SelectItem value="lebanon">اللبنانية</SelectItem>
              <SelectItem value="syria">السورية</SelectItem>
              <SelectItem value="iraq">العراقية</SelectItem>
              <SelectItem value="palestine">الفلسطينية</SelectItem>
              <SelectItem value="morocco">المغربية</SelectItem>
              <SelectItem value="algeria">الجزائرية</SelectItem>
              <SelectItem value="tunisia">التونسية</SelectItem>
              <SelectItem value="libya">الليبية</SelectItem>
              <SelectItem value="sudan">السودانية</SelectItem>
              <SelectItem value="yemen">اليمنية</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* الاسم */}
        <div>
          <div className="flex items-start gap-2 mb-4">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
            <div className="text-sm text-right">
              <span className="font-semibold block mb-1">الاسم</span>
              <span className="text-muted-foreground">
                الرجاء إدخال أحد الأسماء العربية أو الإنجليزية (الاسم الأول والأخير على الأقل)
              </span>
            </div>
          </div>

          {/* الاسم بالعربي */}
          <div className="mb-4">
            <Label className="text-right block mb-2">الاسم بالعربي</Label>
            <div className="grid grid-cols-3 gap-4">
              <Input type="text" placeholder="الاسم الأول" className="text-right bg-white" />
              <Input type="text" placeholder="الاسم الأوسط" className="text-right bg-white" />
              <Input type="text" placeholder="الاسم الأخير" className="text-right bg-white" />
            </div>
          </div>

          {/* الاسم بالإنجليزي */}
          <div>
            <Label className="text-right block mb-2">الاسم بالإنجليزي</Label>
            <div className="grid grid-cols-3 gap-4">
              <Input type="text" placeholder="First Name" className="text-right bg-white" />
              <Input type="text" placeholder="Middle Name" className="text-right bg-white" />
              <Input type="text" placeholder="Last Name" className="text-right bg-white" />
            </div>
          </div>
        </div>

        {/* تاريخ الميلاد */}
        <div>
          <Label htmlFor="birthdate" className="text-right block mb-2">
            تاريخ الميلاد
          </Label>
          <div className="grid grid-cols-3 gap-4">
            <Input type="number" placeholder="اليوم" className="text-right bg-white" min="1" max="31" />
            <Input type="number" placeholder="الشهر" className="text-right bg-white" min="1" max="12" />
            <Input type="number" placeholder="السنة" className="text-right bg-white" min="1900" max="2025" />
          </div>
        </div>

        {/* العنوان */}
        <div>
          <Label htmlFor="address" className="text-right block mb-2">
            العنوان
          </Label>
          <Input id="address" type="text" className="text-right bg-white" />
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <Label htmlFor="email" className="text-right block mb-2">
            البريد الإلكتروني
          </Label>
          <Input id="email" type="email" className="text-right bg-white" />
        </div>

        {/* إعادة إدخال البريد الإلكتروني */}
        <div>
          <Label htmlFor="confirmEmail" className="text-right block mb-2">
            أعد إدخال البريد الإلكتروني
          </Label>
          <Input id="confirmEmail" type="email" className="text-right bg-white" />
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

export default PersonalInfoForm;
