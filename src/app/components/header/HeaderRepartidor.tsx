import { Avatar, Dropdown, Navbar } from "flowbite-react";
import ThemeToggleButton, { useTheme } from "../theme/ToggleTheme";
import Image from "next/image";
import { HiUserCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { logOut } from "@/auth/Auth";
import { useEffect, useState } from "react";
import { IDataUser } from "@/app/model/UserModel";
import { obtenerDatosUsuario } from "@/app/service/UserService";
import { formatRol } from "@/app/utils/Utils";

const HeaderRepartidor = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const [userData, setUserData] = useState<IDataUser>({
    emailUsuario: "",
    idUsuario: 0,
    roles: [],
    username: "",
  });

  useEffect(() => {
    const get = async () => {
      try {
        setUserData(await obtenerDatosUsuario());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  return (
    <div className="bg-white dark:bg-[#0A101D] transition duration-200 border-gray-200 shadow-md dark:border-b dark:border-gray-600 slide-in-top sticky top-0 z-50">
      <Navbar
        fluid
        rounded
        className="container mx-auto  bg-transparent dark:bg-transparent py-0"
      >
        <Navbar.Brand>
          <Image
            src={isDarkMode ? "/images/White.png" : "/images/Dark.png"}
            alt="BDP"
            width={200}
            height={100}
            priority
            className="py-3 cursor-pointer"
            onClick={() => router.push("/pages/home-repartidor")}
          />
        </Navbar.Brand>
        <div className="flex md:order-2 my-auto">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="my-auto text-gray-600 dark:text-white flex flex-row">
                <div className="my-auto pr-2">
                  <div className="font-semibold text-gray-500 text-base text-right dark:text-gray-300">
                    {userData.username.toUpperCase()}
                  </div>
                  <div className="font-normal text-gray-600 text-sm text-right dark:text-gray-300">
                    {userData.roles.map((item) => (formatRol(item.nombreRol)) + " ")}
                  </div>
                </div>
                <HiUserCircle size={55} />
              </div>
            }
          >
            <div className="slide-in-fwd-center">
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  logOut();
                  router.push("/pages/login");
                }}
              >
                Cerrar Sesión
              </Dropdown.Item>
            </div>
          </Dropdown>
          <div className="mx-4 my-auto">
            <ThemeToggleButton />
          </div>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </div>
  );
};

export default HeaderRepartidor;
