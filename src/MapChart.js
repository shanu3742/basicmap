import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";




const MapChart = ({ setTooltipContent }) => {
    const [highpopulation,setHighpopulation] = useState(null)
   
    const rounded = num => {
        if (num > 1000000000) {

            setHighpopulation('red')
          return Math.round(num / 100000000) / 10 + "Bn";
        }else if (num>100000000/2){
            setHighpopulation('#FF7F7F')
          return Math.round(num / 100000) / 10 + "M";
        }
        
        else if (num > 1000000) {
          setHighpopulation('#90EE90')
          return Math.round(num / 100000) / 10 + "M";
        }
         else {
            setHighpopulation('green')
          return Math.round(num / 100) / 10 + "K";
        }
      };
    
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },

                    hover: {
                      fill: `${highpopulation}`,
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
