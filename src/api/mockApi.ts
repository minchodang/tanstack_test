// Mock API 함수 - 에러를 발생시킵니다
export const failingMutationApi = async (data: { message: string }) => {
  // 1초 후 에러 발생
  await new Promise((resolve) => setTimeout(resolve, 1000));

  throw new Error(`API 에러 발생: ${data.message}`);
};

// 성공하는 API (비교용)
export const successMutationApi = async (data: { message: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, data };
};
