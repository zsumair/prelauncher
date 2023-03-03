import React from "react";

function Hero() {
  return (
    <div className="py-10 md:py-10">
      <div className="hero h-50 md:h-[300px] rounded-md overflow-hidden bg-base-400 ">
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="tracking-wide text-pink-600 text-2xl mb-6 font-mono">
              Find:
              <span className="text-gray-800 dark:text-gray-400 font-bold tracking tracking-widest">
                Your next favorite products before everyone
              </span>
            </h1>
            <h2 className="font-sans tracking-widest text-lg text-justify">
              Bridging the gap between Makers and Users with early access and
              early feedback to the products.
            </h2>
            <div className="mt-4 text-center">
              <button className="btn">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
