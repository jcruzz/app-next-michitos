import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { useTheme } from "../theme/ToggleTheme";
import { ChartOptions } from "@/app/model/UtilModel";
import { obtenerDatosChart } from "@/app/service/ProductService";

const DonutVentasProducto = () => {
  const [showComponent, setShowComponent] = useState<boolean>(false);

  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const [isActive, setIsActive] = useState<boolean>(false);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    const getInfo = async () => {
      try {
        let labels: string[] = [];
        let values: number[] = [];

        const response = await obtenerDatosChart();

        for (let i = 0; i < response.length; i++) {
          labels.push(response[i].producto);
          values.push(response[i].cantidad);
        }

        setLabels(labels);
        setValues(values);

        setIsActive(true);
        setTimeout(() => {
          setShowComponent(true);
        }, 700);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, []);

  const options: ChartOptions = {
    chart: {
      background: isDarkMode ? "#594C4D" : "#594C4D",
      width: 380,
      type: "pie",
    },
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      labels: {
        colors: "#FFFFFF",
        useSeriesColors: false,
      },
      horizontalAlign: "center",
      position: "top",
    },
    // theme: {
    //   mode: isDarkMode ? "dark" : "light",
    // },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  if (showComponent) {
    return <Chart options={options} series={values} type="donut" />;
  } else {
    return (
      <div
        className={
          isActive
            ? "text-center justify-center items-center flex py-40 slide-out-bck-center"
            : "text-center justify-center items-center flex py-40"
        }
      >
        <Spinner size="xl" />
      </div>
    );
  }
};
export default DonutVentasProducto;
