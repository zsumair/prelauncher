import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Drawer from "@/components/ui/drawer/drawer";
import Hero from "@/components/ui/Hero/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/ui/Footer/Footer";
import Layout from "@/components/ui/layout/Layout";
import SlickHero from "@/components/ui/Hero/SlickHero";
import { useSession } from "@supabase/auth-helpers-react";
import Login from "./login";
// import styles from '@/styles/Home.module.css'

export default function Home() {
  const session = useSession();

  // console.log("session", session);

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Prelaunchers</title>
        <meta name="description" content="prelaunchers app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* <SlickHero /> */}
        <ProductCard />
      </Layout>
    </>
  );
}
