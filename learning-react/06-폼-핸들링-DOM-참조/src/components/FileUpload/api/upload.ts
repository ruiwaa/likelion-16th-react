import type { ResponseData } from "./type";

// api 변수 선언
const { VITE_IMGBB_URL: apiUrl, VITE_IMGBB_API_KEY: apiKey } = import.meta.env;

const getEndPoint = () => {
  const url = new URL(apiUrl);
  url.searchParams.append("key", apiKey);
  return url.toString();
};

export const uploadFile = async (
  formData: FormData,
  options: RequestInit = {},
): Promise<ResponseData> => {
  try {
    // 서버에 파일 업로드 요청
    // 폼데이터
    const response = await fetch(getEndPoint(), {
      ...options,
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("파일 업로드 실패!");
    }

    return response.json();
  } catch (error) {
    console.error("에러 발생!");
    // 에러 객체가 맞다면(타입 검사) 바로 내보내기 아니면 다시 에러로 만들기
    throw error instanceof Error ? error : new Error(String(error));
  }
};
