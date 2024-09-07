const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports=withMT( {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primarypurple: "#5932EA",
      textsecondary:"#7C838A",
      textprimary:"#4D4D4D",
      inputbg:"#B0BAC3",
      purplelight:"#DFD7FE",
      white:"#ffff",
      bodybg:"#FAFBFF"
      
      

    }
  },
  plugins: [],
}
);