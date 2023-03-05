import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  async function logoutFromAccount() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function goToLogin() {
    router.push("/login");
  }

  return (
    <div className="sticky z-10 top-0 mb-2 border-base-800 shadow-sm ">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {session?.user?.id && (
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-100"
              >
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li tabIndex={0}>
                  <Link href="/submitapp" className="justify-between">
                    SubmitApp
                  </Link>
                </li>
                <li>{/* <Link>Item 3</Link> */}</li>
              </ul>
            </div>
          )}

          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Prelaunchers
          </Link>
        </div>

        {session?.user?.id && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li tabIndex={0}>
                <Link href="/submitapp">SubmitApp</Link>
              </li>
              <li>{/* <Link>Item 3</Link> */}</li>
            </ul>
          </div>
        )}

        {session?.user?.id ? (
          <div className="navbar-end">
            <button
              onClick={logoutFromAccount}
              // href="/login"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-end">
            <button
              onClick={goToLogin}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"
            >
              Get started
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
