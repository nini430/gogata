/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        150:"150px",
        190:"190px",
        300:"300px",

        350:"350px"
        
       
      },
      height:{
        80:"80px",
        225:"225px",
        370:"370px",
        420:"420px",
        650:"650px",

      
      },
      screens:{
        sm:"640px",
        md:"768px",
        lg:"1024px",
        xl:"1280px",
        "2xl":"1536px"
      },
      colors:{
        headingColor:"#2e2e2e",
        textColor:"#515151",
        cartNumBg:"#e80013",
        primary:"#f5f3f3",
        cartOverlay:"rgba(256,256,256,0.6)",
        lightText:"#9ca0ab",
        lightOrange:"rgba(255,131,0,0.1)"
      },
      minWidth:{
        210:"210px",
        350:"350px",
        620:"620px"
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}


