import Layout from "@/components/ui/layout/Layout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Login() {
  let initialState = {
    email: "",
    password: "",
  };

  const supabase = useSupabaseClient();
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [error, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  async function loginWithGoogle(e) {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function loginWithEmail(e) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    const { email, password } = state;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log("user login error", error);
      setLoading(false);
      setErrorMessage(error.message);
      return;
    } else {
      if (data?.user?.id) {
        router.push("/");
        setState(initialState);
        setLoading(false);
        setErrorMessage(null);
      }
    }
  }

  return (
    <Layout>
      <div className="py-12 md:py-24">
        <div className="card bg-base-300 shadow-sm shadow-gray-300 max-w-xl mx-auto mb-8 md:mb-12">
          <div className="card-body">
            <button
              onClick={loginWithGoogle}
              className="btn btn-block bg-white text-black hover:bg-gray-100 hover:text-black !border-base-content/20 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-4"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
                <path d="M1 1h22v22H1z" fill="none"></path>
              </svg>{" "}
              Sign in with Google
            </button>
            <div className="divider">OR</div>

            <form onSubmit={loginWithEmail}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={state.email}
                  placeholder="this@test.com"
                  className="input input-bordered w-full "
                  required
                />
                <label className="label">
                  <span className="label-text-alt">
                    Please enter a valid Email
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInput}
                  value={state.password}
                  placeholder="Enter password"
                  className="input input-bordered w-full "
                  required
                />
                <label className="label">
                  <span className="label-text-alt">This field is required</span>
                </label>
              </div>

              <div className="form-control pt-4">
                <button
                  className={`btn dark:bg-zinc-100 dark:hover:bg-zinc-100 dark:text-black gap-2 ${
                    loading ? "loading" : ""
                  }`}
                >
                  Login
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
            {/* Error show */}
            {error && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <span className="text-white">{error}</span>
                </div>
                <div className="flex-none">
                  <button
                    className="btn btn-sm btn-circle btn-outline dark:text-white dark:hover:bg-zinc-100"
                    onClick={() => setErrorMessage(null)}
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {/* Error show en */}
            <div className="text-center mt-2 dark:text-zinc-200">
              <span>
                Don't have an account yet?{" "}
                <Link href="/signup" className="link">
                  Signup
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
