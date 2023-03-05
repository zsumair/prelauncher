import { UserContext } from "@/contexts/UserContext";
import Login from "@/pages/login";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Cars from "./Cars";
import ProductCard from "./ProductCard";
import Skeleton from "./ui/Skeleton/Skeleton";

function Products({ children }) {
  const { profile } = useContext(UserContext);
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="text-center  bg-slate-300 backdrop-filter backdrop-blur-lg bg-opacity-5 sticky top-16 z-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">What We Do</h2>
            <p className="text-lg sm:text-2xl mb-6 md:mb-14">
              Save time managing advertising & Content for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {children}
            {/* Main container below */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
