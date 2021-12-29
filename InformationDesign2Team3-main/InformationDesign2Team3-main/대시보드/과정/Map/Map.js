var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = {
        center: new kakao.maps.LatLng(37.61972782200497, 127.06089191076839), // 지도의 중심좌표 
        level: 3 // 지도의 확대 레벨 
    };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var Selectinfo = "" //현재 선택된 카테고리 정보

readTextFile1('json/fast.json')
readTextFile2('json/slow.json')
readTextFile3('json/EV_Charging_Station_Information.json')


var markerImageSrc = 'image/category_icon2.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
fastMarkers = [], // 급속 마커 객체를 가지고 있을 배열입니다
    slowMarkers = [], // 완속 마커 객체를 가지고 있을 배열입니다
    bothMarkers = []; // 혼합 마커 객체를 가지고 있을 배열입니다

changeMarker('fast'); // 지도에 급속 마커가 보이도록 설정합니다    

function readTextFile1(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                createfastMarkers(eval(allText)); // 급속 마커를 생성하고 급속 마커 배열에 추가합니다
            }
        }
    }
    rawFile.send(null);
}

function readTextFile2(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                createslowMarkers(eval(allText)); // 완속 마커를 생성하고 완속 마커 배열에 추가합니다
            }
        }
    }
    rawFile.send(null);
}

function readTextFile3(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                createbothMarkers(eval(allText)); // 혼합 마커를 생성하고 혼합 마커 배열에 추가합니다
            }
        }
    }
    rawFile.send(null);
}


// 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image
    });

    return marker;
}

// 급속 마커를 생성하고 급속 마커 배열에 추가하는 함수입니다
function createfastMarkers(data) {
    data.forEach((element, i) => {
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 0),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:10px;text-align:center;width:auto;height:auto;white-space:nowrap;">'+ element.Place + '<br>' + '급속 충전기 : ' + element.Fast + '<br>' + '완속 충전기 : ' + element.Slow +'</div>', // 인포윈도우에 표시할 내용
        });

        var latloninfo = new kakao.maps.LatLng(element.Lat, element.Lon);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(latloninfo, markerImage);


        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        // 생성된 마커를 급속 마커 배열에 추가합니다
        fastMarkers.push(marker);
    });


}

// 급속 마커들의 지도 표시 여부를 설정하는 함수입니다
function setfastMarkers(map) {
    for (var i = 0; i < fastMarkers.length; i++) {
        fastMarkers[i].setMap(map);
    }
}

// 완속 마커를 생성하고 완속 마커 배열에 추가하는 함수입니다
function createslowMarkers(data) {

    data.forEach((element, i) => {
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 36),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        var infowindow = new kakao.maps.InfoWindow({
            //content: '<span class="info-title">'+ element.Place + '<br>' + '급속 충전기 : ' + element.Fast + '<br>' + '완속 충전기 : ' + element.Slow +'</span>', // 인포윈도우에 표시할 내용
            content: '<div style="padding:10px;text-align:center;width:auto;height:auto;white-space: nowrap;">'+ element.Place + '<br>' + '급속 충전기 : ' + element.Fast + '<br>' + '완속 충전기 : ' + element.Slow +'</div>', // 인포윈도우에 표시할 내용
        });

        var latloninfo = new kakao.maps.LatLng(element.Lat, element.Lon);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(latloninfo, markerImage);


        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        // 생성된 마커를 급속 마커 배열에 추가합니다
        slowMarkers.push(marker);
    });
}

// 완속 마커들의 지도 표시 여부를 설정하는 함수입니다
function setslowMarkers(map) {
    for (var i = 0; i < slowMarkers.length; i++) {
        slowMarkers[i].setMap(map);
    }
}

// 혼합 마커를 생성하고 혼합 마커 배열에 추가하는 함수입니다
function createbothMarkers(data) {
    data.forEach((element, i) => {
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 72),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        var infowindow = new kakao.maps.InfoWindow({
            //content: '<span class="info-title">'+ element.Place + '<br>' + '급속 충전기 : ' + element.Fast + '<br>' + '완속 충전기 : ' + element.Slow +'</span>' // 인포윈도우에 표시할 내용
            content: '<div style="padding:10px;text-align:center;width:auto;height:auto;white-space: nowrap;">'+ element.Place + '<br>' + '급속 충전기 : ' + element.Fast + '<br>' + '완속 충전기 : ' + element.Slow +'</div>', // 인포윈도우에 표시할 내용
        });

        var latloninfo = new kakao.maps.LatLng(element.Lat, element.Lon);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(latloninfo, markerImage);


        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        // 생성된 마커를 급속 마커 배열에 추가합니다
        bothMarkers.push(marker);
    });
}

// 혼합 마커들의 지도 표시 여부를 설정하는 함수입니다
function setbothMarkers(map) {
    for (var i = 0; i < bothMarkers.length; i++) {
        bothMarkers[i].setMap(map);
    }
}

function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
    };
}

// 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
function changeMarker(type) {
    Selectinfo = type;
    var fastMenu = document.getElementById('fastMenu');
    var slowMenu = document.getElementById('slowMenu');
    var bothMenu = document.getElementById('bothMenu');

    // 급속 카테고리가 클릭됐을 때
    if (type === 'fast') {

        // 급속 카테고리를 선택된 스타일로 변경하고
        fastMenu.className = 'menu_selected';

        // 완속과 혼합 카테고리는 선택되지 않은 스타일로 바꿉니다
        slowMenu.className = '';
        bothMenu.className = '';

        // 급속 마커들만 지도에 표시하도록 설정합니다
        setfastMarkers(map);
        setslowMarkers(null);
        setbothMarkers(null);

    } else if (type === 'slow') { // 완속 카테고리가 클릭됐을 때

        // 완속 카테고리를 선택된 스타일로 변경하고
        fastMenu.className = '';
        slowMenu.className = 'menu_selected';
        bothMenu.className = '';

        // 완속 마커들만 지도에 표시하도록 설정합니다
        setfastMarkers(null);
        setslowMarkers(map);
        setbothMarkers(null);

    } else if (type === 'both') { // 혼합 카테고리가 클릭됐을 때

        // 혼합 카테고리를 선택된 스타일로 변경하고
        fastMenu.className = '';
        slowMenu.className = '';
        bothMenu.className = 'menu_selected';

        // 혼합 마커들만 지도에 표시하도록 설정합니다
        setfastMarkers(null);
        setslowMarkers(null);
        setbothMarkers(map);
    }

}

function wheelEvent()
{
    var level = map.getLevel();
    if(level>13)
    {
        setfastMarkers(null);
        setslowMarkers(null);
        setbothMarkers(null);
    }
    else
    {
        changeMarker(Selectinfo);
    }
}