CarValue = 0; //자동차 인덱스 전역변수
CarText = "코나"; //자동차 모델명 전역변수
ConditionValue = 1;
ConditionText = "가격";
CityText = "";
RegionText = "";

EV = [];
Subsidy = [];
num_back = [];
// set the dimensions and margins of the graph
(car_margin = { top: 10, right: 0, bottom: 40, left: 160 }),
  (car_width = 325),
  (car_height = 640);

  let tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "carscss")
    .attr("class", "toolTip")
    .style("display", "none")
    .style("position", "absolute")
    .style("border", "solid")
    .style("border-radius", "4px 4px 4px 4px")
    .style("text-align", "center")
    .style("padding", "5px")
    .style("font-size", "15px")
    .style("background-color", "rgb(253, 253, 253)");


Chart = function (data) {
  this.chart = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", car_width + car_margin.left + car_margin.right)
    .attr("height", car_height + car_margin.top + car_margin.bottom)
    .attr("left", "50px")
    .append("g")
    .attr("transform", "translate(" + car_margin.left + "," + car_margin.top + ")");
    
    d3
    .select("#my_dataviz")
    .append("text")
    .text("차종별")
    .attr("x", 0 - car_height / 2 - 20)
    .attr("y", 0)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("font-size","15px");
    
    if(ConditionText==="가격"||ConditionText==="보조금"){
    d3
    .select("#my_dataviz")
    .append("text")
    .text(ConditionText)
    .attr("x", car_width / 2 + 130)
    .attr("y", car_height + car_margin.bottom +45)
    .style("text-anchor", "middle")
    .attr("font-size","15px");

    }else{
    
    d3
    .select("#my_dataviz")
    .append("text")
    .text(ConditionText)
    .attr("x", car_width / 2 + 130)
    .attr("y", car_height + car_margin.bottom +30)
    .style("text-anchor", "middle")
    .attr("font-size","15px");
    }


  this.data = data;
  this.avg = this.avg();
  this.xScale = this.axis()[0];
  this.yScale = this.axis()[1];



};
Chart.prototype = Object.create(Chart.prototype);
Chart.prototype.axis = function () {
  //x axis 조절
  let xScale = d3
    .scaleLinear()
    .domain([0, this.data[0].value])
    .range([0, car_width]);

  // Y axis 조절
  let yScale = d3
    .scaleBand()
    .range([0, car_height])
    .domain(
      this.data.map(function (d) {
        return d.key;
      })
    )
    .padding(0.3);

  return [xScale, yScale];
};

Chart.prototype.line = function () {
  let xScale = this.xScale;
  let yScale = this.yScale;

  this.chart
    .append("g")
    .attr("transform", "translate(0," + car_height + ")")
    .attr("class", "grid")

    .call(d3.axisBottom(xScale).ticks(5).tickSize(-car_height))

    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  this.chart.append("g").call(d3.axisLeft(yScale)).attr("class", "y_axis");

  const barGroups = this.chart.selectAll().data(this.data).enter().append("g");


  barGroups
    .append("rect")
    .attr("class", "carscss")
    .attr("class", "bar")
    .attr("x", xScale(0))
    .attr("y", function (d) {
      return yScale(d.key);
    })
    .transition()
    .duration(500)
    .attr("width", function (d) {
      return xScale(d.value);
    })
    .attr("height", yScale.bandwidth());

  update_color();

  if (ConditionText != "승차인원") {
    barGroups
      .append("line")
      .attr("stroke", "black")
      .attr("x1", xScale(this.avg))
      .attr("x2", xScale(this.avg))
      .attr("y1", 0)
      .attr("y2", car_height)
      .attr("stroke", "#808080");
  }

  return barGroups;
};

Chart.prototype.avg = function () {
  let sum = 0;
  this.data.forEach(function (data) {
    sum += data.value;
  });

  let avg = sum / this.data.length;
  return avg;
};

function test(num) {
  let d = [];
  EV.forEach(function (value) {
    d.push({ key: value[0].name, value: value[0][Object.keys(value[0])[num]] });
  });
  d.sort(function (b, a) {
    return a.value - b.value;
  });
  return d;
}


//차량 선택에 따른 value 값 및 text 저장 함수
function changeLangSelect() {
  let CarSelect = document.getElementById("name2");
  CarValue = CarSelect.options[CarSelect.selectedIndex].value;
  CarText = CarSelect.options[CarSelect.selectedIndex].text;
  tooltip.style.visibility = "hidden";
  setValue();
  update_color();
}

//내가 선택한 차종 색 변경
function update_color() {
  d3.selectAll(".carscss .bar").style("fill", function (d, i) {
    if (d.key === CarText) {
      if (document.getElementById("ev_low").checked) return '#A9C9F7';
      else if (document.getElementById("ev_fast").checked) return '#F4A8A8';
    }
  });
}
//조건 선택에 따른 value 값 및 text 저장 함수
function changeConditionSelect() {
  let ConditionSelect = document.getElementById("condition");
  // // select element에서 선택된 option의 value가 저장된다.
  ConditionValue = ConditionSelect.options[ConditionSelect.selectedIndex].value;
  // select element에서 선택된 option의 text가 저장된다.
  ConditionText = ConditionSelect.options[ConditionSelect.selectedIndex].text;

  if (ConditionText === "보조금") {
    document.all.region.style.visibility = "visible";
    document.all.city.style.visibility = "visible";

    $("#my_dataviz").empty();
  } else {
    document.all.region.style.visibility = "hidden";
    document.all.city.style.visibility = "hidden";

    $("#my_dataviz").empty();

    drawChart(ConditionValue);
  }
}

//city 값을 저장하는 함수
function changeCitySelect() {
  let RegionSelect = document.getElementById("region");
  // select element에서 선택된 option의 text가 저장된다.
  RegionText = RegionSelect.options[RegionSelect.selectedIndex].text;
  let CitySelect = document.getElementById("city");
  // select element에서 선택된 option의 text가 저장된다.
  CityText = CitySelect.options[CitySelect.selectedIndex].text;
  
  var num = [];
  Subsidy.forEach(function (value) {

    if (CityText == value[0].city && RegionText == value[0].region) {
     
      num.push({ key: value[0].car, value: value[0].cost });
    }
  });
  num.sort(function (b, a) {
    return a.value - b.value;
  });



  $("#my_dataviz").empty();

  drawChart(num);


  num_back = num;

  for (i = 0; i < num.length; i++) {
    if (num[i].key == CarText) {
      var a = num[i].value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 원";
      $("#Car_Subsidy").text(a);
      $("#Car_Place").text(RegionText + " " + CityText);      
    }
  }
}

function categoryChange(e) {
  let city_a = [
    "세부지역",
    "강릉시",
    "고성군",
    "동해시",
    "삼척시",
    "속초시",
    "양구군",
    "양양군",
    "영월군",
    "원주시",
    "인제군",
    "정선군",
    "철원군",
    "춘천시",
    "태백시",
    "평창군",
    "홍천군",
    "화천군",
    "횡성군",
  ];
  let city_b = [
    "세부지역",
    "가평군",
    "고양시",
    "과천시",
    "광명시",
    "광주시",
    "구리시",
    "군포시",
    "김포시",
    "남양주시",
    "동두천시",
    "부천시",
    "성남시",
    "수원시",
    "시흥시",
    "안산시",
    "안성시",
    "안양시",
    "양주시",
    "양평군",
    "여주시",
    "연천군",
    "오산시",
    "용인시",
    "의왕시",
    "의정부시",
    "이천시",
    "파주시",
    "평택시",
    "포천시",
    "하남시",
    "화성시",
  ];
  let city_c = [
    "세부지역",
    "거제시",
    "거창군",
    "고성군",
    "김해시",
    "남해군",
    "밀양시",
    "사천시",
    "산청군",
    "양산시",
    "의령군",
    "진주시",
    "창녕군",
    "창원시",
    "통영시",
    "하동군",
    "함안군",
    "함양군",
    "합천군",
  ];
  let city_d = [
    "세부지역",
    "경산시",
    "경주시",
    "고령군",
    "구미시",
    "김천시",
    "문경시",
    "봉화군",
    "상주시",
    "성주군",
    "안동시",
    "영덕군",
    "영양군",
    "영주시",
    "영천시",
    "예천군",
    "울릉군",
    "울진군",
    "청도군",
    "청송군",
    "칠곡군",
    "포항시",
  ];
  let city_e = ["세부지역", "광주광역시"];
  let city_f = ["세부지역", "대구광역시"];
  let city_g = ["세부지역", "대전광역시"];
  let city_h = ["세부지역", "부산광역시"];
  let city_i = ["세부지역", "서울특별시"];
  let city_j = ["세부지역", "세종특벽시"];
  let city_k = ["세부지역", "울산광역시"];
  let city_l = ["세부지역", "인천광역시"];
  let city_m = [
    "세부지역",
    "강진군",
    "고흥군",
    "곡성군",
    "광양시",
    "구례군",
    "나주시",
    "담양군",
    "목포시",
    "무안군",
    "보성군",
    "순천시",
    "신안군",
    "여수시",
    "영광군",
    "영암군",
    "완도군",
    "장성군",
    "장흥군",
    "진도군",
    "함평군",
    "해남군",
    "화순군",
  ];
  let city_n = [
    "세부지역",
    "고창군",
    "군산시",
    "김제시",
    "남원시",
    "무주군",
    "부안군",
    "순창군",
    "완주군",
    "익산시",
    "임실군",
    "장수군",
    "전주시",
    "정읍시",
    "진안군",
  ];
  let city_o = ["세부지역", "제주특별시"];
  let city_p = [
    "세부지역",
    "계룡시",
    "공주시",
    "금산군",
    "논산시",
    "당진시",
    "보령시",
    "부여군",
    "서산시",
    "서천군",
    "아산시",
    "예산군",
    "천안시",
    "청양군",
    "태안군",
    "홍성군",
  ];
  let city_q = [
    "세부지역",
    "괴산군",
    "단양군",
    "보은군",
    "영동군",
    "옥천군",
    "음성군",
    "제천시",
    "증평군",
    "진천군",
    "청주시",
    "충주시",
  ];

  var target = document.getElementById("city");

  let d;
  if (e.value == "강원") d = city_a;
  else if (e.value == "경기") d = city_b;
  else if (e.value == "경남") d = city_c;
  else if (e.value == "경북") d = city_d;
  else if (e.value == "광주광역시") d = city_e;
  else if (e.value == "대구") d = city_f;
  else if (e.value == "대전") d = city_g;
  else if (e.value == "부산") d = city_h;
  else if (e.value == "서울") d = city_i;
  else if (e.value == "세종") d = city_j;
  else if (e.value == "울산") d = city_k;
  else if (e.value == "인천") d = city_l;
  else if (e.value == "전남") d = city_m;
  else if (e.value == "전북") d = city_n;
  else if (e.value == "제주") d = city_o;
  else if (e.value == "충남") d = city_p;
  else if (e.value == "충북") d = city_q;
  target.options.length = 0;

  for (x in d) {
    let opt = document.createElement("option");
    opt.value = d[x];
    opt.innerHTML = d[x];
    target.appendChild(opt);
  }
}

d3.json("json/Compared_ev.json", function (error, data) {
  readEV(error, data);
});
d3.json("json/Subsidy2.json", function (error, data) {
  readCost(error, data);
});

function readCost(error, data) {
  if (error) throw error;

  data.Subsidy.forEach((element) => {
    Subsidy.push([
      {
        region: element.시도,
        city: element.지역구분,
        car: element.차종별,
        cost: element.보조금,
      },
    ]);
  });

  //filter로 지역에 해당하는 값만 추출
  let result = Subsidy.filter((x) => {
    return x.지역구분 === CityText;
  });

}

function readEV(error, data) {
  //sorting
  if (error) throw error;

  data.forEach((element) => {
    EV.push([
      {
        name: element.차종별,
        price: element.가격,
        speed: element.최고속도,
        mileage: element.주행거리,
        fuel: element.연비,
        passenger: element.승차인원,
        grade: element.차급,
        score: element.점수
      },
    ]);
  });

  drawChart(ConditionValue);
}

function drawChart(value) {
  if (ConditionText === "보조금") {
    testV = new Chart(value);
  } else {
    testV = new Chart(test(value));
  }
  bargraph = testV.line();



  let Unit;
  //단위 만들기
  if (ConditionText === "가격") {
    Unit = " 원";
  } else if (ConditionText === "최고속도" || ConditionText === "주행거리") {
    Unit = " Km";
  } else if (ConditionText === "연비") {
    Unit = " kWh/km";
  } else if (ConditionText === "승차인원") {
    Unit = " 명";
  } else Unit = " 원";

  bargraph
    .on("mouseover", function () {
      tooltip.style("display", null);
    })
    .on("mouseout", function () {
      tooltip.style("display", "none");
    })
    .on("mousemove", function (d) {
      tooltip.style("left", d3.event.pageX + 10 + "px");
      tooltip.style("top", d3.event.pageY - 10 + "px");
      tooltip.text(String(d.value).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + Unit);
    })
    .on("click", function (point, event) {
      
      if (event.length <= 0) return;
      CarText = point.key;
      
      let CarSelect = document.getElementById("name2");
      for(let i=0; i<14;i++){
    
      if(CarSelect.options[i].text===CarText) CarValue = i;
      
      }
      $("#name2").val(CarValue).prop("selected", true);
      callfromCarsjs(CarText);
      setValue();
      update_color();
      ChangeBarSelect(CarText);
      evSelect(CarText);
      chagebar(CarText);
    });
}

function setValue() {
  EV.forEach((element) => {

    if (element[0].name == CarText) {

      var a = element[0].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 원";

      $("#Car_People").text(element[0].passenger + " 인승");
      $("#Car_MaxSpeed").text(element[0].speed + " km");
      $("#Car_MaxKM").text(element[0].mileage + " km");
      $("#Car_Efficiency").text(element[0].fuel + " km/kWh");
      $("#Car_Price").text(a);
      $("#Car_score").text(element[0].score);
    }

  });

  for (i = 0; i < num_back.length; i++) {
    if (num_back[i].key == CarText) {
      var a = num_back[i].value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 원";
      $("#Car_Subsidy").text(a);
      $("#Car_Place").text(RegionText + " " + CityText);      
    }
  }

}