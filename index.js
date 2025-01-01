// index.js
// Our main React code that imports the variables from "variables.js"

import React from "react";
import ReactDOM from "react-dom";

// Import all variables
import {
  // TOP 3
  primaryColorName,
  primaryColorHexCode,
  primaryColorType,
  primaryColorTextColor,
  primaryColorRgb,
  primaryColorCmyk,
  primaryColorHexSpec,
  primaryColorPantone,

  primaryBackgroundColorName,
  primaryBackgroundColorHexCode,
  primaryBackgroundColorType,
  primaryBackgroundColorTextColor,
  primaryBackgroundColorRgb,
  primaryBackgroundColorCmyk,
  primaryBackgroundColorHexSpec,
  primaryBackgroundColorPantone,

  secondaryBackgroundColorName,
  secondaryBackgroundColorHexCode,
  secondaryBackgroundColorType,
  secondaryBackgroundColorTextColor,
  secondaryBackgroundColorRgb,
  secondaryBackgroundColorCmyk,
  secondaryBackgroundColorHexSpec,
  secondaryBackgroundColorPantone,

  // 15 items
  primaryColor2Name,
  primaryColor2HexCode,
  primaryColor2Type,
  primaryColor2TextColor,
  primaryColor2Rgb,
  primaryColor2Cmyk,
  primaryColor2HexSpec,
  primaryColor2Pantone,

  primaryBackgroundColor2Name,
  primaryBackgroundColor2HexCode,
  primaryBackgroundColor2Type,
  primaryBackgroundColor2TextColor,
  primaryBackgroundColor2Rgb,
  primaryBackgroundColor2Cmyk,
  primaryBackgroundColor2HexSpec,
  primaryBackgroundColor2Pantone,

  secondaryBackgroundColor2Name,
  secondaryBackgroundColor2HexCode,
  secondaryBackgroundColor2Type,
  secondaryBackgroundColor2TextColor,
  secondaryBackgroundColor2Rgb,
  secondaryBackgroundColor2Cmyk,
  secondaryBackgroundColor2HexSpec,
  secondaryBackgroundColor2Pantone,

  secondaryColor1Name,
  secondaryColor1HexCode,
  secondaryColor1Type,
  secondaryColor1TextColor,
  secondaryColor1Rgb,
  secondaryColor1Cmyk,
  secondaryColor1HexSpec,

  secondaryColor2Name,
  secondaryColor2HexCode,
  secondaryColor2Type,
  secondaryColor2TextColor,
  secondaryColor2Rgb,
  secondaryColor2Cmyk,
  secondaryColor2HexSpec,

  secondaryColor3Name,
  secondaryColor3HexCode,
  secondaryColor3Type,
  secondaryColor3TextColor,
  secondaryColor3Rgb,
  secondaryColor3Cmyk,
  secondaryColor3HexSpec,

  miscColor1Name,
  miscColor1HexCode,
  miscColor1Type,
  miscColor1TextColor,
  miscColor1Rgb,
  miscColor1Cmyk,
  miscColor1HexSpec,

  miscColor2Name,
  miscColor2HexCode,
  miscColor2Type,
  miscColor2TextColor,

  miscColor3Name,
  miscColor3HexCode,
  miscColor3Type,
  miscColor3TextColor,

  miscColor4Name,
  miscColor4HexCode,
  miscColor4Type,
  miscColor4TextColor,

  miscColor5Name,
  miscColor5HexCode,
  miscColor5Type,
  miscColor5TextColor,

  miscColor6Name,
  miscColor6HexCode,
  miscColor6Type,
  miscColor6TextColor,

  miscColor7Name,
  miscColor7HexCode,
  miscColor7Type,
  miscColor7TextColor,

  miscColor8Name,
  miscColor8HexCode,
  miscColor8Type,
  miscColor8TextColor,

  miscColor9Name,
  miscColor9HexCode,
  miscColor9Type,
  miscColor9TextColor,
} from "./variables.js";

// 1) Build topThreeColors
const topThreeColors = [
  {
    name: primaryColorName,
    color: primaryColorHexCode,
    type: primaryColorType,
    textColor: primaryColorTextColor,
    specs: {
      rgb: primaryColorRgb,
      cmyk: primaryColorCmyk,
      hex: primaryColorHexSpec,
      pantone: primaryColorPantone
    }
  },
  {
    name: primaryBackgroundColorName,
    color: primaryBackgroundColorHexCode,
    type: primaryBackgroundColorType,
    textColor: primaryBackgroundColorTextColor,
    specs: {
      rgb: primaryBackgroundColorRgb,
      cmyk: primaryBackgroundColorCmyk,
      hex: primaryBackgroundColorHexSpec,
      pantone: primaryBackgroundColorPantone
    }
  },
  {
    name: secondaryBackgroundColorName,
    color: secondaryBackgroundColorHexCode,
    type: secondaryBackgroundColorType,
    textColor: secondaryBackgroundColorTextColor,
    specs: {
      rgb: secondaryBackgroundColorRgb,
      cmyk: secondaryBackgroundColorCmyk,
      hex: secondaryBackgroundColorHexSpec,
      pantone: secondaryBackgroundColorPantone
    }
  }
];

// 2) Build colorData
const colorData = [
  {
    name: primaryColor2Name,
    color: primaryColor2HexCode,
    type: primaryColor2Type,
    textColor: primaryColor2TextColor,
    specs: {
      rgb: primaryColor2Rgb,
      cmyk: primaryColor2Cmyk,
      hex: primaryColor2HexSpec,
      pantone: primaryColor2Pantone
    }
  },
  {
    name: primaryBackgroundColor2Name,
    color: primaryBackgroundColor2HexCode,
    type: primaryBackgroundColor2Type,
    textColor: primaryBackgroundColor2TextColor,
    specs: {
      rgb: primaryBackgroundColor2Rgb,
      cmyk: primaryBackgroundColor2Cmyk,
      hex: primaryBackgroundColor2HexSpec,
      pantone: primaryBackgroundColor2Pantone
    }
  },
  {
    name: secondaryBackgroundColor2Name,
    color: secondaryBackgroundColor2HexCode,
    type: secondaryBackgroundColor2Type,
    textColor: secondaryBackgroundColor2TextColor,
    specs: {
      rgb: secondaryBackgroundColor2Rgb,
      cmyk: secondaryBackgroundColor2Cmyk,
      hex: secondaryBackgroundColor2HexSpec,
      pantone: secondaryBackgroundColor2Pantone
    }
  },
  {
    name: secondaryColor1Name,
    color: secondaryColor1HexCode,
    type: secondaryColor1Type,
    textColor: secondaryColor1TextColor,
    specs: {
      rgb: secondaryColor1Rgb,
      cmyk: secondaryColor1Cmyk,
      hex: secondaryColor1HexSpec
    }
  },
  {
    name: secondaryColor2Name,
    color: secondaryColor2HexCode,
    type: secondaryColor2Type,
    textColor: secondaryColor2TextColor,
    specs: {
      rgb: secondaryColor2Rgb,
      cmyk: secondaryColor2Cmyk,
      hex: secondaryColor2HexSpec
    }
  },
  {
    name: secondaryColor3Name,
    color: secondaryColor3HexCode,
    type: secondaryColor3Type,
    textColor: secondaryColor3TextColor,
    specs: {
      rgb: secondaryColor3Rgb,
      cmyk: secondaryColor3Cmyk,
      hex: secondaryColor3HexSpec
    }
  },
  {
    name: miscColor1Name,
    color: miscColor1HexCode,
    type: miscColor1Type,
    textColor: miscColor1TextColor,
    specs: {
      rgb: miscColor1Rgb,
      cmyk: miscColor1Cmyk,
      hex: miscColor1HexSpec
    }
  },
  {
    name: miscColor2Name,
    color: miscColor2HexCode,
    type: miscColor2Type,
    textColor: miscColor2TextColor
  },
  {
    name: miscColor3Name,
    color: miscColor3HexCode,
    type: miscColor3Type,
    textColor: miscColor3TextColor
  },
  {
    name: miscColor4Name,
    color: miscColor4HexCode,
    type: miscColor4Type,
    textColor: miscColor4TextColor
  },
  {
    name: miscColor5Name,
    color: miscColor5HexCode,
    type: miscColor5Type,
    textColor: miscColor5TextColor
  },
  {
    name: miscColor6Name,
    color: miscColor6HexCode,
    type: miscColor6Type,
    textColor: miscColor6TextColor
  },
  {
    name: miscColor7Name,
    color: miscColor7HexCode,
    type: miscColor7Type,
    textColor: miscColor7TextColor
  },
  {
    name: miscColor8Name,
    color: miscColor8HexCode,
    type: miscColor8Type,
    textColor: miscColor8TextColor
  },
  {
    name: miscColor9Name,
    color: miscColor9HexCode,
    type: miscColor9Type,
    textColor: miscColor9TextColor
  }
];

// 3) useDynamicScale: smaller text/circles on mobile
function useDynamicScale() {
  const [scale, setScale] = React.useState({
    circleSize: 24,
    baseTextSize: 12
  });

  React.useEffect(() => {
    function handleResize() {
      let w = window.innerWidth;
      if (w > 1200) w = 1200;

      if (w <= 600) {
        const ratioA = w / 600;
        // Circles => 4..24
        const circleA = 4 + (24 - 4) * ratioA;
        // Text => 6..14
        const textA   = 6 + (14 - 6) * ratioA;
        setScale({ circleSize: circleA, baseTextSize: textA });
      } else {
        const ratioB = (w - 600) / 600;
        // Circles => 24..60
        const circleB = 24 + (60 - 24) * ratioB;
        // Text => 14..20
        const textB   = 14 + (20 - 14) * ratioB;
        setScale({ circleSize: circleB, baseTextSize: textB });
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scale;
}

// 4) Card component
function Card({ type = "short", mainColor, circleColors = [], layout = "vertical" }) {
  const isTall = (type === "tall");
  const containerClass = "w-full rounded-xl shadow-md p-3 flex overflow-hidden";

  const circlesLayout =
    (layout === "vertical")
      ? "flex flex-col justify-center items-end space-y-2"
      : "flex flex-row items-center justify-end space-x-2";

  const { circleSize, baseTextSize } = useDynamicScale();

  let finalCircleSize = circleSize;
  const ccount = circleColors.length;
  if (isTall && ccount >= 8) {
    finalCircleSize = Math.min(finalCircleSize, 40);
  } else if (!isTall && ccount >= 8) {
    finalCircleSize = Math.min(finalCircleSize, 32);
  } else if (!isTall && ccount === 2) {
    finalCircleSize = Math.min(finalCircleSize, 48);
  }

  const bgColor = mainColor?.color || "#C4FC50";
  const textCol = mainColor?.textColor || "#000";

  // Smaller multipliers
  const nameSize  = isTall ? baseTextSize * 1.2 : baseTextSize * 1.0;
  const typeSize  = isTall ? baseTextSize * 1.0 : baseTextSize * 0.7;
  const specsSize = isTall ? baseTextSize * 0.7 : baseTextSize * 0.5;

  return React.createElement(
    "div",
    { className: containerClass, style: { backgroundColor: bgColor } },
    // Left side
    React.createElement(
      "div",
      { className: "flex flex-col justify-between", style: { color: textCol, maxWidth: "50%" } },
      // First child => name & type
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { style: { fontSize: nameSize, fontWeight: 700, marginBottom: "0.4rem" } },
          mainColor.name
        ),
        mainColor.type && (
          isTall
            ? mainColor.type.split(" ").map((word, idx) => (
                React.createElement(
                  "p",
                  { key: idx, style: { fontSize: typeSize, fontWeight: 600, lineHeight: 1.2 } },
                  word
                )
              ))
            : React.createElement(
                "p",
                { style: { fontSize: typeSize, fontWeight: 600, lineHeight: 1.2 } },
                mainColor.type
              )
        )
      ),
      // Specs
      mainColor.specs && (
        React.createElement(
          "div",
          null,
          Object.entries(mainColor.specs).map(([key, val], i) => {
            if (key.toUpperCase() === "CMYK") {
              // hide on mobile => "hidden sm:block"
              return React.createElement(
                "p",
                {
                  key: i,
                  className: "hidden sm:block",
                  style: { fontSize: specsSize, lineHeight: 1.3, marginBottom: "0.25rem" }
                },
                `${key.toUpperCase()}: ${val}`
              );
            }
            return React.createElement(
              "p",
              {
                key: i,
                style: { fontSize: specsSize, lineHeight: 1.3, marginBottom: "0.25rem" }
              },
              `${key.toUpperCase()}: ${val}`
            );
          })
        )
      )
    ),
    // Right side => circles
    React.createElement(
      "div",
      { className: `${circlesLayout} flex-grow` },
      circleColors.map((c, idx) =>
        React.createElement(
          "div",
          {
            key: idx,
            className: "rounded-full shrink-0",
            style: { width: finalCircleSize, height: finalCircleSize, backgroundColor: c.color },
            title: c.name
          }
        )
      )
    )
  );
}

// 5) Rows
const row1CircleSet = colorData.slice(3, 10);
const row1 = {
  id: "row1",
  type: "tall",
  columns: 3,
  layout: "vertical",
  mainColors: topThreeColors.map(mc => [mc, ...row1CircleSet])
};

const row2Main = colorData.slice(3, 7);
const row2CircleSet = colorData.slice(3, 11);
const row2 = {
  id: "row2",
  type: "short",
  columns: 4,
  layout: "vertical",
  mainColors: row2Main.map(mc => [mc, ...row2CircleSet])
};

const row3MainSet = colorData.slice(7, 11);
const row3CircleSet = colorData.slice(7, 9);
const row3 = {
  id: "row3",
  type: "short",
  columns: 4,
  layout: "horizontal",
  mainColors: row3MainSet.map(mc => [mc, ...row3CircleSet])
};

const row4MainSet = colorData.slice(11);
const row4CircleSet = colorData.slice(9, 11);
const row4 = {
  id: "row4",
  type: "short",
  columns: 4,
  layout: "horizontal",
  mainColors: row4MainSet.map(mc => [mc, ...row4CircleSet])
};

const rows = [row1, row2, row3, row4];

// Row component => "grid grid-cols-N gap-2 mb-2"
function Row({ rowType, columns, layout, mainColors }) {
  return React.createElement(
    "div",
    { className: `grid grid-cols-${columns} gap-2 mb-2` },
    mainColors.map((arr, idx) => {
      const [ mainC, ...rest ] = arr;
      return React.createElement(
        Card,
        { key: idx, type: rowType, mainColor: mainC, circleColors: rest, layout }
      );
    })
  );
}

// 6) App => container
function App() {
  return React.createElement(
    "div",
    { style: { maxWidth: "1200px", margin: "0 auto", padding: "1rem" } },
    rows.map(r =>
      React.createElement(
        Row,
        {
          key: r.id,
          rowType: r.type,
          columns: r.columns,
          layout: r.layout,
          mainColors: r.mainColors
        }
      )
    )
  );
}

// Render
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById("root")
);
