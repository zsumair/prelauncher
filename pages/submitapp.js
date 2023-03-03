import { useState, useEffect } from "react";
import Layout from "@/components/ui/layout/Layout";
import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

function SubmitApp() {
  let initialState = {
    productName: "",
    productURL: "",
    productDesc: "",
  };

  const [productImage, setProductImage] = useState(null);
  const [state, setState] = useState(initialState);
  const [productCategory, setProductCategory] = useState("");
  const supabase = useSupabaseClient();
  const session = useSession();

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

  const handleImagePreview = (e) => {
    console.log(e.target.files);

    setProductImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const { productName, productURL, productDesc } = state;
    supabase
      .from("products")
      .insert({
        product_name: productName,
        product_url: productURL,
        product_desc: productDesc,
        category: productCategory,
        maker: session.user.id,
      })
      .then((res) => {
        console.log("created", res);
        setState(initialState);
        setProductCategory("");
        setProductImage(null);
      });
  };

  return (
    <Layout>
      <div className="py-12 md:py-24">
        <div className="card lg:card-side bg-base-100 shadow-xl flex">
          <div className="card-body">
            <h2>Please submit your app details below</h2>

            <form action="#">
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
                  onChange={handleImagePreview}
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
                </label>
                <textarea
                  placeholder="Enter Product Description"
                  name="productDesc"
                  onChange={handleInput}
                  value={state.productDesc}
                  className="textarea textarea-bordered textarea-error textarea-md w-full"
                ></textarea>

                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control pt-4">
                <button className="btn gap-2" onClick={handleSubmitProduct}>
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
                  <h2 className="card-title">{state.productName} </h2>
                ) : (
                  <h2 className="card-title">Product Title</h2>
                )}

                {state.productDesc ? (
                  <p>{state.productDesc}</p>
                ) : (
                  <p>
                    "If a dog chews shoes whose shoes does he choose? If a dog
                    chews shoes whose shoes does he choose? If a dog chews shoes
                    whose shoes does he choose?"
                  </p>
                )}

                <div className="md:flex justify-between gap-2 items-center mt-2 py-2">
                  <div className="card-actions justify-start">
                    <div className="indicator">
                      <span className="indicator-item badge badge-secondary">
                        0
                      </span>
                      <button className="btn gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Button
                      </button>
                    </div>
                  </div>
                  <div className="card-actions md:justify-end md:py-0 py-4">
                    {/* <div className="badge badge-outline">Fashion</div> */}
                    <div className="badge badge-outline">
                      {productCategory ? productCategory : "Health & Fitness"}
                    </div>
                  </div>
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
