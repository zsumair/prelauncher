import Navbar from "@/components/navbar/Navbar";
import Navicheck from "@/components/navbar/Navicheck";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";

function Layout({ children }) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetchUser();
  }, [session?.user?.id]);

  async function fetchUser() {
    await supabase
      .from("profiles")
      .select()
      .eq("id", session?.user?.id)
      .then((res) => {
        setProfile(res.data[0]);
      });
  }

  return (
    <>
      <UserContext.Provider value={{ profile }}>
        <div className="container">
          <Navbar />
          <main>{children}</main>
          <div className="divider"></div>
          <Footer />
        </div>
      </UserContext.Provider>
    </>
  );
}

export default Layout;
