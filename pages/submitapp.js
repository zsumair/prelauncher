import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Layout from "@/components/ui/layout/Layout";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { categories } from "@/components/utils/Categories";
import ImageUploader from "@/components/utils/ImageUploader";

function SubmitApp() {
  let initialState = {
    productName: "",
    productURL: "",
    productDesc: "",
  };

  const [state, setState] = useState(initialState);
  const [productCategory, setProductCategory] = useState("SaaS");
  const [error, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const fileInputRef = useRef();
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  const handleCategory = (e) => {
    setProductCategory(e.target.value);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  async function handleImagePreview(e) {
    setErrorMessage(null);
    let file = e.target.files[0];
    setProductImage(URL.createObjectURL(file));
    let data = await ImageUploader(file, "prelauncher_images");
    if (data) {
      setImageURL(data?.secure_url);
      setImageSubmitted(true);
    } else {
      console.log(err);
      setErrorMessage("Error: Image is not uploaded, try again");
      setImageSubmitted(false);
    }
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const { productName, productURL, productDesc } = state;
      if (imageSubmitted) {
        supabase
          .from("products")
          .insert({
            product_name: productName,
            product_url: productURL,
            product_desc: productDesc,
            category: productCategory,
            product_image: imageURL,
            maker: session.user.id,
          })
          .then((res) => {
            toast.success("🎉 🎉 Product is submitted for review", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setState(initialState);
            setProductCategory("");
            setProductImage(null);
            setImageSubmitted(false);
            setImageURL(null);
            fileInputRef.current.value = null;
          });
      }
    } catch (error) {
      setErrorMessage("Product is not submitted, try again");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="py-12 md:py-24">
        <div className="card lg:card-side bg-base-100 shadow-xl flex">
          <div className="card-body">
            <h2 className="dark:text-zinc-300">
              Please submit your app details below
            </h2>

            <form onSubmit={handleSubmitProduct}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  onChange={handleInput}
                  value={state.productName}
                  placeholder="Product Name"
                  className="input input-bordered w-full "
                  required
                />
                <label className="label">
                  <span className="label-text-alt">
                    Please enter a valid name
                  </span>
                </label>
              </div>

              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Product Category</span>
                </label>
                <select
                  onChange={handleCategory}
                  className="select select-bordered"
                >
                  {categories?.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product URL</span>
                </label>
                <input
                  type="url"
                  name="productURL"
                  onChange={handleInput}
                  value={state.productURL}
                  placeholder="Enter Url"
                  className="input input-bordered w-full "
                  required
                />
                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product logo</span>
                  <span className="label-text-alt">*Aspect Ratio(16 / 9)</span>
                </label>
                <input
                  type="file"
                  name="productimage"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImagePreview}
                  // onChange={handleImagePreview}
                  className="file-input file-input-bordered w-full "
                  required
                />
                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Description</span>
                  <span className="label-text-alt">max: 125 chars</span>
                </label>
                <textarea
                  placeholder="Describe product in 125 chars"
                  name="productDesc"
                  onChange={handleInput}
                  value={state.productDesc}
                  maxLength="125"
                  className="textarea textarea-bordered leading-tight textarea-md w-full"
                ></textarea>

                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control pt-4">
                <button className="btn gap-2 dark:bg-zinc-100 dark:hover:bg-zinc-100 dark:text-black">
                  Submit Product
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="divider divider-horizontal"></div>
          {/* Product preview */}
          <div className="md:w-1/2">
            <h2 className="pb-4 text-center text-lg font-bold mb-5 dark:text-zinc-300">
              This is how your product / app will appear
            </h2>

            <div className="card lg:card-side md:card-size bg-base-100 px-8 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
              <figure className="rounded-3xl p-3 ">
                <img
                  src={
                    productImage
                      ? productImage
                      : "https://images.meesho.com/images/products/44009963/kxwus_512.jpg"
                  }
                  alt="Movie"
                  className="rounded-3xl p-3 w-32 h-[8rem] aspect-video object-cover"
                />
              </figure>
              <div className="ml-2 card-body">
                <div className="flex justify-between">
                  {state.productName ? (
                    <h2 className="card-title font-extrabold text-xl font-sans">
                      {state.productName}
                      <Link
                        href={state.productURL ? state.productURL : "#"}
                        className="btn btn-square btn-xs btn-outline dark:hover:bg-zinc-100"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </Link>
                    </h2>
                  ) : (
                    <h2 className="card-title text-lg">Product Title</h2>
                  )}

                  <div className="indicator">
                    <button className="btn btn-sm btn-ghost outline-0 border-0  normal-case hover:bg-slate-100 text-black bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500  transition-all">
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
                      <div className="badge badge-sm">1</div>
                    </button>
                  </div>
                </div>
                {state.productDesc ? (
                  <p className="text-gray-500 font-semibold text-sm">
                    {state.productDesc}
                  </p>
                ) : (
                  <p className="text-gray-500 font-semibold text-sm">
                    Deliver the best experience to your visitors & turn them
                    into customers.Build your website now!.
                  </p>
                )}
                <div className="card-actions justify-end">
                  <Link
                    href={"#"}
                    className="font-semibold capitalize text-sm bg-gray-100 rounded-3xl px-4 p-3 hover:underline dark:bg-gray-700"
                  >
                    {productCategory ? productCategory : "Select Category"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SubmitApp;
