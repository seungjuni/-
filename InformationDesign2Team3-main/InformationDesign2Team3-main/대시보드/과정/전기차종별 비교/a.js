var data1 = [
  { x: "최고속도", value: 12.7533783783784 },
  { x: "주행거리", value: 17.6812396236857 },
  { x: "연비", value: 16.25 },
  { x: "가격", value: 13.5879667756888 },
];

var data2 = [
  { x: "최고속도", value: 12.3310810810811 },
  { x: "주행거리", value: 8.78527946873271 },
  { x: "연비", value: 25 },
  { x: "가격", value: 17.6468858090779 },
];

var data3 = [
  { x: "최고속도", value: 16.5540540540541 },
  { x: "주행거리", value: 17.6397343663531 },
  { x: "연비", value: 7.50000000000001 },
  { x: "가격", value: 9.08786089084449 },
];

var data4 = [
  { x: "최고속도", value: 12.7533783783784 },
  { x: "주행거리", value: 16.2562257885999 },
  { x: "연비", value: 12.5 },
  { x: "가격", value: 13.0585425539424 },
];

var data5 = [
  { x: "최고속도", value: 12.7533783783784 },
  { x: "주행거리", value: 16.4637520752629 },
  { x: "연비", value: 11.25 },
  { x: "가격", value: 16.5468599261159 },
];

var data6 = [
  { x: "최고속도", value: 7.05236486486487 },
  { x: "주행거리", value: 10.9988931931378 },
  { x: "연비", value: 6.25 },
  { x: "가격", value: 17.6762982658415 },
];

var data7 = [
  { x: "최고속도", value: 9.16385135135135 },
  { x: "주행거리", value: 6.77919203099059 },
  { x: "연비", value: 16.25 },
  { x: "가격", value: 5.88190310360244 },
];

var data8 = [
  { x: "최고속도", value: 8.10810810810811 },
  { x: "주행거리", value: 18.262313226342 },
  { x: "연비", value: 13.75 },
  { x: "가격", value: 14.1585684369044 },
];

var data9 = [
  { x: "최고속도", value: 25 },
  { x: "주행거리", value: 13.9734366353071 },
  { x: "연비", value: 22.5 },
  { x: "가격", value: 8.94668109837879 },
];

var data10 = [
  { x: "최고속도", value: 23.3108108108108 },
  { x: "주행거리", value: 25 },
  { x: "연비", value: 13.75 },
  { x: "가격", value: 0 },
];

var data11 = [
  { x: "최고속도", value: 9.16385135135135 },
  { x: "주행거리", value: 6.50249031543996 },
  { x: "연비", value: 1.25000000000001 },
  { x: "가격", value: 16.8233370196946 },
];

var data12 = [
  { x: "최고속도", value: 9.16385135135135 },
  { x: "주행거리", value: 6.01826231322634 },
  { x: "연비", value: 0 },
  { x: "가격", value: 21.90580954846 },
];

var data13 = [
  { x: "최고속도", value: 9.16385135135135 },
  { x: "주행거리", value: 6.01826231322634 },
  { x: "연비", value: 0 },
  { x: "가격", value: 11.0408480199534 },
];

var data14 = [
  { x: "최고속도", value: 0 },
  { x: "주행거리", value: 0 },
  { x: "연비", value: 18.75 },
  { x: "가격", value: 25 },
];

// anychart.onDocumentReady(function () {

//   // // our data from bulbapedia
//   // // create radar chart
//   // var chart = anychart.radar();

//   // // set chart yScale settings
//   // chart.yScale()
//   //   .minimum(0)
//   //   .maximum(25)
//   //   .ticks({'interval':5});

//   // // color alternating cells
//   // chart.yGrid().palette(["gray 0.1", "gray 0.2"]);

//   // // create first series
//   // chart.area(data1).name('코나(기본형, PTC, 모던)').markers(true).fill("#E55934", 0.3).stroke("#E55934") 
//   // // create second series
//   // chart.area(data2).name('아이오닉(HP)').markers(true).fill("#9BC53D", 0.3).stroke("#9BC53D")
//   // // create third series
//   // chart.area(data3).name('아이오닉5').markers(true).fill("#5BC0EB", 0.3).stroke("#5BC0EB")//(롱레인지 RWD, 2WD 프레스티지)

//   // chart.area(data4).name('니로EV').markers(true).fill("#FFC312", 0.3).stroke("#FFC312") //(HP, 프레스티지)

//   // chart.area(data5).name('쏘울').markers(true).fill("#FDA7DF", 0.3).stroke("#FDA7DF") //(기본형, 프레스티지)

//   // chart.area(data6).name('ZOE ZEN').markers(true).fill("#6F1E51", 0.3).stroke("#6F1E51")

//   // chart.area(data7).name('i3 120Ah Lux').markers(true).fill("#1e272e", 0.3).stroke("#1e272e")

//   // chart.area(data8).name('BOLT EV LT').markers(true).fill("#00d8d6", 0.3).stroke("#00d8d6")

//   // chart.area(data9).name('Model 3(SRP RWD)').markers(true).fill("#fad390", 0.3).stroke("#fad390")

//   // chart.area(data10).name('Model Y(Long Range)').markers(true).fill("#0be881", 0.3).stroke("#0be881")

//   // chart.area(data11).name('Peugeot e-208 Allure').markers(true).fill("#EA2027", 0.3).stroke("#EA2027")

//   // chart.area(data12).name('Peugeot e-2008 SUV Allure').markers(true).fill("#9980FA", 0.3).stroke("#9980FA")

//   // chart.area(data13).name('DS3 E-tense So Chic').markers(true).fill("#009432", 0.3).stroke("#009432")

//   // chart.area(data14).name('SMART EV Z').markers(true).fill("#6a89cc", 0.3).stroke("#6a89cc")


//   // // set chart title
//   // chart.title("전기차종별 레이더차트")
//   // // set legend
//   // .legend(true);

//   // // set container id for the chart
//   // chart.container('container');
//   // // initiate chart drawing
//   // chart.draw();

// });

var SelectData = [];

function handleOnChange(e) {

  // 파라미터 데이터 저장하기 위한 변수
  const value = e.value;

  if (value != "none") {

    //리스트에 데이터를 넣어서 누적방식으로 하기
    SelectData.push(value);
    MakeChart();
  }

}

//전부 삭제
function DeleteAll(e) {
  SelectData = [];
  MakeChart();
}
//부분 삭제
function DeleteSelect(e)
{
  const ComboData = document.getElementById('select_box');
  SelectData = SelectData.filter((element) => element !== ComboData.value);
  MakeChart();
}
//차트 만드는 함수
function MakeChart() {

  //기존 div 태그 삭제하고 다시 만들기 (차트 초기화)
  const Olddiv = document.getElementById("container");
  Olddiv.remove();

  const NewDiv = document.createElement('div');
  NewDiv.setAttribute("id", "container");
  document.body.appendChild(NewDiv);

  // create radar chart
  var chart = anychart.radar();

  // set chart yScale settings
  chart.yScale()
    .minimum(0)
    .maximum(25)
    .ticks({ 'interval': 5 });

  // color alternating cells
  chart.yGrid().palette(["gray 0.1", "gray 0.2"]);

  var chart = anychart.radar();

  // set chart yScale settings
  chart.yScale()
    .minimum(0)
    .maximum(25)
    .ticks({ 'interval': 5 });

  // color alternating cells
  chart.yGrid().palette(["gray 0.1", "gray 0.2"]);

  if (SelectData.includes("코나")) {
    chart.area(data1).name('코나(기본형, PTC, 모던)').markers(true).fill("#E55934", 0.3).stroke("#E55934")
  }
  if (SelectData.includes("아이오닉(HP)")) {
    chart.area(data2).name('아이오닉(HP)').markers(true).fill("#9BC53D", 0.3).stroke("#9BC53D")
  }
  if (SelectData.includes("아이오닉5")) {
    chart.area(data3).name('아이오닉5').markers(true).fill("#5BC0EB", 0.3).stroke("#5BC0EB")//(롱레인지 RWD, 2WD 프레스티지)
  }
  if (SelectData.includes("니로")) {
    chart.area(data4).name('니로EV').markers(true).fill("#FFC312", 0.3).stroke("#FFC312") //(HP, 프레스티지)
  }
  if (SelectData.includes("쏘울")) {
    chart.area(data5).name('쏘울').markers(true).fill("#FDA7DF", 0.3).stroke("#FDA7DF") //(기본형, 프레스티지)
  }
  if (SelectData.includes("ZOE")) {
    chart.area(data6).name('ZOE ZEN').markers(true).fill("#6F1E51", 0.3).stroke("#6F1E51")
  }
  if (SelectData.includes("i3")) {
    chart.area(data7).name('i3 120Ah Lux').markers(true).fill("#1e272e", 0.3).stroke("#1e272e")
  }
  if (SelectData.includes("Bolt")) {
    chart.area(data8).name('BOLT EV LT').markers(true).fill("#00d8d6", 0.3).stroke("#00d8d6")
  }
  if (SelectData.includes("Model3")) {
    chart.area(data9).name('Model 3(SRP RWD)').markers(true).fill("#fad390", 0.3).stroke("#fad390")
  }
  if (SelectData.includes("Modely")) {
    chart.area(data10).name('Model Y(Long Range)').markers(true).fill("#0be881", 0.3).stroke("#0be881")
  }
  if (SelectData.includes("208")) {
    chart.area(data11).name('Peugeot e-208 Allure').markers(true).fill("#EA2027", 0.3).stroke("#EA2027")
  }
  if (SelectData.includes("2008")) {
    chart.area(data12).name('Peugeot e-2008 SUV Allure').markers(true).fill("#9980FA", 0.3).stroke("#9980FA")
  }
  if (SelectData.includes("DS3")) {
    chart.area(data3).name('DS3 E-tense So Chic').markers(true).fill("#5BC0EB", 0.3).stroke("#5BC0EB")//(롱레인지 RWD, 2WD 프레스티지)
  }
  if (SelectData.includes("SMART")) {
    chart.area(data13).name('SMART EV Z').markers(true).fill("#009432", 0.3).stroke("#009432")
  }

  chart.title("전기차종별 레이더차트");
    // set legend
  chart.legend(true);

  // set container id for the chart
  chart.container('container');
  // initiate chart drawing
  chart.draw();
}