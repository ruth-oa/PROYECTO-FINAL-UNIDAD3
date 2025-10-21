import React from "react";

export default function HeroSlide({ img, title, text, btnText, btnLink, fontClass }) {
  return (
    <div className="relative">
      <img
        src={img}
        alt={title}
        className="w-full h-[50vh] object-cover"
      />
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 text-left p-5 rounded-lg">
        <h2
          className={`text-black text-[clamp(1rem,3vw,4rem)] font-bold ${fontClass || ""}`}
        >
          {title}
        </h2>
        <p className="text-black text-[clamp(0.7rem,1.8vw,1.2rem)] mb-3">
          {text}
        </p>
        {btnText && (
          <a
            href={btnLink}
            className="bg-gradient-to-tr from-[#f1ac2a] to-[#e69a00] text-white font-semibold uppercase text-sm px-6 py-2 rounded-full shadow hover:-translate-y-2 hover:shadow-lg transition-all duration-300 inline-block"
          >
            {btnText}
          </a>
        )}
      </div>
    </div>
  );
}
