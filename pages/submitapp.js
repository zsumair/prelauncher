import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Layout from "@/components/ui/layout/Layout";
import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function SubmitApp() {
  let initialState = {
    productName: "",
    productURL: "",
    productDesc: "",
  };

  const [state, setState] = useState(initialState);
  const [productCategory, setProductCategory] = useState("");
  const [error, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const fileInputRef = useRef();
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session?.user?.id) {
  //     router.push("/login");
  //   }
  // }, [session?.user?.id]);

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

  // console.log("session", session?.user?.user_metadata?.full_name);

  const handleImagePreview = (e) => {
    setErrorMessage(null);
    let file = e.target.files[0];
    setProductImage(URL.createObjectURL(file));
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "prelauncher_images");
    fetch("https://api.cloudinary.com/v1_1/syedzoheb/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImageURL(data?.secure_url);
        setImageSubmitted(true);
        // e.target.value = null;
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error: Image is not uploaded, try again");
        setImageSubmitted(false);
      });
  };

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
            <h2>Please submit your app details below</h2>

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
                  className="input input-bordered input-error w-full "
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
                  <option disabled defaultValue={"Pick one"}>
                    Pick one
                  </option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Developer Tools">Developer Tools</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
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
                  className="input input-bordered input-error w-full "
                  required
                />
                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Image</span>
                  <span className="label-text-alt">*Aspect Ratio(16 / 9)</span>
                </label>
                <input
                  type="file"
                  name="productimage"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImagePreview}
                  // onChange={handleImagePreview}
                  className="file-input file-input-bordered input-error w-full "
                  required
                />
                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Description</span>
                  <span className="label-text-alt">max: 80 chars</span>
                </label>
                <textarea
                  placeholder="Describe product in 80 chars"
                  name="productDesc"
                  onChange={handleInput}
                  value={state.productDesc}
                  maxLength="80"
                  className="textarea textarea-bordered leading-tight textarea-error textarea-md w-full"
                ></textarea>

                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control pt-4">
                <button className="btn gap-2">
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
          <div className="md:w-1/2">
            <h2 className="pb-4 text-center text-lg font-bold mb-5">
              This is how your product / app will appear
            </h2>
            <div className="card bg-base-100">
              <figure>
                <img
                  src={
                    productImage
                      ? productImage
                      : "https://images.meesho.com/images/products/44009963/kxwus_512.jpg"
                  }
                  alt="Shoes"
                  className="aspect-video object-cover"
                />
              </figure>
              <div className="card-body">
                {state.productName ? (
                  <h2 className="card-title text-lg">{state.productName} </h2>
                ) : (
                  <h2 className="card-title text-lg">Product Title</h2>
                )}

                {state.productDesc ? (
                  <p className="pb-2 text-sm">{state.productDesc}</p>
                ) : (
                  <p className="pb-2 text-sm">
                    "If a dog chews shoes whose shoes does he choose? If a dog
                    chews shoes whose shoes does he choose? If a dog chews shoes
                    whose shoes does he choose?"
                  </p>
                )}

                <div className="mx-auto md:mx-0 md:flex justify-between gap-2 items-center py-2">
                  <div className="card-actions justify-start">
                    <div className="indicator">
                      <span className="indicator-item badge badge-secondary">
                        0
                      </span>
                      <button className={"btn btn-square btn-outline "}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className={
                            "inline-block w-8 h-8 stroke-current fill-yellow-500 "
                          }
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
                  <div className="card-actions md:justify-end md:py-0 py-4">
                    {/* <div className="badge badge-outline">Fashion</div> */}
                    <div className="badge badge-sm badge-outline">
                      {productCategory ? productCategory : "Health & Fitness"}
                    </div>
                  </div>
                </div>

                {/* Maker and URL */}

                <div className="mx-auto md:mx-0 md:flex justify-between gap-2 items-center py-2 ">
                  <div className="card-actions justify-start">
                    <span className="text-sm">
                      by : {session?.user?.user_metadata?.full_name}
                    </span>
                  </div>
                  <div className="card-actions md:justify-end md:py-0 py-4">
                    {/* <div className="badge badge-outline">Fashion</div> */}
                    <div>
                      <Link
                        href={state.productURL ? state.productURL : "#"}
                        className="btn btn-square btn-sm btn-outline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
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
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Maker and URL */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SubmitApp;
