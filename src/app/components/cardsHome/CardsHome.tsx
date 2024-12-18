import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewVenta from "../modal/NewVenta";
import { BsXCircleFill } from "react-icons/bs";

const CardsHome: React.FC = () => {

  const [openModalNew, setOpenModalNew] = useState(false);
    
    const router = useRouter()

    const goRegisterProd = () => {
        router.push("/pages/RegisterProd")
    }

    const goCliente = () => {
      router.push("/pages/cliente")
  }

  const goVenta = () => {
    router.push("/pages/venta")
  }

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
            Registrar Nueva venta
          </div>
        </Modal.Header>
        <NewVenta/>
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

      <div className="slide-in-fwd-center from-blue-50 to-violet-50 flex items-center justify-center mt-9">
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-14">
            <div className="bg-[#B0D2A3] rounded-2xl border-4 px-3 hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={goRegisterProd}>
              <div className="pt-4">
                <div className="flex flex-col">
                  <div className="font-semibold text-xl text-white mx-auto pb-1">
                    Registrar Producto
                  </div>

                  <Image
                    src={"/images/REGISTRODECLIENTES.png"}
                    alt="BDP"
                    width={90}
                    height={100}
                    priority
                    className="mx-auto py-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#F4B9B7] rounded-2xl border-4 px-3 hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={goCliente}>
              <div className="pt-4">
                <div className="flex flex-col">
                  <div className="font-semibold text-xl text-white mx-auto pb-1">
                    Registro del Cliente
                  </div>

                  <Image
                    src={"/images/AGREGARCLIENTES.png"}
                    alt="BDP"
                    width={90}
                    height={100}
                    priority
                    className="mx-auto py-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#A7AFC9] rounded-2xl border-4 px-3 hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={() => setOpenModalNew(true)}>
              <div className="pt-4">
                <div className="flex flex-col">
                  <div className="font-semibold text-xl text-white mx-auto pb-1">
                    Registrar Venta
                  </div>

                  <Image
                    src={"/images/AGEGARVENTA.png"}
                    alt="BDP"
                    width={90}
                    height={100}
                    priority
                    className="mx-auto py-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#C4B2AD] rounded-2xl border-4 px-3 hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={goVenta}>
              <div className="pt-4">
                <div className="flex flex-col">
                  <div className="font-semibold text-xl text-white mx-auto pb-1">
                    Detalle de Ventas
                  </div>

                  <Image
                    src={"/images/ENTREGAS.png"}
                    alt="BDP"
                    width={90}
                    height={100}
                    priority
                    className="mx-auto py-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsHome;
