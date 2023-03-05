import { UserContext } from "@/contexts/UserContext";
import Login from "@/pages/login";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Cars from "./Cars";
import ProductCard from "./ProductCard";
import Skeleton from "./ui/Skeleton/Skeleton";
import Pagination from "./Pagination";

function Products({ children }) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [totalSize, setTotalSize] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
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
    await supabase
      .from("products")
      .select("*,profiles(id, name, avatar)", { count: "exact" })
      .eq("category", category[0])
      // .is("approved", false)
      .then((res) => {
        setTotalSize(res?.count);
        setProducts(res?.data);
      });
  }

  async function fetchProducts() {
    await supabase
      .from("products")
      .select("*,profiles(id, name, avatar)", { count: "exact" })
      // .is("approved", false)
      .then((res) => {
        setTotalSize(res?.count);
        setProducts(res?.data);
        // console.log("res products", res);
      });
  }

  // console.log("currentposts", currentPosts);

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="text-center bg-slate-300 backdrop-filter backdrop-blur-lg bg-opacity-5 sticky top-16 z-20">
            <h2 className="text-lg sm:text-5xl font-bold mb-4 py-2">
              What We Do
            </h2>
            <p className="text-md sm:text-2xl mb-6 md:mb-14 py-2">
              Save time managing advertising & Content for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {currentPosts &&
              currentPosts?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            <Pagination
              totalPosts={products?.length}
              postsPerPage={postsPerPage}
              setPostsPerPage={setPostsPerPage}
            />
            {/* {children} */}
            {/* Main container below */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
