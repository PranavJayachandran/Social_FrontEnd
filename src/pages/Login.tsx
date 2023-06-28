import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Home from "./Home";

const supabase = createClient(
  "https://gifgpnnbydsiejxzesqw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZmdwbm5ieWRzaWVqeHplc3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4ODcxNTQsImV4cCI6MjAwMzQ2MzE1NH0.iaxQeZQO69LS5imnQ87Ww47fi8ITNIq9z6Wwl6vIRCQ"
);

export default function Login() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <Home />;
  }
}
