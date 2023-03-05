import { UserContext } from "@/contexts/UserContext";
import Login from "@/pages/login";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function ProductCard({ product }) {
  const { profile } = useContext(UserContext);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetchVotes();
  }, []);

  function fetchVotes() {
    supabase
      .from("votes")
      .select()
      .eq("product_id", product.id)
      .then((res) => setVotes(res.data));
  }

  const isVotedByMe = !!votes?.find((vote) => vote?.user_id === profile?.id);

  async function toggleVote() {
    if (!profile) {
      return router.push("/login");
    }
    if (isVotedByMe) {
      supabase
        .from("votes")
        .delete()
        .eq("product_id", product.id)
        .eq("user_id", profile.id)
        .then((res) => {
          fetchVotes();
        });
      return;
    }
    await supabase
      .from("votes")
      .insert({
        product_id: product.id,
        user_id: profile.id,
      })
      .then((res) => {
        fetchVotes();
      });

    // console.log(profile);
  }

  return (
    <>
      <div className="card bg-base-100 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
        <figure>
          <img
            src={product?.product_image}
            alt="Shoes"
            className="aspect-video object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg">{product?.product_name}</h2>
          <p className="pb-2 text-sm">{product?.product_desc}</p>
          <div className="mx-auto md:mx-0 md:flex justify-between gap-2 items-center py-2">
            <div className="card-actions justify-start">
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">
                  {votes?.length}
                </span>
                <button
                  className={
                    "btn btn-square btn-outline " +
                    (isVotedByMe ? "bg-current" : "")
                  }
                  onClick={toggleVote}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className={
                      "inline-block w-8 h-8  " +
                      (isVotedByMe
                        ? "fill-yellow-500 stroke-white"
                        : "stroke-current")
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
                {product?.category}
              </div>
            </div>
          </div>

          {/* Maker and URL */}

          <div className="mx-auto md:mx-0 md:flex justify-between gap-2 items-center py-2 ">
            <div className="card-actions justify-start">
              <span className="text-sm">by : {profile?.name}</span>
            </div>
            <div className="card-actions md:justify-end md:py-0 py-4">
              {/* <div className="badge badge-outline">Fashion</div> */}
              <div>
                <Link
                  href={product?.product_url}
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
    </>
  );
}

export default ProductCard;
