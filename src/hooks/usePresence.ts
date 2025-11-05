import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePresence = (phoneNumber: string) => {
  useEffect(() => {
    if (!phoneNumber) return;

    const channel = supabase.channel("online-users");

    channel
      .on("presence", { event: "sync" }, () => {
        // Presence synced
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            phone: phoneNumber,
            timestamp: Date.now(),
          });
        }
      });

    return () => {
      channel.untrack();
      channel.unsubscribe();
    };
  }, [phoneNumber]);
};
