import { useEffect, useRef } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import { supabase } from "@/integrations/supabase/client";

export const usePageTracking = (pageName: string) => {
  const { trackingUserId } = useRegistration();
  const hasUpdated = useRef(false);

  useEffect(() => {
    if (!trackingUserId || hasUpdated.current) return;
    hasUpdated.current = true;

    const updateCurrentPage = async () => {
      const { error } = await supabase
        .from("processing_users")
        .update({ current_page: pageName })
        .eq("user_id", trackingUserId);

      if (error) {
        console.error("Error updating current page:", error);
      }
    };

    updateCurrentPage();
  }, [trackingUserId, pageName]);
};
