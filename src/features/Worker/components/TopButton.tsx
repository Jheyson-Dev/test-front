import { ArrowUpCircleIcon } from "lucide-react";
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
          className="fixed right-10 bottom-10  px-2 justify-center items-center animate-bounce"
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowUpCircleIcon size={48} strokeWidth={2} />
        </div>
      )}
    </>
  );
};
