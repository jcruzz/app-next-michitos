"use client"

import ListVenta from "@/app/components/crud/ListVenta"
import HeaderAuth from "@/app/components/header/HeaderAuth"

const Venta: React.FC = () => {
    return (
        <div className="dark:bg-[#0A101D] transition-all duration-200">
        <HeaderAuth />
        <div className="container mx-auto pt-8">
          <ListVenta/>
        </div>
        <div className="container mx-auto pt-6">
          {/* Modal para Crear o Editar Producto */}
        </div>
      </div>
    )
}

export default Venta