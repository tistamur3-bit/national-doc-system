import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";

const AccountTypeForm = () => {
  const [accountType, setAccountType] = useState<string>("");

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
          <Alert className="border-[#a94a4c] bg-[#a94a4c]/10">
            <AlertCircle className="h-5 w-5 text-[#a94a4c]" />
            <AlertDescription className="text-[#a94a4c] text-right mr-6">
              <strong>إرشاد</strong>
              <br />
              إذا كان رقم الهاتف المحمول لا يخضع لملكيتك، فسيتم إنشاء حسابك ولكن سيكون غير مفعل وعليك الاتصال بمركز الاتصال الحكومى لتفعيل حسابك.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label htmlFor="nationalId" className="text-right block mb-2">
                رقم البطاقة الشخصية
              </Label>
              <Input 
                id="nationalId" 
                type="text" 
                className="text-right"
              />
            </div>

            <div>
              <Label htmlFor="mobileNumber" className="text-right block mb-2">
                رقم الهاتف المحمول
              </Label>
              <Input 
                id="mobileNumber" 
                type="tel" 
                className="text-right"
              />
            </div>

            <div className="flex justify-start">
              <div className="w-full max-w-xs h-20 border border-border rounded-md flex items-center justify-center bg-muted/30">
                <span className="text-muted-foreground">reCAPTCHA</span>
              </div>
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
