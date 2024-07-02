import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <h1 className="text-[30px] font-bold">포켓몬 깨우기 실패 !</h1>
      <Link href="/">
        <h3 className="font-semibold text-gray-400">홈으로 돌아가기</h3>
      </Link>
      <Image src="/error.png" width={150} height={150} alt="에러 이미지" />
    </div>
  );
};

export default Error;
