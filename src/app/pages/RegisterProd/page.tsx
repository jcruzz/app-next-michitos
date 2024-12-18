"use client";


import ListProductos from "@/app/components/crud/ListProductos";
import HeaderAuth from "@/app/components/header/HeaderAuth";
import { ICategoria, IProducto, IProveedor } from "@/app/model/ProductModel";
import { obtenerCategorias } from "@/app/service/CategoriaService";
import {
  actualizarProducto,
  borrarProducto,
  obtenerProductos,
} from "@/app/service/ProductService";
import { obtenerProveedores } from "@/app/service/ProveedorService";
import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  idProducto: number;
  nombreProducto: string;
  cantidadstock: string;
  precioProducto: string;
  descripcion: string;
  costoProducto: string;
  codUnidadMedida: string;
  imagenReferencial?: File | null;
  categorias: string;
  proveedor: string;
};

const RegistrarProducto: React.FC = () => {
  return (
    <>
      <div className="dark:bg-[#0A101D] transition-all duration-200">
        <HeaderAuth />
        <div className="container mx-auto pt-8">
          <ListProductos />
        </div>
        <div className="container mx-auto pt-6">
          {/* Modal para Crear o Editar Producto */}
        </div>
      </div>
    </>
  );
};

export default RegistrarProducto;
