import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Drawer from "@/components/ui/drawer/drawer";
import Hero from "@/components/ui/Hero/Hero";
import Products from "@/components/Products";
import Footer from "@/components/ui/Footer/Footer";
import Layout from "@/components/ui/layout/Layout";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Pagination from "@/components/Pagination";

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const { data, count } = await supabase
    .from("products")
    .select("*, profiles(id, name, avatar)", { count: "exact" })
    .order("id", { ascending: true });

  return {
    props: {
      data: data,
      count: count,
    },
  };
}

export default function Home({ data, count, page }) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [profile, setProfile] = useState(null);
  const [totalSize, setTotalSize] = useState(null);
  const [products, setProducts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const lastPostIndex = postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);

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
      <Head>
        <title>Prelaunchers</title>
        <meta name="description" content="prelaunchers app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <UserContext.Provider value={{ profile }}>
          <Products>
            {currentPosts &&
              currentPosts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </Products>
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setPostsPerPage={setPostsPerPage}
          />
        </UserContext.Provider>
      </Layout>
    </>
  );
}
