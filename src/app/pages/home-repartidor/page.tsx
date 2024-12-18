"use client"

import ListEntregasPorUsuario from "@/app/components/crud/ListEntregasPorUsuario";
import HeaderAuth from "@/app/components/header/HeaderAuth";
import HeaderRepartidor from "@/app/components/header/HeaderRepartidor";
import withAuthAdministrador from "@/auth/WithAuthRepartidor";

const HomeRepartidor: React.FC = () => {
  return (
    <div className="bg-hero bg-cover bg-center h-full">
      <HeaderRepartidor />
      <ListEntregasPorUsuario/>
      </div>
  );
};

export default withAuthAdministrador(HomeRepartidor);
