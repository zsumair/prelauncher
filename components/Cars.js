import { UserContext } from "@/contexts/UserContext";
import Login from "@/pages/login";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import Skeleton from "./ui/Skeleton/Skeleton";

export const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};

export async function getServerSideProps({ query: { page = 1 } }) {
  const { from, to } = getPagination(page, 10);
  const { data, count } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("id", { ascending: true })
    .range(from, to);

  console.log("supaaaa");

  return {
    props: {
      data: data,
      count: count,
      page: +page,
    },
  };
}

function Cars({ data, count, page }) {
  const router = useRouter();

  return (
    <div>
      This
      {/* {data.map((carsdata) => (
        <ul key={carsdata.id}>
          <li>{carsdata.name}</li>
        </ul>
      ))} */}
      {/* <button onClick={() => router.push(`/Cars?page=${page - 1}`)}>
          Prev
        </button>
        <button onClick={() => router.push(`/Cars?page=${page + 1}&range=0-9`)}>
          Next
        </button> */}
    </div>
  );
}

export default Cars;
