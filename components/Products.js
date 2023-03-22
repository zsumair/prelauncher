import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "./ui/Skeleton/Skeleton";
import Pagination from "./Pagination";
import Link from "next/link";

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
        <div className="container md:w-3/4">
          <div className="text-center">
            <h2 className="text-xl md:text-6xl mb-2 font-extrabold font-sans dark:text-zinc-300">
              Find Your next favorite products before everyone
            </h2>
            <p className="text-xs md:text-2xl mb-6 md:mb-14 py-4 font-semibold text-gray-500 dark:text-zinc-300">
              Bridging the gap between Makers and Users with early access and
              early feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* <div className="card lg:card-side md:card-size bg-base-100 px-8 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
              <figure className="rounded-3xl p-3">
                <img
                  src="https://www.prelaunchers.xyz/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsyedzoheb%2Fimage%2Fupload%2Fv1679347003%2Fprelauncher_images%2Fw67wiv2zpo5artk5dk4w.jpg&w=640&q=75"
                  alt="Movie"
                  // className="rounded-3xl w-32 h-[8rem] p-3"
                  className="rounded-3xl p-3 w-32 h-[8rem] aspect-video object-cover"
                  // width={"100px"}
                />
              </figure>
              <div className="ml-2 card-body">
                <div className="flex justify-between">
                  <h2 className="card-title font-extrabold text-xl font-sans">
                    SVG Gradientskkk
                  </h2>
                  <div className="indicator">
                    <span className="indicator-item badge badge-md">8</span>
                    <button
                      className="btn btn-sm btn-square btn-outline transition-all dark:hover:bg-zinc-300  normal-case  bg-current dark:bg-zinc-500"

                      // onClick={toggleVote}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 fill-yellow-500 stroke-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-sm">
                  Deliver the best experience to your visitors & turn them into
                  customers.Build your website now!.
                </p>
                <div className="card-actions justify-end">
                  <Link
                    href={"/category/"}
                    className="font-semibold capitalize text-sm bg-gray-100 rounded-3xl px-4 p-3 "
                  >
                    AI
                  </Link>
                </div>
              </div>
            </div>

            <div className="card lg:card-side md:card-size bg-base-100 px-8 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
              <figure className="rounded-3xl p-3">
                <img
                  src="https://www.prelaunchers.xyz/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsyedzoheb%2Fimage%2Fupload%2Fv1679347003%2Fprelauncher_images%2Fw67wiv2zpo5artk5dk4w.jpg&w=640&q=75"
                  alt="Movie"
                  // className="rounded-3xl w-32 h-[8rem] p-3"
                  className="rounded-3xl p-3 w-32 h-[8rem] aspect-video object-cover"
                  // width={"100px"}
                />
              </figure>
              <div className="ml-2 card-body">
                <div className="flex justify-between">
                  <h2 className="card-title font-extrabold text-xl font-sans">
                    Untoggled vote
                  </h2>
                  <div className="indicator">
                    <button
                      className="btn btn-sm btn-ghost bg-[#f3f4f6] outline-0 border-0 text-black transition-all  dark:hover:bg-zinc-300 normal-case"
                      // (isVotedByMe ? "bg-current dark:bg-zinc-500" : "")

                      // onClick={toggleVote}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                     
                      <span className="px-1 font-semibold "> Upvote</span>
                      <div className="badge badge-xs">0</div>
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-sm">
                  Deliver the best experience to your visitors & turn them into
                  customers.Build your website now!.
                </p>
                <div className="card-actions justify-end">
                  <Link
                    href={"/category/"}
                    className="font-semibold capitalize text-sm bg-gray-100 rounded-3xl px-4 p-3 "
                  >
                    untog
                  </Link>
                </div>
              </div>
            </div>

            <div className="card lg:card-side md:card-size bg-base-100 px-8 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
              <figure className="rounded-3xl p-3">
                <img
                  src="https://www.prelaunchers.xyz/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsyedzoheb%2Fimage%2Fupload%2Fv1678902422%2Fprelauncher_images%2Fvro0ejavtnyy1qlcj6vb.png&w=640&q=75"
                  alt="Movie"
                  className="rounded-3xl p-3 w-32 h-[8rem] aspect-video object-cover"
                />
              </figure>
              <div className="ml-2 card-body">
                <div className="flex justify-between">
                  <h2 className="card-title font-extrabold text-xl font-sans">
                    Toggled Vote
                  </h2>
                  <div className="indicator">
                    <button
                      className="btn btn-sm btn-ghost bg-[#f3f4f6] outline-0 border-0  normal-case hover:bg-slate-100 text-black focus:bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500  transition-all"
                      // onClick={toggleVote}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="inline-block w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                      <span className="px-1 font-semibold text-white">
                        {" "}
                        Upvote
                      </span>
                      <div className="badge badge-xs">0</div>
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-sm">
                  Deliver the best experience to your visitors & turn them into
                  customers.Build your website now!.
                </p>
                <div className="card-actions justify-end">
                  <Link
                    href={"/category/"}
                    className="font-semibold capitalize text-sm bg-gray-100 rounded-3xl px-4 p-3 hover:underline"
                  >
                    Developer Tools
                  </Link>
                </div>
              </div>
            </div> */}
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
