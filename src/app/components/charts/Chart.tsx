import { ChartOptions } from "@/app/model/UtilModel";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false})

interface ChartProps {
    options: ChartOptions
    series: ApexAxisChartSeries | ApexNonAxisChartSeries
    type:
    | "line"
    | "bar"
    | "area"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "radar"
    | "rangeBar"
    | "polarArea";
  width?: string | number;
  height?: string | number;
}

const Chart: React.FC<ChartProps> = ({
    options,
    series,
    type,
    width,
    height,
  }) => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null;
    }
  
    return (
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        width={width}
        height={height}
      />
    );
  };
  
  export default Chart;