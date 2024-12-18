import { IResponeLogin } from "@/app/model/ModelLogin";
import { obtainApiUrl } from "@/app/utils/Utils";
import axios from "axios";
import Cookies from "js-cookie";

export const getSession = () => {
  const session = Cookies.get("session");
  return session ? JSON.parse(session) : null;
};

export const logOut = () => {
  Cookies.remove("session");
};

export const login = async (username: string, password: string) => {
  const URL_API = (await obtainApiUrl()) + "/api/auth/signin";

  try {
    const response = await axios.post<IResponeLogin>(URL_API, {
      username: username,
      password: password,
    });

    const dataSession = {
      userLogged: response.data.username,
      idUser: response.data.id,
      rol: response.data.roles,
      token: response.data.accessToken,
    };

    Cookies.set("session", JSON.stringify(dataSession), { expires: 1 });

    return dataSession;
  } catch (error) {
    throw error;
  }
};
