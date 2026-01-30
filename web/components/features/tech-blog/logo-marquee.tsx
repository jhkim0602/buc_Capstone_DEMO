"use client";

import Image from "next/image";

const LOGOS = [
  "29cm.ico",
  "8percent.ico",
  "ab180.ico",
  "banksalad.ico",
  "coupang.ico",
  "daangn.ico",
  "dable.ico",
  "danawa.ico",
  "devsisters.ico",
  "gccompany.ico",
  "hyperconnect.ico",
  "kakao.ico",
  "kakaopay.ico",
  "kurly.ico",
  "levit.ico",
  "line.ico",
  "musinsa.ico",
  "naver.ico",
  "oliveyoung.ico",
  "qanda.ico",
  "saramin.ico",
  "socar.ico",
  "toss.ico",
  "wanted.ico",
  "watcha.ico",
  "woowahan.ico",
  "yogiyo.ico",
  "zigbang.ico",
];

export function LogoMarquee() {
  return (
    <div className="w-full bg-background py-4 overflow-hidden relative">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-background via-transparent to-background" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...LOGOS, ...LOGOS].map((logo, index) => {
          const name = logo.split(".")[0];
          return (
            <div
              key={`${name}-${index}`}
              className="flex items-center justify-center mx-8 w-[60px] h-[60px] relative transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110"
            >
              <Image
                src={`/logos/${logo}`}
                alt={`${name} tech blog`}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
