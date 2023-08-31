declare global {
  interface Window {
    kakao: any // 여기에서 any 대신에 Kakao 지도 API에 맞는 타입을 정의하면 더 안전합니다.
  }
}

export {}
