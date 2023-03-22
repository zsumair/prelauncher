import { UserContext } from "@/contexts/UserContext";
import Login from "@/pages/login";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Skeleton from "./ui/Skeleton/Skeleton";
import useSound from "use-sound";

function ProductCard({ product }) {
  const { profile } = useContext(UserContext);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [votes, setVotes] = useState([]);
  const [playVoteSound] = useSound("/sounds/votesound.mp3", {
    volume: 0.2,
  });

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

  const cleanSlug = (slug) => {
    return slug.replace(/\s+/g, "-").toLowerCase();
  };

  async function toggleVote() {
    if (!profile) {
      return router.push("/login");
    }
    if (isVotedByMe) {
      playVoteSound();
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
    playVoteSound();
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
      <div className="card lg:card-side md:card-size bg-base-100 md:px-8 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
        <figure className="rounded-3xl p-3">
          <img
            src={product?.product_image}
            alt={product?.product_name}
            className="rounded-3xl p-3 w-32 h-[8rem] aspect-video object-cover"
          />
        </figure>
        <div className="md:ml-2 card-body">
          <div className="md:flex justify-between">
            <div>
              <Link
                href={product?.product_url}
                // className="btn btn-square btn-xs btn-outline dark:hover:bg-zinc-100"
                className="hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                <h2 className="card-title font-extrabold text-xl font-sans">
                  {product?.product_name}

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
                </h2>
              </Link>
              <div className=""></div>
              <p className="text-gray-500 font-semibold text-sm py-1 dark:text-slate-400">
                {product?.product_desc}
              </p>
            </div>

            <div className="mt-4 block md:card-actions md:justify-end md:mt-0">
              <div className="indicator block mb-4 md:mb-7">
                <button
                  className={
                    "btn btn-sm btn-ghost bg-[#f3f4f6] outline-0 border-0  text-black transition-all  dark:hover:bg-zinc-300 normal-case " +
                    (isVotedByMe
                      ? "bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-white"
                      : "")
                  }
                  onClick={toggleVote}
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
                  <span className="px-1 font-semibold capitalize ">upvote</span>
                  <div className="badge badge-md">{votes?.length}</div>
                </button>
              </div>
              <Link
                href={"/category/" + product?.category}
                className="font-semibold capitalize text-sm bg-gray-100 rounded-3xl px-4 p-3 hover:underline dark:bg-gray-700"
              >
                {product?.category}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Previous one Starts here*/}
      {/* <div className="card bg-base-100 shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600">
        <figure>
          <Image
            src={product?.product_image}
            alt={product?.product_name}
            width={500}
            height={500}
            className="aspect-video object-cover"
          />
        </figure>
        <div className="card-body py-3 px-4">
          <h2 className="card-title text-lg dark:text-gray-300">
            {product?.product_name}
          </h2>
          <p className="pb-2 text-sm dark:text-zinc-300">
            {product?.product_desc}
          </p>
          <div className="mx-auto md:mx-0 flex justify-between gap-2 items-center py-2">
            <div className="card-actions justify-start">
              <div className="indicator">
                <span className="indicator-item badge badge-sm badge-secondary">
                  {votes?.length}
                </span>
                <button
                  className={
                    "btn btn-sm btn-square btn-outline transition-all dark:hover:bg-zinc-300 " +
                    (isVotedByMe ? "bg-current dark:bg-zinc-500" : "")
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
            <div className="card-actions md:justify-end md:py-0 py-4 transition-all hover:scale-125">
              <Link
                href={"/category/" + product?.category}
                className="badge badge-sm badge-outline dark:text-zinc-300"
              >
                {product?.category}
              </Link>
            </div>
          </div> */}

      {/* Maker and URL */}

      {/* <div className="mx-auto md:mx-0 flex justify-between gap-2 items-center py-2 ">
            <div className="card-actions justify-start">
              <span className="text-sm dark:text-zinc-300">
                by : {product?.profiles?.name}
              </span>
            </div>
            <div className="card-actions md:justify-end md:py-0 py-4">
              <div className="transition hover:-rotate-12">
                <Link
                  href={product?.product_url}
                  className="btn btn-square btn-sm btn-outline dark:hover:bg-zinc-100"
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
          </div> */}
      {/* Maker and URL */}
      {/* </div>
      </div> */}
    </>
  );
}

export default ProductCard;
