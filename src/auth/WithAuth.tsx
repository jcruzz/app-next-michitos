import { IResponeUserData } from "@/app/model/UserModel";
import { obtainApiUrl, obtenerCabecera } from "@/app/utils/Utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession, logOut } from "./Auth";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const get = async () => {
        try {
          const URL_API = (await obtainApiUrl()) + "/api/user/";
          const session = await axios.post<IResponeUserData>(
            URL_API,
            { username: getSession().userLogged },
            obtenerCabecera()
          );

          for (let i = 0; i < session.data.roles.length; i++) {
            if (session.data.roles[i].nombreRol !== "ROLE_ADMIN") {
              logOut();
              router.push("/pages/login");
              return null;
            }
          }

        } catch (error) {
          logOut();
          router.push("/pages/login");
        }
      };
      get();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
