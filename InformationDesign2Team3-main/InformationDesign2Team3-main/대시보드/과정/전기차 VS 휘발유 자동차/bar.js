var selectValue = 0; //자동차 인덱스 전역변수
var selectText = "코나"; //자동차 모델명 전역변수
var km = 100000;
var value;
var radio = "ev_low";
var Ice_fuel=14.5;
var low_1kwh = 71.3;
var fast_1kwh = 255.7;
var ice_1L = 1534.8;
MEv = [];
MIce = [];

bar();

d3.json("ControlGroup_ice.json", function(error,data){
  if (error) throw error;

  data.forEach(function(d){
      MIce.push([d.차종별,d.차급,d.가격,d.연비]);
  });
});
d3.json("Compared_ev.json", function(error,data){
  if (error) throw error;

  data.forEach(function(d){
    MEv.push([d.차종별,d.차급,d.가격,d.연비]);
  });
  
});
console.log(MIce);
console.log(MEv);



//----- 전기차 vs 휘발유차 ----
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d"); // 캔버스 객체 생성

var rectX = 30;
var rectY = 30;
var rectWidth = 10;
var rectHeight = 40;
var cornerRadius = 10;

// Set faux rounded corners
ctx.lineJoin = "round";
ctx.lineWidth = cornerRadius;

ctx.beginPath();
// 색 설정
ctx.strokeStyle = '#A9C9F7'; // 선 색
ctx.fillStyle = '#333333'; // 채운 사각형 색

// 그리기
ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
ctx.font = '30px Arial';
ctx.fillText('전기차 vs 휘발유 자동차', rectX+15, rectY+30);
ctx.font = '15px Arial';
ctx.fillText('연료값', rectX+15, rectY+75);
ctx.fillText('완속 : 1kWh', rectX+15, rectY+110);
ctx.fillText('급속 : 1kWh', rectX+15, rectY+140);


//---- 막대 그래프 ----
// 상하좌우 여백 수치. 하단에는 축이 그려져야 하니까 여백을 많이.
var LEFT = 80;
var RIGHT = 20;
var TOP = 00;
var BOTTOM = 30;

// 데이터가 그려질 영역의 크기
var width =800 - LEFT - RIGHT;
var height = 200 - TOP - BOTTOM;

// body 요소 밑에 svg 요소를 추가하고 그 결과를 svg 변수에 저장
var body = d3.select("body");
var svg1 = body.append("svg");

// svg 요소의 너비와 높이가 화면을 꽉 채우도록 수정
svg1.attr("width", window.innerWidth);
svg1.attr("height", window.innerHeight);

// svg 요소에 g 요소를 추가하고 axisGroup 변수에 저장
var axisGroup = svg1.append("g");
// axisGroup에 "axis" 클래스를 부여하고 하단으로 이동
axisGroup
  .attr("class", "axis")
  .style("transform", "translate(" + LEFT + "px, " + (TOP + height) + "px)");

// svg 요소에 g 요소를 추가하고 barGroup 변수에 저장
var barGroup = svg1.append("g");
// barGroup에 "bar" 클래스를 부여하고 좌상단 여백만큼 이동
barGroup
  .attr("class", "bar")
  .style("transform", "translate(" + LEFT + "px, " + TOP + "px)");

//if(now - lastUpdate < 2000) return;

function chageLangSelect() {
  var langSelect = document.getElementById("name");
  // select element에서 선택된 option의 value가 저장된다.
  selectValue = langSelect.options[langSelect.selectedIndex].value;
  // select element에서 선택된 option의 text가 저장된다.
  selectText = langSelect.options[langSelect.selectedIndex].text;
  console.log(selectText, selectValue);
  bar();
}

// 슬라이더 실행 함수
var slider = d3.select("#km");
slider.on("change", function () {
  km = this.value;
  bar();
});

// 라디오 버튼 실행 함수
function changeLine(event) {
  if (event.target.id == "ev_low") {
    document.getElementById("ev_low").checked = true;
    document.getElementById("ev_fast").checked = false;
    radio = "ev_low";
    bar();
  } else if (event.target.id == "ev_fast") {
    document.getElementById("ev_low").checked = false;
    document.getElementById("ev_fast").checked = true;
    radio = "ev_fast";
    bar();
  }
}

//막대그래프 실행 함수
function bar() {
  d3.csv("EC.csv", function (error, data) {
    var dataset = [];
    if (radio == "ev_low") {
      dataset.push((km / data[selectValue].Fueleconomy) * low_1kwh);
      dataset.push((km / Ice_fuel) * ice_1L);
      dataset.push(
        (km / Ice_fuel) * ice_1L - (km / data[selectValue].Fueleconomy) * low_1kwh
      );
    } else if (radio == "ev_fast") {
      dataset.push((km / data[selectValue].Fueleconomy) * fast_1kwh);
      dataset.push((km / Ice_fuel) * ice_1L);
      dataset.push(
        (km / Ice_fuel) * ice_1L - (km / data[selectValue].Fueleconomy) *fast_1kwh
      );
    }
    
    for(j=0; j<MIce.length; j++){
      if(MEv[selectValue][1]===MIce[j][1])
        Ice_fuel=MIce[j][3];
    }
    
   

    // X축 스케일 정의하기
    var xScale = d3.scaleLinear();
    xScale.domain([0, 25000000]).range([0, width]);

    // Y축 스케일 정의하기
    var yScale = d3.scaleBand();
    yScale
      .domain(d3.range(dataset.length))
      .padding(0.1)
      .rangeRound([0, height]);

    // X축 그리기
    var xAxis = d3.axisBottom();
    xAxis.scale(xScale);
    axisGroup.call(xAxis);

    // 막대 그리기
    var barUpdate = barGroup.selectAll("rect").data(dataset);
    barUpdate
      .style("fill", function (d, i) {
        if (i === 1) {
          return "#CFCFCF";
        } else if (i === 2) {
          return "#B0E0BF";
        } else {
          if (radio == "ev_fast") {
            return "#F4A8A8";
          }
        }
      })
      .attr("y", function (d, i) {
        return yScale(i);
      })
      .transition()
      .duration(150)
      .attr("width", function (d, i) {
        return xScale(d);
      })
      .attr("height", yScale.bandwidth())
      .attr("y", function (d, i) {
        return yScale(i);
      });

    var barEnter = barUpdate.enter();
    barEnter.append("rect");

    // text 그리기
    var bartext = svg1.selectAll(".myLabels").data(dataset);
    bartext
      .enter()
      .append("text")
      .attr("class", "myLabels")
      .attr("x", function (d, i) {
        return 90;
      })
      .attr("y", function (d, i) {
        return yScale(i) + 30;
      });
    bartext
      .transition()
      .duration(150)
      .attr("x", function (d, i) {
        return xScale(d) + 90;
      })
      .attr("y", function (d, i) {
        return yScale(i) + 30;
      })
      .text(function (d) {
        return (
          Math.floor(d)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원"
        );
      });

    var lable = svg1.selectAll(".Label").data(dataset);
    lable.enter().append("text").attr("class", "Label");
    lable
      .transition()
      .duration(0)
      .attr("x", 70)
      .attr("y", function (d, i) {
        return yScale(i) + 30;
      })
      .text(function (d, i) {
        if (radio == "ev_low") {
          return ["완속", "휘발유", "절감"][i];
        } else if (radio == "ev_fast") {
          return ["급속", "휘발유", "절감"][i];
        }
      })
      .attr("text-anchor", "end")
      .attr("font-size", "18px");
  });
}

