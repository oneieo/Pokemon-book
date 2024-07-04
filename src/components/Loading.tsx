import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[url('/pixel_nature.jpg')] bg-cover">
      <h1 className="text-[30px] font-bold mb-10 text-white">
        포켓몬 도감 가져오는 중 ...
      </h1>
      <Image
        src="/DualRing.gif"
        width={150}
        height={150}
        alt="로딩 스피너"
        priority
      />
    </div>
  );
};

export default Loading;
