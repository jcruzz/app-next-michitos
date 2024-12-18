"use client"

import ListUsuarios from "@/app/components/crud/ListUsuarios";
import HeaderAuth from "@/app/components/header/HeaderAuth";
import NewUser from "@/app/components/modal/NewUser";
import withAuth from "@/auth/WithAuth";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";

const AdmninistrationUsers: React.FC = () => {

    const [openModalNew, setOpenModalNew] = useState<boolean>(false)

  return (
    <>
      <Modal
        show={openModalNew}
        size={"7xl"}
        onClose={() => setOpenModalNew(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Ver Detalles del Producto
          </div>
        </Modal.Header>
        <NewUser/>
        <Modal.Footer className="footer-bg bg-[#F4EEF3] border-t-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="mx-auto py-4">
            <Button type="button" onClick={() => setOpenModalNew(false)}>
              <div className="flex flex-row">
                <div className="my-auto">Cerrar</div>
                <div className="my-auto ml-3">
                  <BsXCircleFill size={18} />
                </div>
              </div>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>


      <HeaderAuth />
      <div className="dark:bg-[#0A101D] transition-all duration-200">
      <div className="container mx-auto mt-6 ">
      <div className="flex flex-row justify-between">
        <div className="text-gray-700 text-2xl font-semibold dark:text-gray-300 mb-1">
          Lista de Usuarios
        </div>
        <Button
          onClick={() => {
            setOpenModalNew(true);
          }}
        >
          <div className="my-auto">Registrar nuevo Usuario</div>
          <div className="my-auto ml-3">
            <HiUserAdd size={20} />
          </div>
        </Button>
      </div>
      <div className="w-64 border-2 mb-5 border-[#6DB26D]"></div>
      <ListUsuarios/>
      </div>
      </div>
    </>
  );
};

export default withAuth(AdmninistrationUsers);
