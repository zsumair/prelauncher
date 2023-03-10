import Head from "next/head";
import Products from "@/components/Products";
import Layout from "@/components/ui/layout/Layout";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Script from "next/script";
import { UserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

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
        <meta
          name="description"
          content="Discover your next favorite app, new apps to watch, product launch, early adopters, join the waitlist"
        />
        <meta
          name="keywords"
          content="Product launch, validate idea, prelaunch product, new products, app launch"
        />
        <link rel="icon" href="/favicon.ico" />
        <Script
          async
          defer
          data-website-id="3f511865-670d-444b-82a5-7824511929a8"
          src="https://umami-syedapps.up.railway.app/umami.js"
        />
      </Head>
      <Layout>
        <UserContext.Provider value={{ profile }}>
          <Products />
          {/* <Products>
            {currentPosts &&
              currentPosts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </Products> */}
        </UserContext.Provider>
      </Layout>
    </>
  );
}
