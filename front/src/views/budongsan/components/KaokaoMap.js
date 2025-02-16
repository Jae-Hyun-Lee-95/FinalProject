import React, { useEffect } from 'react';

function KakaoMap() {
    useEffect(() => {
        // 카카오맵 API가 로드된 후 실행될 콜백 함수
        const initMap = () => {
            const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
            const mapOption = { 
                center: new window.kakao.maps.LatLng(37.5528112179, 126.93794821), // 지도의 중심좌표
                level: 10 // 지도의 확대 레벨
            };

            // 지도를 생성합니다
            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            // 주소-좌표 변환 객체를 생성합니다
            const geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch('학암동 671', function(result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === window.kakao.maps.services.Status.OK) {

                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                } 
            }); 
            
        };

        initMap();
        
    }, []);

    return (
        <div className='containerMap parentContainer'>
            <div id="map"></div>
        </div>
    );
}

export default KakaoMap;
