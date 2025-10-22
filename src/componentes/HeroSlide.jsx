import React from "react";

export default function HeroSlide({ img, title, text, btnText, btnLink, fontClass }) {
  return (
    <div className="relative w-full">
      <img
        src={img}
        alt={title}
        className="w-full object-cover"
        style={{
          height: `
            clamp(10vh, 30vh, 60vh)
          `,
        }}
      />

      <div className="absolute top-1/2 left-[8%] -translate-y-1/2 text-left p-4 rounded-lg">
        <h2
          className={`text-black font-bold ${fontClass || ""}`}
          style={{
            fontSize: "clamp(1.2rem, 4vw, 3.5rem)",
          }}
        >
          {title}
        </h2>

        <p className="text-black text-[clamp(0.8rem,2vw,1.2rem)] mb-3">
          {text}
        </p>

        {btnText && (
          <a
            href={btnLink}
            className="bg-gradient-to-tr from-[#f1ac2a] to-[#e69a00] 
              text-white font-semibold uppercase text-xs sm:text-sm px-5 py-2 rounded-full 
              shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-300 inline-block"
          >
            {btnText}
          </a>
        )}
      </div>
    </div>
  );
}
