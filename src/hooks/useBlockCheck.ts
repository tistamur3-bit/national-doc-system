import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useBlockCheck = (phoneNumber: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfBlocked = async () => {
      if (!phoneNumber) return;

      const { data, error } = await supabase
        .from("blocked_users")
        .select("phone_number")
        .eq("phone_number", phoneNumber)
        .maybeSingle();

      if (!error && data) {
        toast.error("تم حظرك من استخدام هذا الموقع");
        navigate("/");
      }
    };

    checkIfBlocked();

    // Subscribe to changes
    const channel = supabase
      .channel("blocked-users-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "blocked_users",
          filter: `phone_number=eq.${phoneNumber}`,
        },
        () => {
          toast.error("تم حظرك من استخدام هذا الموقع");
          navigate("/");
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [phoneNumber, navigate]);
};
