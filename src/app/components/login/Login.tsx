import { useAlert } from "@/app/utils/usAlert";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import * as Yup from "yup";
import { IFormInput } from "@/app/model/ModelLogin";
import { useRouter } from "next/navigation";
import React from "react";
import { HiEye, HiUser, HiXCircle } from "react-icons/hi2";
import { login } from "@/auth/Auth";
import { HiKey } from "react-icons/hi";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("El nombre de usuario es requerido")
    .matches(/^[a-zA-Z ]*$/, "Introducir caracteres válidos"),
  password: Yup.string().required("La contraseña es requerida"),
});

const LoginForm: React.FC = () => {
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const [showSpinner, setSpinner] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSpinner(true);
    const buttonPointer = document.querySelector("#login-button");
    buttonPointer?.setAttribute("disabled", "true");
    try {
      const userLogin = await login(data.username, data.password);

      buttonPointer?.removeAttribute("disabled");
      setSpinner(false);

      for (let i = 0; i < userLogin.rol.length; i++) {
        if (userLogin.rol[i] === "ROLE_MODERATOR") {
          setTimeout(() => {
            showAlert("Success", "Credenciales correctas");
            router.push("/pages/home-repartidor");
          }, 500);
        } else if (userLogin.rol[i] === "ROLE_ADMIN") {
          setTimeout(() => {
            showAlert("Success", "Credenciales correctas");
            router.push("/pages/home");
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);

      showAlert("Error", "Credenciales Incorrectas");
      buttonPointer?.removeAttribute("disabled");
      setSpinner(false);
    }
  };

  return (
    <form
      id={"login-form"}
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4 px-5 mx-auto"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Tu nombre de usuario" />
        </div>
        <TextInput
          icon={HiUser}
          id="email2"
          type="text"
          placeholder="Nombre de usuario"
          shadow
          {...register("username")}
        />
        {errors.username && (
          <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
            <HiXCircle size={20} />
            <p className="font-bold">Error: </p>
            <p className="font-normal">{errors.username.message}</p>
          </div>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Tu contraseña" />
        </div>
        <TextInput
          icon={HiKey}
          rightIcon={HiEye}
          autoComplete="off"
          type="password"
          shadow
          placeholder="Contraseña"
          {...register("password")}
        />
        {errors.password && (
          <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
            <HiXCircle size={20} />
            <p className="font-bold">Error: </p>
            <p className="font-normal">{errors.password.message}</p>
          </div>
        )}
      </div>
      <Button type="submit" id="login-button" className="mt-3">
        <div
          hidden={showSpinner}
          className={
            showSpinner ? "slide-out-bck-center" : "slide-in-fwd-center"
          }
        >
          Ingresar
        </div>
        <div className="slide-in-fwd-center" hidden={!showSpinner}>
          <Spinner size="sm" />
        </div>
      </Button>
    </form>
  );
};

export default LoginForm;
