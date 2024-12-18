"use client";

import HeaderUnAuth from "@/app/components/header/HeaderUnAuth";
import LoginForm from "@/app/components/login/Login";
import NoAuth from "@/auth/NoAuth";
import { Button, Label, TextInput } from "flowbite-react";

const Login: React.FC = () => {
  return (
    <div className="dark:bg-[#0A101D] transition-all duration-200">
      <HeaderUnAuth />
      <div className="w-screen pt-28 bg-transparent dark:bg-transparent transition duration-200">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white dark:bg-[#0A101D] sm:mx-0 style-login border dark:border dark:border-gray-600 slide-in-fwd-center">
            <div className="flex flex-col w-full md:w-1/2 p-4">
              <div className="flex flex-col flex-1 justify-center mb-8">
                <h1 className="text-4xl text-center text-gray-600 dark:text-gray-300 font-medium">
                  Bienvenido de nuevo
                </h1>
                <div className="w-full mt-4">
                    <LoginForm/>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 rounded-r-lg bg-login"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoAuth(Login);
