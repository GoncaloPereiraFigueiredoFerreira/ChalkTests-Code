import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "./HomePage";
import "./HomePage.css";

export function Front() {
  const ref1 = useRef(null);
  const isVisible1 = useIsVisible(ref1);
  const [triggered1, setTriggered1] = useState(false);

  useEffect(() => {
    if (isVisible1) setTriggered1(true);
  }, [ref1, isVisible1]);

  return (
    <>
      {/**<!-- FRONT section -->*/}
      <div
        ref={ref1}
        className={` max-w-full h-screen container pt-6 md:px-6 first-section overflow-hidden transform transition-all ease-in-out duration-1000 ${
          isVisible1 || triggered1 ? " scale-y-100" : " scale-y-110"
        }`}
      >
        <div className="h-full px-6 text-center lg:text-left md:px-12 grid lg:grid-cols-2 lg:gap-x-12">
          <div
            className={`flex flex-col justify-center items-start mb-12 lg:mb-0 transform transition-all ease-in duration-1000 ${
              isVisible1 || triggered1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-56"
            }`}
          >
            <h2 className="my-12 text-5xl font-bold leading-tight tracking-tight">
              Are you ready to begin <br />
              <span className="text-success dark:text-success-400 underline">
                testing your knowledge?
              </span>
            </h2>
            <div className="flex lg:flex-col xl:flex-row">
              <a
                className="mb-2 inline-block hover:scale-110 active:scale-100 rounded bg-black px-12 pt-4 pb-3.5 text-md font-medium uppercase text-white transition-all duration-100 md:mr-2 md:mb-0"
                data-te-ripple-init
                data-te-ripple-color="light"
                href="/register"
                role="button"
              >
                Registe-se Gratuitamente
              </a>
              <a
                className="inline-block btn-animation rounded px-12 pt-4 pb-3.5 text-lg font-medium uppercase transition duration-50 ease-in-out hover:scale-110 hover:font-bold hover:underline"
                data-te-ripple-init
                data-te-ripple-color="light"
                href="/pricing"
                role="button"
              >
                Planos de subscrição
              </a>
            </div>
          </div>
          <div
            className={`flex items-end transform transition-all ease-in duration-1000 ${
              isVisible1 || triggered1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-96"
            }`}
          >
            <img
              src="better-chalky.png"
              className="shadowed object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
