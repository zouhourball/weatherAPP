import { useRef, useEffect,useContext } from "react";
import { init, getInstanceByDom  } from "echarts";
import type { CSSProperties } from "react";
import { dateFromDT } from "../../utils";
import { WeatherContext } from "../../context/WeatherContext";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";

import styled from "styled-components";

export interface ReactEChartsProps {
  option?: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}
  
export function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  const { weatherData } = useContext(WeatherContext);
  
  let Defaultoption: any = { 
    tooltip: {
      trigger: 'axis',
      axisPointer: {
           type: 'shadow',
      }  
      },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    }  , 
    series: [
      {
        data: [],
        itemStyle: {  color :'#2de2f0c7'},
        type: 'bar'
      }
    ]
  };
 
  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    } 
    // Add chart resize listener 
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null && weatherData ) {  
      Defaultoption.series[0].data = weatherData.daily.map(e =>  e.temp.day )  
      Defaultoption.xAxis.data =  weatherData.daily.map(e => dateFromDT(e.dt) )  
      Defaultoption.tooltip.formatter = (params:any) => ( params[0].data + " " + weatherData.unit.symbol); 
      const chart = getInstanceByDom(chartRef.current);
      chart && chart.setOption(Defaultoption, settings);
    }
  }, [option, settings, weatherData]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current); 
      if (chart)
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);

  return (<div>
   <H5>Prévision de la semaine</H5>
   <div ref={chartRef} style={{ width: "100%", height: "350px", ...style }} />
   </div>
  );
} 

const H5 = styled.form`
  text-align : center;
  color : black; 
  margin-top : 50px;
  font-weight : bold;
`;