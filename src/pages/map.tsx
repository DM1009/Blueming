import React, { useEffect, useState } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

export default function KakaoMap(): JSX.Element {
  const [map, setMap] = useState<any>()
  const [marker, setMarker] = useState<any>()

  // 1) 카카오맵 불러오기
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=a72fc6bf15e62b1fda4f059d7b156f6b'
    script.async = true

    script.onload = () => {
      // Kakao 지도 스크립트가 로드된 후에 코드 실행
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      }

      setMap(new window.kakao.maps.Map(container, options))
      setMarker(new window.kakao.maps.Marker())
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // 2) 현재 위치 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보를 가져오는데 실패했습니다.'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    )
  }

  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos: GeolocationPosition) => {
    // 현재 위치(위도, 경도) 가져온다.
    let currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude // 경도
    )
    // 지도를 이동 시킨다.
    map.panTo(currentPos)

    // 기존 마커를 제거하고 새로운 마커를 넣는다.
    marker.setMap(null)
    marker.setPosition(currentPos)
    marker.setMap(map)
  }

  return (
    <div>
      <div id='map' style={{ width: '100%', height: '400px' }}></div>
      <div onClick={getCurrentPosBtn}>현재 위치</div>
    </div>
  )
}
