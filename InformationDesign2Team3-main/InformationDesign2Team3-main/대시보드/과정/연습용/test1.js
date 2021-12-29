CarValue=0 //자동차 인덱스 전역변수
CarText="코나" //자동차 모델명 전역변수
ConditionValue=1
ConditionText="가격"
CityText=""
RegionText=""

EV = []
Subsidy =[]
// set the dimensions and margins of the graph
margin = {top: 40, right: 20, bottom: 40, left: 140},
width = 460 - margin.left - margin.right,
height = 550 - margin.top - margin.bottom;

// selectValue = ev_select.options[ev_select.selectedIndex].value;


Chart = function(data){
    this.chart = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
        
    this.data = data
    this.avg = this.avg()
    this.xScale = this.axis()[0]
    this.yScale = this.axis()[1]

    
 
}
Chart.prototype = Object.create(Chart.prototype);
Chart.prototype.axis = function(){
    
    //x axis 조절
    let xScale = d3.scaleLinear()
    .domain([0,this.data[0].value])
    .range([ 0, width]);
    
   

    // Y axis 조절
    let yScale = d3.scaleBand()
    .range([ 0, height ])
    .domain(this.data.map(function(d) { return d.key; }))
    .padding(.3);

    
    
    //  console.log(this.xScale)
    return[xScale,yScale]
}

Chart.prototype.line = function(){
    
    let xScale = this.xScale;
    let yScale = this.yScale;

    this.chart.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "grid")

    .call(d3.axisBottom(xScale).ticks(5).tickSize(-height))

    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    

    this.chart.append("g")
    .call(d3.axisLeft(yScale))
    
    const barGroups = this.chart.selectAll()
    .data(this.data)
    .enter()
    .append('g')

    console.log(yScale)
    // chart.selectAll("myRect")
    barGroups
        .append("rect")
        .attr("class", "bar")
        .attr("x", xScale(0) )
        .attr("y", function(d) { return yScale(d.key); })     
        // .transition()
        // .duration(2000)
        .attr("width", function(d) { return xScale(d.value); })
        .attr("height", yScale.bandwidth() )
         
       
    update_color();
    
    if(ConditionText!="승차인원"){
        
        barGroups.append('line').attr('stroke', 'black')
        .attr('x1', xScale(this.avg))
        .attr('x2', xScale(this.avg))
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke','red');
    }
    

    return barGroups
}

Chart.prototype.avg = function(){
    let sum = 0
    this.data.forEach(function(data){
        sum+=data.value
    })
    
    let avg=sum/this.data.length
    console.log(avg)
    return avg
   
}


function test(num){
    let d = []
    EV.forEach(function(value){
        d.push({key : value[0].name, value : value[0][Object.keys(value[0])[num]]})
       
    })
    d.sort(function(b, a) {
             return a.value - b.value;
           });
    return d
}  


// //처음화면에 가격 부터 띄워줌
// Make_Ev_Compared_Chart();

//차량 선택에 따른 value 값 및 text 저장 함수
function changeLangSelect(){ 
    let CarSelect = document.getElementById("name"); 
    // select element에서 선택된 option의 value가 저장된다. 
    CarValue = CarSelect.options[CarSelect.selectedIndex].value; 
    // select element에서 선택된 option의 text가 저장된다. 
    CarText = CarSelect.options[CarSelect.selectedIndex].text; 
     console.log(CarValue,CarText);
     update_color();
}

//내가 선택한 차종 색 변경
function update_color(){
    d3.selectAll(".bar")
    .style("fill",function(d,i){
        if(d.key===CarText){
            return "orange";
        }
       
    })  
}
//조건 선택에 따른 value 값 및 text 저장 함수
function changeConditionSelect(){ 
    let ConditionSelect = document.getElementById("condition"); 
    // // select element에서 선택된 option의 value가 저장된다. 
     ConditionValue = ConditionSelect.options[ConditionSelect.selectedIndex].value;
    // select element에서 선택된 option의 text가 저장된다. 
     ConditionText = ConditionSelect.options[ConditionSelect.selectedIndex].text;
     
     if(ConditionText==="보조금"){
        document.all.region.style.visibility="visible";
        document.all.city.style.visibility="visible";
        
        //div 삭제 후 다시 만들어주면서 그래프 갱신
        const Olddiv = document.getElementById("my_dataviz");
        Olddiv.remove();
        const NewDiv = document.createElement('div');
        NewDiv.setAttribute("id", "my_dataviz");
        document.body.appendChild(NewDiv);
       
     }else{
        document.all.region.style.visibility="hidden";
        document.all.city.style.visibility="hidden";
        // //div 삭제 후 다시 만들어주면서 그래프 갱신
        const Olddiv = document.getElementById("my_dataviz");
        Olddiv.remove();
        const NewDiv = document.createElement('div');
        NewDiv.setAttribute("id", "my_dataviz");
        document.body.appendChild(NewDiv);
        
        drawChart(ConditionValue);
     }    
}

// function changeRegionSelect(){ 
    
    
// }
      
//Object.keys(value[0])[1] -> city 다 ~
//city 값을 저장하는 함수
function changeCitySelect(){ 
    
    let RegionSelect = document.getElementById("region"); 
    // select element에서 선택된 option의 text가 저장된다. 
     RegionText = RegionSelect.options[RegionSelect.selectedIndex].text;
    //   if(ConditionText==="보조금") drawChart();
    let CitySelect = document.getElementById("city"); 
    // select element에서 선택된 option의 text가 저장된다. 
     CityText = CitySelect.options[CitySelect.selectedIndex].text;
    //   if(ConditionText==="보조금") 
        // drawChart(); 
    // console.log(Subsidy)
    // console.log(Object.keys(Subsidy.city[0]))

    

    console.log(RegionText)
    var num = [];
    Subsidy.forEach(function(value,index){
        // d.push({key : value[0].name, value : value[0][Object.keys(value[0])[3]]})
        // console.log(Object.keys(value[0])[1]) ** city로 출력
        // console.log(Object.keys(value[0])[1])
        // console.log(value[0].city)
        
        if(CityText == value[0].city && RegionText==value[0].region){
            // console.log(value[0][index]);
            // console.log(value[0].cost)
            num.push({key : value[0].car, value : value[0].cost });
            console.log(value[0])
        }

    }) 
    num.sort(function(b, a) {
                return a.value - b.value;
            });

    console.log(num)
  

        //div 삭제 후 다시 만들어주면서 그래프 갱신
        const Olddiv = document.getElementById("my_dataviz");
        Olddiv.remove();
        const NewDiv = document.createElement('div');
        NewDiv.setAttribute("id", "my_dataviz");
        document.body.appendChild(NewDiv);

        drawChart(num)
    // let d = []
    // Subsidy.forEach(function(value){
    //     d.push({key : value[0].name, value : value[0][Object.keys(value[0])[3]]})
    // })
    // d.sort(function(b, a) {
    //         return a.value - b.value;
    //     });
    // return d
   

}

function categoryChange(e) {
    let city_a = ["세부지역을 선택해주세요","강릉시", "고성군", "동해시", "삼척시","속초시","양구군","양양군","영월군","원주시","인제군","정선군","철원군","춘천시","태백시","평창군","홍천군","화천군","횡성군"];
    let city_b = ["세부지역을 선택해주세요","가평군", "고양시", "과천시", "광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","양평군","여주시","연천군","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시"];
    let city_c = ["세부지역을 선택해주세요","거제시", "거창군", "고성군", "김해시", "남해군","밀양시","사천시","산청군","양산시","의령군","진주시","창녕군","창원시","통영시","하동군","함안군","함양군","합천군"];
    let city_d = ["세부지역을 선택해주세요","경산시", "경주시", "고령군", "구미시", "김천시","문경시","봉화군","상주시","성주군","안동시","영덕군","영양군","영주시","영천시","예천군","울릉군","울진군","청도군","청송군","칠곡군","포항시"];
    let city_e = ["세부지역을 선택해주세요","광주광역시"];
    let city_f = ["세부지역을 선택해주세요","대구광역시"];
    let city_g = ["세부지역을 선택해주세요","대전광역시"];
    let city_h = ["세부지역을 선택해주세요","부산광역시"];
    let city_i = ["세부지역을 선택해주세요","서울특별시"];
    let city_j = ["세부지역을 선택해주세요","세종특벽시"];
    let city_k = ["세부지역을 선택해주세요","울산광역시"];
    let city_l = ["세부지역을 선택해주세요","인천광역시"];
    let city_m = ["세부지역을 선택해주세요","강진군", "고흥군", "곡성군", "광양시", "구례군","나주시","담양군","목포시","무안군","보성군","순천시","신안군","여수시","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"];
    let city_n = ["세부지역을 선택해주세요","고창군", "군산시", "김제시", "남원시", "무주군","부안군","순창군","완주군","익산시","임실군","장수군","전주시","정읍시","진안군"];
    let city_o = ["세부지역을 선택해주세요","제주특별시"];
    let city_p = ["세부지역을 선택해주세요","계룡시", "공주시", "금산군", "논산시", "당진시","보령시","부여군","서산시","서천군","아산시","예산군","천안시","청양군","태안군","홍성군"];
    let city_q = ["세부지역을 선택해주세요","괴산군", "단양군", "보은군", "영동군", "옥천군","음성군","제천시","증평군","진천군","청주시","충주시"];
        
    var target = document.getElementById("city");

    let d;
    if(e.value == "a")  d = city_a;
    else if(e.value == "b")  d = city_b;
    else if(e.value == "c")  d = city_c;
    else if(e.value == "d")  d = city_d;
    else if(e.value == "e")  d = city_e;
    else if(e.value == "f")  d = city_f;
    else if(e.value == "g")  d = city_g;
    else if(e.value == "h")  d = city_h;
    else if(e.value == "i")  d = city_i;
    else if(e.value == "j")  d = city_j;
    else if(e.value == "k")  d = city_k;
    else if(e.value == "l")  d = city_l;
    else if(e.value == "m")  d = city_m;
    else if(e.value == "n")  d = city_n;
    else if(e.value == "o")  d = city_o;
    else if(e.value == "p")  d = city_p;
    else if(e.value == "q")  d = city_q;
    target.options.length = 0;
       
    for (x in d) {
        let opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }    
}
      



  
d3.json("Compared_ev.json",function(error,data){readEV(error,data)});
d3.json("Subsidy2.json",function(error,data){readCost(error,data)});
   

function readCost(error,data){
    if (error) throw error;

    data.Subsidy.forEach((element) => {
        Subsidy.push([
            {
            region: element.시도,
            city: element.지역구분,
            car : element.차종별,
            cost : element.보조금
            },
        ]);
    });

    //filter로 지역에 해당하는 값만 추출
    let result = Subsidy.filter(x=>{
        return x.지역구분===CityText
    });


    console.log(Subsidy)
}


function readEV(error,data){   

    //sorting
    if (error) throw error;
 
    data.cars.forEach((element) => {
        EV.push([
            {
            name: element.차종별,
            price: element.가격,
            speed : element.최고속도,
            mileage : element.주행거리,
            fuel: element.연비,
            passenger: element.승차인원
            },
        ]);
    });

    drawChart(ConditionValue)
    
}

function drawChart(value){

    if(ConditionText === "보조금"){
        testV = new Chart(value);
    }
    else{
        testV = new Chart(test(value));
    }
    bargraph = testV.line();

    let toolTip = d3.select("body").append("div")
        .attr("class", "test1.toolTip")
        .style("display", "none"); 
    
        let Unit;
        //단위 만들어서 합쳐보고 싶었는데...
            if(ConditionText==="가격"){
                Unit =" 원"
            }else if(ConditionText==="최고속도" || ConditionText==="주행거리"){
                Unit=" Km"
            }else if(ConditionText==="연비"){
                Unit=" kWh/km"
            }else if(ConditionText==="승차인원"){
                Unit=" 명"
            }else Unit=" 원"

        bargraph
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout",  function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
            tooltip.style("left", (d3.event.pageX + 10) + "px");
            tooltip.style("top", (d3.event.pageY - 10) + "px");
            tooltip.text(String(d.value)+Unit)
        })
        .on("click",function(point, event) {
            console.log(point);
            if(event.length <= 0) return;
            CarText =point.key
            
            $('#name').val(CarText).prop("selected",true);
            update_color();  
        });



}
