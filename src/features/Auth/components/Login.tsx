import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface formData {
  username: string;
  password: string;
}
export const Login = () => {
  // Estados para el manejo de los datos del formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Navegar entre rutas
  const navigate = useNavigate();

  // React Query Mutation

  const loginMutation = useMutation({
    mutationFn: async (data: formData) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data);
        localStorage.setItem("rol", data.body.rol);
        localStorage.setItem("usuario", data.body.username);
        toast.success(data.body.message, {
          style: {
            backgroundColor: "#10B981",
            color: "#fff",
          },
        });
        if (data.body.rol === "administrador") navigate("/admin/user");
        if (data.body.rol === "trabajador") navigate("/worker");
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.body, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });

  // Manejar el submit del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, password });

    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container max-w-full mx-auto py-24 px-6">
        <div className="font-sans">
          <div className="max-w-sm mx-auto px-6">
            <div className="relative flex flex-wrap">
              <div className="w-full relative">
                <div className="mt-6">
                  <div className="mb-5 pb-4 border-b-2 text-center font-base text-gray-700 text-3xl font-poppins upp">
                    <span>DeyBiParts</span>
                  </div>
                  {/* <div className="text-center font-semibold text-black">
                    Lorem ipsum dolor, sit amet?
                  </div> */}
                  <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-lg">
                      <div className="py-2">
                        <span className="px-1 text-sm text-gray-600">
                          Username
                        </span>
                        <input
                          type="text"
                          placeholder="username"
                          autoComplete="off"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                      </div>
                      <div className="py-2" x-data="{ show: true }">
                        <span className="px-1 text-sm text-gray-600">
                          Password
                        </span>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                          />
                        </div>
                      </div>
                      {/* <div className="flex justify-between">
                        <label className="block text-gray-500 font-bold my-4">
                          <input
                            type="checkbox"
                            className="leading-loose text-pink-600"
                          />
                          <span className="py-2 text-sm text-gray-600 leading-snug">
                            Remember Me
                          </span>
                        </label>
                        <label className="block text-gray-500 font-bold my-4">
                          <a
                            href="#"
                            className="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"
                          >
                            <span>Forgot Password?</span>
                          </a>
                        </label>
                      </div> */}
                      <button
                        type="submit"
                        className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
