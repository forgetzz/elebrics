"use client"
import React from "react";
import CountUp from "react-countup";
import {
  Globe,
  Music2,
  Users,
  RadioTower,
} from "lucide-react";

export default function Card() {
  const metaData = [
    {
      title: "Countries",
      result: 10,
      icon: <Globe size={28} />,
      suffix: "+",
    },
    {
      title: "Platfrom",
      result: 100,
      icon: <Music2 size={28} />,
      suffix: "+",
    },
    {
      title: "Clients",
      result: 1200,
      icon: <Users size={28} />,
      suffix: "+",
    },
    {
      title: "Sub Aggregators",
      result: 15,
      icon: <RadioTower size={28} />,
      suffix: "+",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-wrap gap-5 p-5">
      {metaData.map((item, index) => (
        <div
          key={index}
          className="
            group
            relative
            overflow-hidden
            w-[220px]
            rounded-2xl
            border border-white/10
            bg-gradient-to-b from-zinc-900 to-black
            p-6
            text-white
            shadow-[0_0_20px_rgba(255,0,80,0.15)]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_0_30px_rgba(255,0,80,0.4)]
          "
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(255,0,80,0.25),transparent_70%)]" />

          {/* Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/15 text-red-400 backdrop-blur-md">
            {item.icon}
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold tracking-wide text-zinc-300">
            {item.title}
          </h2>

          {/* Number */}
          <p className="mt-3 text-4xl font-bold text-white">
            <CountUp
              end={item.result}
              duration={3}
              decimals={item.title === "Music Data" ? 1 : 0}
            />
            {item.suffix}
          </p>

          {/* Bottom line */}
          <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-red-500 to-transparent" />
        </div>
      ))}
    </div>
  );
}