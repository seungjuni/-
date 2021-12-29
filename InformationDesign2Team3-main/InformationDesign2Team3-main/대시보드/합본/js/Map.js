var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = {
        center: new kakao.maps.LatLng(37.61972782200497, 127.06089191076839), // 지도의 중심좌표 
        level: 3 // 지도의 확대 레벨 
    };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var NowInfowindow = [];
var Sigunguinfo = [];
var FastCars = [];
var SlowCars = [];
var BothCars = [];
var slowlist = [];
var fastlist = [];
var bothlist = [];

var Selectinfo = "" //현재 선택된 카테고리 정보
var SelectCar = ""
var ischeck = false;

var markerImageSrc = 'image/category_icon2.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
fastMarkers = [], // 급속 마커 객체를 가지고 있을 배열입니다
    slowMarkers = [], // 완속 마커 객체를 가지고 있을 배열입니다
    bothMarkers = []; // 혼합 마커 객체를 가지고 있을 배열입니다

d3.json("json/Sigungu.json", function (error, data) {
    readSigungu(error, data);
});

d3.json("json/Fast.json", function (error, data) { fastdata(error, data) });
d3.json("json/Slow.json", function (error, data) { slowdata(error, data) });
d3.json("json/EV_Charging_Station_Information.json", function (error, data) { bothdata(error, data) });


function fastdata(error, data) {
    if (error) throw error;

    data.forEach((element) => {
        fastlist.push([
            {
                Place: element.Place,
                Address: element.Address,
                Lon: element.Lon,
                Lat: element.Lat,
                Fast: element.Fast,
                Slow: element.Slow,
                Cars: element.Cars,
            },
        ]);
    });

    createfastMarkers(fastlist);
}

function slowdata(error, data) {
    if (error) throw error;

    data.forEach((element) => {
        slowlist.push([
            {
                Place: element.Place,
                Address: element.Address,
                Lon: element.Lon,
                Lat: element.Lat,
                Fast: element.Fast,
                Slow: element.Slow,
                Cars: element.Cars,
            },
        ]);
    });

    createslowMarkers(slowlist);
}

function bothdata(error, data) {
    if (error) throw error;

    data.forEach((element) => {
        bothlist.push([
            {
                Place: element.Place,
                Address: element.Address,
                Lon: element.Lon,
                Lat: element.Lat,
                Fast: element.Fast,
                Slow: element.Slow,
                Cars: element.Cars,
            },
        ]);
    });


    createbothMarkers(bothlist);
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
            content: '<div style="padding:10px;text-align:center;width:auto;height:auto;white-space:nowrap;">' + element[0].Place + '<br>' + '급속 충전기 : ' + element[0].Fast + '<br>' + '완속 충전기 : ' + element[0].Slow + '</div>', // 인포윈도우에 표시할 내용
        });

        var latloninfo = new kakao.maps.LatLng(element[0].Lat, element[0].Lon);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(latloninfo, markerImage);


        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        FastCars.push(element[0].Cars);

        // 생성된 마커를 급속 마커 배열에 추가합니다
        fastMarkers.push(marker);
    });
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
            content: '<div style="padding:10px;text-align:center;width:auto;height:auto;white-space: nowrap;">' + element[0].Place + '<br>' + '급속 충전기 : ' + element[0].Fast + '<br>' + '완속 충전기 : ' + element[0].Slow + '</div>', // 인포윈도우에 표시할 내용
        });

        var latloninfo = new kakao.maps.LatLng(element[0].Lat, element[0].Lon);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(latloninfo, markerImage);


        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        SlowCars.push(element[0].Cars);

        // 생성된 마커를 급속 마커 배열에 추가합니다
        slowMarkers.push(marker);
    });

    changeMarker('slow'); // 지도에 급속 마커가 보이도록 설정합니다    
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
            content: '<div style="padding:10px;text-align:center;width:auto;height:auto;white-space: nowrap;">' + element[0].Place + '<br>' + '급속 충전기 : ' + element[0].Fast + '<br>' + '완속 충전기 : ' + element[0].Slow + '</div>', // 인포윈도우에 표시할 내용
        });

        var latloninfo = new kakao.maps.LatLng(element[0].Lat, element[0].Lon);

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(latloninfo, markerImage);


        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        BothCars.push(element[0].Cars);

        // 생성된 마커를 급속 마커 배열에 추가합니다
        bothMarkers.push(marker);
    });
}

// 급속 마커들의 지도 표시 여부를 설정하는 함수입니다
function setfastMarkers(map) {
    count = 0;
    for (var i = 0; i < fastMarkers.length; i++) {

        if (map != null) {
            var index = FastCars[i].indexOf(SelectCar);

            if (index > -1 && ischeck == true) {
                fastMarkers[i].setMap(map);
                count++;
            }
            else if (ischeck == false) {
                fastMarkers[i].setMap(map);

            }
        }
        else {
            fastMarkers[i].setMap(map);
        }
    }
}

// 완속 마커들의 지도 표시 여부를 설정하는 함수입니다
function setslowMarkers(map) {
    count = 0;
    for (var i = 0; i < slowMarkers.length; i++) {

        if (map != null) {
            var index = SlowCars[i].indexOf(SelectCar);

            if (index > -1 && ischeck == true) {
                slowMarkers[i].setMap(map);
                count++;
            }
            else if (ischeck == false) {
                slowMarkers[i].setMap(map);
            }
        }
        else {
            slowMarkers[i].setMap(map);
        }
    }

}

// 혼합 마커들의 지도 표시 여부를 설정하는 함수입니다
function setbothMarkers(map) {
    count = 0;
    for (var i = 0; i < bothMarkers.length; i++) {

        if (map != null) {
            var index = BothCars[i].indexOf(SelectCar);

            if (index > -1 && ischeck == true) {
                bothMarkers[i].setMap(map);
                count++;
            }
            else if (ischeck == false) {
                bothMarkers[i].setMap(map);
            }
        }
        else {
            bothMarkers[i].setMap(map);
        }
    }
}

function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
        NowInfowindow.push(infowindow);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
        NowInfowindow = NowInfowindow.filter((element) => element !== infowindow);
    };
}

// 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
function changeMarker(type) {
    Selectinfo = type;
    var fastMenu = document.getElementById('fastMenu');
    var slowMenu = document.getElementById('slowMenu');
    var bothMenu = document.getElementById('bothMenu');

    setfastMarkers(null);
    setslowMarkers(null);
    setbothMarkers(null);

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
        slowMenu.className = 'menu_selected2';
        bothMenu.className = '';

        // 완속 마커들만 지도에 표시하도록 설정합니다
        setfastMarkers(null);
        setslowMarkers(map);
        setbothMarkers(null);

    } else if (type === 'both') { // 혼합 카테고리가 클릭됐을 때

        // 혼합 카테고리를 선택된 스타일로 변경하고
        fastMenu.className = '';
        slowMenu.className = '';
        bothMenu.className = 'menu_selected3';

        // 혼합 마커들만 지도에 표시하도록 설정합니다
        setfastMarkers(null);
        setslowMarkers(null);
        setbothMarkers(map);
    }

}

function wheelEvent() {
    var level = map.getLevel();
    if (level > 11) {
        setfastMarkers(null);
        setslowMarkers(null);
        setbothMarkers(null);
        if (NowInfowindow.length > 0) {
            for (i = 0; i < NowInfowindow.length; i++) {
                NowInfowindow[i].close();
            }
        }
    }
    else {
        changeMarker(Selectinfo);
    }
}

function changeCityXY(e) {
    if (e.value != "고성군") {
        Sigunguinfo.forEach((element) => {
            if (e.value == element[0].name) {
                var moveLatLon = new kakao.maps.LatLng(element[0].lat, element[0].lon);
                map.setCenter(moveLatLon);
            }
        })
    }
    else {
        var a = document.getElementById("region")
        if (a.value == "a") {
            var moveLatLon = new kakao.maps.LatLng(38.38129972, 128.4680465);
            map.setCenter(moveLatLon);
            return;
        }
        else {
            var moveLatLon = new kakao.maps.LatLng(34.97329535, 128.3219769);
            map.setCenter(moveLatLon);
            return;
        }

    }

}

function changeCityXY2(e) {
    Sigunguinfo.forEach((element) => {
        if (e.value == element[0].name) {
            var moveLatLon = new kakao.maps.LatLng(element[0].lat, element[0].lon);
            map.setCenter(moveLatLon);
        }
    })


}

function readSigungu(error, data) {
    //sorting
    if (error) throw error;

    data.forEach((element) => {
        Sigunguinfo.push([
            {
                name: element.Name,
                lon: element.lon,
                lat: element.lat,
            },
        ]);
    });
}

function CheckChange(e) {

    var a = document.getElementById("name2");
    SelectCar = NumToEvCar(a.value);

    if (e.checked == true) {
        ischeck = true;
    }
    else {
        ischeck = false;
    }

    changeMarker(Selectinfo);
}

function ChangeBarSelect(e) {
    if (ischeck) {
        SelectCar = e;
        changeMarker(Selectinfo);
    }
}

function ChangeLowFast(e) {
    if (e.id == "ev_low") {
        changeMarker('slow');
    }
    else if (e.id == "ev_fast") {
        changeMarker('fast');
    }
}