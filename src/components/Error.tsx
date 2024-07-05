import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[url('/pixel_nature.jpg')] bg-cover">
      <h1 className="text-[30px] font-bold mb-10 text-white">
        포켓몬 도감 불러오기 실패 !
      </h1>
      <Link href="/">
        <h3 className="font-semibold text-gray-400 mb-10">홈으로 돌아가기</h3>
      </Link>
      <Image src="/failure.png" width={150} height={130} alt="에러 이미지" />
    </div>
  );
};

export default Error;
