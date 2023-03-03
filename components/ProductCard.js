import { UserContext } from "@/contexts/UserContext";
import Login from "@/pages/login";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Skeleton from "./ui/Skeleton/Skeleton";

function ProductCard() {
  const { profile } = useContext(UserContext);
  const router = useRouter();

  async function toggleVote() {
    if (!profile) {
      return router.push("/login");
    }
    console.log(profile);
  }

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="text-center  bg-slate-300 backdrop-filter backdrop-blur-lg bg-opacity-5">
            {" "}
            // sticky top-16 z-5
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">What We Do</h2>
            <p className="text-lg sm:text-2xl mb-6 md:mb-14">
              Save time managing advertising & Content for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            <div className="card bg-base-100 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
              <figure>
                <img
                  src="https://images.meesho.com/images/products/44009963/kxwus_512.jpg"
                  alt="Shoes"
                  className="aspect-video object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Shoes! check
                  {/* <div className="badge badge-secondary">NEW</div> */}
                </h2>
                <p>
                  If a dog chews shoes whose shoes does he choose? If a dog
                  chews shoes whose shoes does he choose? If a dog chews shoes
                  whose shoes does he choose?
                </p>
                <div className="md:flex justify-between gap-2 items-center mt-2 py-2">
                  <div className="card-actions justify-start">
                    <div className="indicator">
                      <span className="indicator-item badge badge-secondary">
                        0
                      </span>
                      <button onClick={toggleVote} className="btn gap-2">
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
                    <div className="badge badge-sm badge-outline">
                      Health & Fitness
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                  alt="Shoes"
                  className="aspect-video object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Shoes!
                  {/* <div className="badge badge-secondary">NEW</div> */}
                </h2>
                <p>
                  If a dog chews shoes whose shoes does he choose? This is a
                  text extraaaaa
                </p>
                <div className="flex justify-between gap-2 items-center mt-2 py-2">
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
                  <div className="card-actions justify-end">
                    {/* <div className="badge badge-outline">Fashion</div> */}
                    <a href="#" className="badge badge-outline">
                      Health & Fitness
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="card-body items-center text-center gap-4">
                <i className="bi bi-badge-ad text-4xl"></i>
                <h2 className="card-title">Creative ads</h2>
                <p>
                  This is a wider card with <br className="hidden xl:inline" />
                  supporting text below as a <br className="hidden xl:inline" />{" "}
                  natural content.
                </p>
              </div>
            </div>

            <Skeleton />
            <Skeleton />

            <div className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="card-body items-center text-center gap-4">
                <i className="bi bi-card-checklist text-4xl"></i>
                <h2 className="card-title">Brand Identity</h2>
                <p>
                  This is a wider card with <br className="hidden xl:inline" />
                  supporting text below as a <br className="hidden xl:inline" />{" "}
                  natural content.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="card-body items-center text-center gap-4">
                <i className="bi bi-wallet2 text-4xl"></i>
                <h2 className="card-title">Budget & Marketing</h2>
                <p>
                  This is a wider card with <br className="hidden xl:inline" />
                  supporting text below as a <br className="hidden xl:inline" />{" "}
                  natural content.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="card-body items-center text-center gap-4">
                <i className="bi bi-funnel text-4xl"></i>
                <h2 className="card-title">Optimize conversions</h2>
                <p>
                  This is a wider card with <br className="hidden xl:inline" />
                  supporting text below as a <br className="hidden xl:inline" />{" "}
                  natural content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <button className="btn btn-outline btn-block">Load More</button>
    </>
  );
}

export default ProductCard;
