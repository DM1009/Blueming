import React, { useEffect } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

export default function Map() {
  useEffect(() => {
    const mapScript = document.createElement('script')
    mapScript.async = true
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=62d4491f75cb223bfe5a91626c890790&autoload=false`

    document.head.appendChild(mapScript)

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map')
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        }
        const map = new window.kakao.maps.Map(mapContainer, mapOption)

        // 현재 위치 가져오기
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const latitude = pos.coords.latitude
            const longitude = pos.coords.longitude

            // 현재 위치에 마커 표시
            const markerPosition = new window.kakao.maps.LatLng(
              latitude,
              longitude
            )
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            })
            marker.setMap(map)

            // 지도 중심 이동
            map.setCenter(markerPosition)
          },
          () => {
            alert('위치 정보를 가져오는데 실패했습니다.')
          },
          {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000,
          }
        )
      })
    }

    mapScript.addEventListener('load', onLoadKakaoMap)
  }, [])

  return (
    <div>
      <div id='map' className='w-full map'></div>
    </div>
  )
}
