import {
  HiCheckCircle,
  HiMiniExclamationTriangle,
  HiMiniXCircle,
} from "react-icons/hi2";

type AlertType = "Success" | "Error" | "Warning";

type AlertProps = {
  type: AlertType;
  message: string;
  onClose: () => void;
};

const backgroundColors = {
  Success: "#22C55E",
  Error: "#EF4444",
  Warning: "#F97316",
};

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const typeAlert = () => {
    switch (type) {
      case "Success":
        return (
          <div className="flex flex-col justify-center mr-3 px-3">
            <div className="flex items-center text-gray-700 pt-3 pb-1">
              <div className="message-success w-1/12">
                <HiCheckCircle size={30} className="items-center" />
              </div>
              <div className="ml-8 font-black text-size-16 text-color-gray my-auto w-11/12 dark:text-white">
                Confirmación
              </div>
            </div>
          </div>
        );
      case "Error":
        return (
          <div className="flex flex-col justify-center mr-3 px-3">
            <div className="flex items-center text-gray-700 pt-3 pb-1">
              <div className="message-error w-1/12">
                <HiMiniXCircle size={30} className="items-center" />
              </div>
              <div className="ml-8 font-black text-size-16 text-color-gray my-auto w-11/12 dark:text-white">
                Error
              </div>
            </div>
          </div>
        );

      case "Warning":
        return (
          <div className="flex flex-col justify-center mr-3 px-3">
            <div className="flex items-center text-gray-700 pt-3 pb-1">
              <div className="message-warning w-1/12">
                <HiMiniExclamationTriangle size={30} className="items-center" />
              </div>
              <div className="ml-8 font-black text-size-16 text-color-gray my-auto w-11/12 dark:text-white">
                Información
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div
      className="border border-gray-300 alert-box flex w-full rounded-lg flex-col max-w-[350px] transform items-start justify-start  bg-white transition delay-200 duration-500 ease-in-out select-none dark:bg-[#374151] dark:text-white dark:border-2 dark:border-gray-500"
      style={{ zIndex: "100" }}
    >
      {typeAlert()}

      <div className="flex w-full items-start justify-between pb-3 px-3 pt-1">
        <span className="font-medium text-gray-600 text-sm dark:text-white">
          {message}
        </span>
        <span
          className="cursor-pointer duration-300 hover:opacity-70"
          onClick={onClose}
        ></span>
      </div>
      <div
        style={{
          backgroundColor: backgroundColors[type],
        }}
        className="flex h-2 w-full items-center justify-center rounded-b-lg"
      ></div>
    </div>
  );
};

export default Alert;
