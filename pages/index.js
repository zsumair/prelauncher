import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Drawer from "@/components/ui/drawer/drawer";
import Hero from "@/components/ui/Hero/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/ui/Footer/Footer";
import Layout from "@/components/ui/layout/Layout";
import SlickHero from "@/components/ui/Hero/SlickHero";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Login from "./login";
import { UserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import { create } from "zustand";
// import styles from '@/styles/Home.module.css'

export default function Home() {
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

  // if (!session) {
  //   return <Login />;
  // }

  return (
    <>
      <Head>
        <title>Prelaunchers</title>
        <meta name="description" content="prelaunchers app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <UserContext.Provider value={{ profile }}>
          {/* <SlickHero /> */}
          <ProductCard />
        </UserContext.Provider>
      </Layout>
    </>
  );
}
