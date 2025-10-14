import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

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
        <RadioGroup value={accountType} onValueChange={setAccountType} className="space-y-4">
          <div className="flex items-center justify-end gap-3 p-4 rounded border border-border hover:bg-muted/50 transition-colors">
            <Label htmlFor="citizens" className="text-base cursor-pointer flex-1 text-right">
              المواطنين القطريين والمقيمين
            </Label>
            <RadioGroupItem value="citizens" id="citizens" className="order-first" />
          </div>

          <div className="flex items-center justify-end gap-3 p-4 rounded border border-border hover:bg-muted/50 transition-colors">
            <Label htmlFor="visitors" className="text-base cursor-pointer flex-1 text-right">
              الزوار والمستخدمين من خارج دولة قطر
            </Label>
            <RadioGroupItem value="visitors" id="visitors" className="order-first" />
          </div>
        </RadioGroup>
      </div>

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
