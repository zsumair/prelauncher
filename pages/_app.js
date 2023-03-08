import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextNProgress color="#EADDCD" startPosition={0.5} />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.5,
          }}
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: { opacity: 0 },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <ToastContainer />
    </SessionContextProvider>
  );
}
