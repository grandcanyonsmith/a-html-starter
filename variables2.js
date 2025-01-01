/*******************************************************
 * High-Stakes Healthcare–Inspired Color Variables
 * (Renamed to match the new structure & naming)
 ******************************************************/

/**
 * PRIMARY
 */
export const primaryLightColor = {
  name: "Primary Light Tint",
  color: "#4D81F5", // Example "lighter" blue
  type: "PRIMARY (LIGHT)",
  textColor: "#000000",
  specs: {
    rgb: "77,129,245",
    cmyk: "69,47,0,4",
    hex: "#4D81F5",
    pantone: "N/A"
  }
};

export const primaryBaseColor = {
  name: "Primary Base",
  color: "#0052D9", // Core "Vital Blue"
  type: "PRIMARY",
  textColor: "#FFFFFF",
  specs: {
    rgb: "0,82,217",
    cmyk: "100,62,0,15",
    hex: "#0052D9",
    pantone: "N/A"
  }
};

export const primaryDarkColor = {
  name: "Primary Dark Tint",
  color: "#012A4A", // A darker navy/blue
  type: "PRIMARY (DARK)",
  textColor: "#FFFFFF",
  specs: {
    rgb: "1,42,74",
    cmyk: "99,43,0,71",
    hex: "#012A4A",
    pantone: "N/A"
  }
};

/**
 * SECONDARY
 */
export const secondaryLightColor = {
  name: "Secondary Light Tint",
  color: "#83C5BE", // A lighter teal
  type: "SECONDARY (LIGHT)",
  textColor: "#000000",
  specs: {
    rgb: "131,197,190",
    cmyk: "34,0,4,23",
    hex: "#83C5BE",
    pantone: "N/A"
  }
};

export const secondaryBaseColor = {
  name: "Secondary Base",
  color: "#009688", // Teal
  type: "SECONDARY",
  textColor: "#FFFFFF",
  specs: {
    rgb: "0,150,136",
    cmyk: "100,0,43,41",
    hex: "#009688",
    pantone: "N/A"
  }
};

export const secondaryDarkColor = {
  name: "Secondary Dark Tint",
  color: "#4D4F53", // A deep gray
  type: "SECONDARY (DARK)",
  textColor: "#FFFFFF",
  specs: {
    rgb: "77,79,83",
    cmyk: "7,5,0,68",
    hex: "#4D4F53",
    pantone: "N/A"
  }
};

/**
 * ACCENT
 */
export const accentLightColor = {
  name: "Accent Light",
  color: "#DBCFB9", // Light tan
  type: "ACCENT (LIGHT)",
  textColor: "#000000",
  specs: {
    rgb: "219,207,185",
    cmyk: "0,6,15,14",
    hex: "#DBCFB9",
    pantone: "N/A"
  }
};

export const accentBaseColor = {
  name: "Accent Base",
  color: "#FC8540", // Orange accent
  type: "ACCENT",
  textColor: "#000000",
  specs: {
    rgb: "252,133,64",
    cmyk: "0,52,78,1",
    hex: "#FC8540",
    pantone: "N/A"
  }
};

export const accentDarkColor = {
  name: "Accent Dark",
  color: "#2D5A27", // Dark green accent
  type: "ACCENT (DARK)",
  textColor: "#FFFFFF",
  specs: {
    rgb: "45,90,39",
    cmyk: "50,0,57,65",
    hex: "#2D5A27",
    pantone: "N/A"
  }
};

/**
 * NEUTRALS (5)
 */
export const neutral1Color = {
  name: "Neutral 1",
  color: "#FFFFFF",
  type: "NEUTRAL",
  textColor: "#000000",
  specs: {
    rgb: "255,255,255",
    cmyk: "0,0,0,0",
    hex: "#FFFFFF",
    pantone: "N/A"
  }
};

export const neutral2Color = {
  name: "Neutral 2",
  color: "#EDEDED",
  type: "NEUTRAL",
  textColor: "#000000",
  specs: {
    rgb: "237,237,237",
    cmyk: "0,0,0,7",
    hex: "#EDEDED",
    pantone: "N/A"
  }
};

export const neutral3Color = {
  name: "Neutral 3",
  color: "#E0E1E2",
  type: "NEUTRAL",
  textColor: "#000000",
  specs: {
    rgb: "224,225,226",
    cmyk: "1,0,0,11",
    hex: "#E0E1E2",
    pantone: "N/A"
  }
};

export const neutral4Color = {
  name: "Neutral 4",
  color: "#767676",
  type: "NEUTRAL",
  textColor: "#FFFFFF",
  specs: {
    rgb: "118,118,118",
    cmyk: "0,0,0,54",
    hex: "#767676",
    pantone: "N/A"
  }
};

export const neutral5Color = {
  name: "Neutral 5",
  color: "#333333",
  type: "NEUTRAL",
  textColor: "#FFFFFF",
  specs: {
    rgb: "51,51,51",
    cmyk: "0,0,0,80",
    hex: "#333333",
    pantone: "N/A"
  }
};

/**
 * STATUS (success, warning, error)
 */
export const successColor = {
  name: "Success",
  color: "#2D5A27", // Same as accentDarkColor for example
  type: "STATUS",
  textColor: "#FFFFFF",
  specs: {
    rgb: "45,90,39",
    cmyk: "50,0,57,65",
    hex: "#2D5A27",
    pantone: "N/A"
  }
};

export const warningColor = {
  name: "Warning",
  color: "#FC8540", // Same as accentBaseColor for example
  type: "STATUS",
  textColor: "#000000",
  specs: {
    rgb: "252,133,64",
    cmyk: "0,52,78,1",
    hex: "#FC8540",
    pantone: "N/A"
  }
};

export const errorColor = {
  name: "Error",
  color: "#D42D2D",
  type: "STATUS",
  textColor: "#FFFFFF",
  specs: {
    rgb: "212,45,45",
    cmyk: "0,79,79,17",
    hex: "#D42D2D",
    pantone: "N/A"
  }
};

/**
 * BACKGROUND COLORS (primary, secondary, accent)
 */
export const primaryBgColor = {
  name: "Primary BG",
  color: "#FFFFFF",
  type: "PRIMARY BG",
  textColor: "#000000",
  specs: {
    rgb: "255,255,255",
    cmyk: "0,0,0,0",
    hex: "#FFFFFF",
    pantone: "N/A"
  }
};

export const secondaryBgColor = {
  name: "Secondary BG",
  color: "#000000",
  type: "SECONDARY BG",
  textColor: "#FFFFFF",
  specs: {
    rgb: "0,0,0",
    cmyk: "0,0,0,100",
    hex: "#000000",
    pantone: "N/A"
  }
};

export const accentBgColor = {
  name: "Accent BG",
  color: "#4D4F53",
  type: "ACCENT BG",
  textColor: "#FFFFFF",
  specs: {
    rgb: "77,79,83",
    cmyk: "7,5,0,68",
    hex: "#4D4F53",
    pantone: "N/A"
  }
};
