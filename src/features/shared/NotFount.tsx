import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFount = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-800">404 Not Found</h1>
      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Button
        className="flex gap-2 items-center mt-10"
        onClick={() => navigate("/admin/user")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <p>Volver al inicio</p>
      </Button>
    </div>
  );
};
