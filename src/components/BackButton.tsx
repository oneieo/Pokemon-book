"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="w-[80px] h-[30px] mt-[20px] mb-[30px] rounded-lg bg-blue-600 text-white"
      onClick={() => router.back()}
    >
      뒤로가기
    </button>
  );
};

export default BackButton;
