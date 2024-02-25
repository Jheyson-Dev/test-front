import { useEffect, useState } from "react";

export const TopButton = () => {
  const [view, setView] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setView(true);
      } else {
        setView(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 500) {
          setView(true);
        } else {
          setView(false);
        }
      });
    };
  }, []);
  return (
    <>
      {view && (
        <div
          className="fixed right-10 bottom-10 w-24 h-24 rounded-full flex items-center justify-center text-white   text-2xl font-semibold font-prosto-one cursor-pointer bg-red-500"
          onClick={() => window.scrollTo(0, 0)}
        >
          Subir
        </div>
      )}
    </>
  );
};
