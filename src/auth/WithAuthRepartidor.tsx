import { IDataUser } from "@/app/model/UserModel";
import { obtainApiUrl, obtenerCabecera } from "@/app/utils/Utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession, logOut } from "./Auth";

const withAuthAdministrador = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuthAdministrador: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const get = async () => {
        try {
          const URL_API = await obtainApiUrl();
          const session = await axios.post<IDataUser>(
            URL_API + "/api/user/",
            { username: getSession().userLogged },
            obtenerCabecera()
          );

          for (let i = 0; i < session.data.roles.length; i++) {
            if (session.data.roles[i].nombreRol !== "ROLE_MODERATOR") {
                logOut()
                router.push("/pages/login")
            }
          }

        } catch (error) {
          console.log(error);
          logOut();
          router.push("/pages/login");
        }
      };
      get();
    });
    return <WrappedComponent {...props} />;
  };
  return ComponentWithAuthAdministrador;
};

export default withAuthAdministrador;
