"use client"

import ListCliente from "@/app/components/crud/ListCliente";
import HeaderAuth from "@/app/components/header/HeaderAuth";

const Cliente: React.FC = () => {
  return (
    <div className="dark:bg-[#0A101D] transition-all duration-200">
      <HeaderAuth />
      <div className="container mx-auto pt-8">
        <ListCliente />
      </div>
      <div className="container mx-auto pt-6">
        {/* Modal para Crear o Editar Producto */}
      </div>
    </div>
  );
};

export default Cliente;
