import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "./ui/Skeleton/Skeleton";
import Pagination from "./Pagination";

function Products({ children }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const category = router?.query?.category;

  const lastPostIndex = postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products?.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    if (category) {
      getFilteredCategory();
      return;
    }
    fetchProducts();
  }, [category]);

  async function getFilteredCategory() {
    setProducts([]);
    setIsLoading(true);
    await supabase
      .from("products")
      .select("*,profiles(id, name, avatar)", { count: "exact" })
      .eq("category", category[0])
      .is("approved", true)
      .then((res) => {
        setProducts(res?.data);
        setIsLoading(false);
      });
  }

  async function fetchProducts() {
    setProducts([]);
    setIsLoading(true);
    await supabase
      .from("products")
      .select("*,profiles(id, name, avatar)", { count: "exact" })
      .is("approved", true)
      .order("created_at", { ascending: false })
      .then((res) => {
        setProducts(res?.data);
        setIsLoading(false);
      });
  }

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="tracking-wide text-pink-600 text-2xl mb-2 font-mono">
              Find:
              <span className="text-gray-800 font-bold tracking tracking-widest dark:text-zinc-300">
                Your next favorite products before everyone
              </span>
            </h2>
            <p className="text-md sm:text-2xl mb-6 md:mb-14 py-2 dark:text-zinc-300">
              Bridging the gap between Makers and Users with early access and
              early feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {loading && <Skeleton cards={3} />}
            {currentPosts &&
              currentPosts?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}

            {/* Main container below */}
          </div>
          <Pagination
            totalPosts={products?.length}
            postsPerPage={postsPerPage}
            setPostsPerPage={setPostsPerPage}
          />
        </div>
      </section>
    </>
  );
}

export default Products;
