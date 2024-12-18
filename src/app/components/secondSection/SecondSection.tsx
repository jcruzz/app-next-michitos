"use client";

import Image from "next/image";
import DonutVentasProducto from "../charts/DonutVentasProducto";
import ListEntrega from "../crud/ListEntrega";

const SecondSection: React.FC = () => {
  return (
    <div className="bg-transparent flex items-center justify-center bg-hero dark:bg-[#0A101D]">
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6 gap-5">
          <div className="bg-transparent rounded-lg">
            <div>
              <Image
                src={"/images/Inicio.png"}
                alt="BDP"
                width={500}
                height={100}
                priority
                className="my-auto"
              />
            </div>
          </div>

          <div className="bg-[#ECC8AE] rounded-lg border shadow-sm p-4 dark:bg-[#ECC8AE] dark:border-gray-700 col-span-3">
            <div>
              <div className="font-semibold text-white text-2xl dark:text-white mb-4 text-center">
                Control de Entregas y Despachos
              </div>
            </div>
            <ListEntrega />
          </div>

          <div className="bg-[#594C4D] rounded-lg border shadow-sm p-4 dark:bg-[#594C4D] dark:border-gray-700 col-span-2">
            <div>
              <div className="font-semibold text-white text-2xl dark:text-white mb-2 text-center">
                Productos más Vendidos
              </div>
            </div>
            <div className="px-7">
            <DonutVentasProducto />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
