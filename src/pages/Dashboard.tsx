import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogOut, Shield, UserX, Users } from "lucide-react";
import { toast } from "sonner";

interface ActiveUser {
  phone: string;
  timestamp: number;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [blockedPhones, setBlockedPhones] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    loadBlockedUsers();
    setupPresence();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin-login");
        return;
      }

      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (error || !roleData) {
        toast.error("غير مصرح لك بالوصول");
        navigate("/admin-login");
        return;
      }

      setLoading(false);
    } catch (error) {
      navigate("/admin-login");
    }
  };

  const loadBlockedUsers = async () => {
    const { data, error } = await supabase
      .from("blocked_users")
      .select("phone_number");

    if (!error && data) {
      setBlockedPhones(new Set(data.map(u => u.phone_number)));
    }
  };

  const setupPresence = () => {
    const channel = supabase.channel("online-users");

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const users: ActiveUser[] = [];

        Object.keys(state).forEach((key) => {
          const presences = state[key] as any[];
          presences.forEach((presence) => {
            if (presence.phone) {
              users.push({
                phone: presence.phone,
                timestamp: presence.timestamp || Date.now(),
              });
            }
          });
        });

        setActiveUsers(users);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const handleBlockUser = async (phone: string) => {
    try {
      const { error } = await supabase
        .from("blocked_users")
        .insert({
          phone_number: phone,
        });

      if (error) throw error;

      setBlockedPhones(new Set([...blockedPhones, phone]));
      toast.success(`تم حظر المستخدم ${phone}`);
    } catch (error: any) {
      toast.error("فشل حظر المستخدم");
    }
  };

  const handleUnblockUser = async (phone: string) => {
    try {
      const { error } = await supabase
        .from("blocked_users")
        .delete()
        .eq("phone_number", phone);

      if (error) throw error;

      const newBlocked = new Set(blockedPhones);
      newBlocked.delete(phone);
      setBlockedPhones(newBlocked);
      toast.success(`تم إلغاء حظر المستخدم ${phone}`);
    } catch (error: any) {
      toast.error("فشل إلغاء الحظر");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">لوحة تحكم المسؤولين</h1>
              <p className="text-sm text-muted-foreground">إدارة المستخدمين النشطين</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمون النشطون</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers.length}</div>
              <p className="text-xs text-muted-foreground">متصلون حالياً</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمون المحظورون</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blockedPhones.size}</div>
              <p className="text-xs text-muted-foreground">إجمالي المحظورين</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>المستخدمون النشطون حالياً</CardTitle>
            <CardDescription>
              عرض جميع المستخدمين المتصلين بالموقع في الوقت الفعلي
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                لا يوجد مستخدمون نشطون حالياً
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم الهاتف</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeUsers.map((user, index) => {
                    const isBlocked = blockedPhones.has(user.phone);
                    return (
                      <TableRow key={`${user.phone}-${index}`}>
                        <TableCell className="font-mono" dir="ltr">
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          {isBlocked ? (
                            <Badge variant="destructive">محظور</Badge>
                          ) : (
                            <Badge variant="default" className="bg-green-500">
                              نشط
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {isBlocked ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUnblockUser(user.phone)}
                            >
                              إلغاء الحظر
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleBlockUser(user.phone)}
                            >
                              <UserX className="w-4 h-4 ml-2" />
                              حظر
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
