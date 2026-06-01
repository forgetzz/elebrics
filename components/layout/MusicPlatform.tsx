"use client";

import Image from "next/image";


export default function MusicPlatfrom() {
  const clients = [
    "/images/tune.png",
    "/images/soundcloud.png",
    "/images/yt.png",
    "/images/joox.jpg",
    "/images/spotify.png",
    "/images/deezer.png",
  ];

  return (
    <section id="pengalaman" className=" py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
          Plat<span className="text-red-600">from</span>
        </h1>
        {/* <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          Lebih dari puluhan tahun melayani berbagai klien dan proyek di
          Indonesia, dengan kualitas terbaik dan komitmen profesional.
        </p> */}
      </div>

      {/* Marquee Container */}
      <div className="overflow-hidden relative">
        <div className="flex gap-12 animate-marquee">
          {clients.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-24 relative transition"
            >
              <Image
                src={logo}
                alt={`Client ${i + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
          {/* clone biar looping mulus */}
          {clients.map((logo, i) => (
            <div
              key={`clone-${i}`}
              className="flex-shrink-0 w-40 h-24 relative  hover:grayscale-0 transition"
            >
              <Image
                src={logo}
                alt={`Client clone ${i + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
