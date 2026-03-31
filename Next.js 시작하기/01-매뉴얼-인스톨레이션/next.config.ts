import type { NextConfig } from "next";

// 빌드 할 것인지 여부 확인 필요
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // 더 나은 개발 환경을 위해 스트릿트 모드는 필수
  reactStrictMode: true,

  // 컴파일러 옵션 설정
  compiler: {
    removeConsole: isProduction ? { exclude: ["warn", "error"] } : false,
  },
};

export default nextConfig;
