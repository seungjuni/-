Ev = [];
Ice = [];
low_1kwh = 71.3;
fast_1kwh = 255.7;
ice_1L = 1534.8;
var ev_select = document.getElementById("ev_car");
var selectValue = ev_select.options[ev_select.selectedIndex].value;
var selectValue_ice = 1;

// window.onresize = function(event){
//   redraw();
// }
function cost(kilometer,fuel,select,price){
 
  fuel_cost = ( kilometer / fuel) * select;
  if(!fuel_cost.isInteger)
    c = price + Math.round(fuel_cost);
  else
    c = price + fuel_cost;
  
  return c
}

function maxRange(ev_car_data,ice_car_data,select){
  kilometer = 0
  while(true){
    let ev_cost = cost(kilometer,ev_car_data.fuel,select, ev_car_data.price);
    let ice_cost = cost(kilometer,ice_car_data.fuel,ice_1L,ice_car_data.price);

    if(ice_cost > ev_cost){
      return kilometer;
    }
    kilometer+= 20000;
  }

}


//test3
function pickValue(ev_car_data,ice_car_data,select){
  let kilometer = 0
  while(true){
    let ev_cost = cost(kilometer,ev_car_data.fuel,select, ev_car_data.price);
    let ice_cost = cost(kilometer,ice_car_data.fuel,ice_1L,ice_car_data.price);
    if(ice_cost > ev_cost){
      return kilometer;
    }
    kilometer++;
  }
  
}
Cost = function (svg, ev_car_data,ice_car_data, select, color) {
  
  this.svg = svg;
  
  this.select = select;

  this.ev_car_data = ev_car_data;
  this.ice_car_data = ice_car_data;

  this.ev_cost_data = this.cost_of_maintenance(ev_car_data, select);
  this.ice_cost_data = this.cost_of_maintenance(ice_car_data, ice_1L);

  this.color = color;
  
  //xScale,xScale2,xAxis,xAxis2,yScale,yScale2,yAxis
  this.xScale = this.axis()[0];
  this.xScale2 = this.axis()[1];
  this.xAxis = this.axis()[2];
  this.xAxis2 = this.axis()[3];
  this.yScale = this.axis()[4];
  this.yScale2 = this.axis()[5];
  this.yAxis = this.axis()[6];

  this.line = this.returnLine();
  this.line2 = this.returnLine2();
  
  this.pickValue = pickValue(this.ev_car_data,this.ice_car_data,this.select);

};

Cost.prototype = Object.create(Cost.prototype);

Cost.prototype.cost_of_maintenance = function (d, select) {
  let data = [];
  let x = 20000;
  let limit = maxRange(this.ev_car_data,this.ice_car_data,this.select) + 2*x;
  for (let i = 0; i <=  limit / x; i++) {
    c = cost(x * i,d.fuel,select, d.price)

    data.push({ mileage: x * i, cost: c });
  }


  return data;
};

Cost.prototype.axis = function (){
  if (this.ev_cost_data[0].cost > this.ice_cost_data[0].cost)
    domain_min = 0;
  else domain_min = 0;

  if (this.ev_cost_data[this.ev_cost_data.length - 1].cost >this.ice_cost_data[this.ice_cost_data.length - 1].cost)
    domain_max = this.ev_cost_data[this.ev_cost_data.length - 1].cost;
  else domain_max = this.ice_cost_data[this.ice_cost_data.length - 1].cost;

  
  // x축
  let xScale = d3
    .scaleLinear()
    .domain([
      this.ev_cost_data[0].mileage,
      this.ev_cost_data[this.ev_cost_data.length - 1].mileage,
    ])
    .range([0, width]);

  let xScale2 = d3
    .scaleLinear()
    .domain([
      this.ev_cost_data[0].mileage,
      this.ev_cost_data[this.ev_cost_data.length - 1].mileage,
    ])
    .range([0, width]);

  let xAxis = d3.axisBottom(this.xScale).ticks(10).tickSize(-height);
  let xAxis2 = d3.axisBottom(this.xScale2).ticks(10);

  // y축
  let yScale = d3.scaleLinear().domain([domain_min, domain_max]).range([height, 0]);
  let yScale2 = d3.scaleLinear().domain([domain_min, domain_max]).range([height2, 0]);
  let yAxis = d3.axisLeft(this.yScale).tickSize(-width);


  
 
  return[xScale,xScale2,xAxis,xAxis2,yScale,yScale2,yAxis]
}



Cost.prototype.returnLine = function(){
  
  let xScale = this.xScale;
  let yScale = this.yScale;

  line = d3
  .line()
  .x(function (d) {
    return xScale(d.mileage);
  }) // apply the x scale to the x data
  .y(function (d) {
    return yScale(d.cost);
  }); // apply the y scale to the y data

  return line;
}

Cost.prototype.returnLine2 = function(){
  let xScale2 = this.xScale2;
  let yScale2 = this.yScale2;

  line2 = d3
    .line()
    .x(function (d) {
      return xScale2(d.mileage);
    }) // apply the x scale to the x data
    .y(function (d) {
      return yScale2(d.cost);
    }); // apply the y scale to the y data

  return line2;
}

Cost.prototype.draw = function(){
  
  let svg = this.svg;

  svg.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("width", width)
  .attr("height", height)
  .attr("x", 0)
  .attr("y", 0); 


var Line_chart = svg.append("g")
  .attr("class", "focus")
  .attr("transform", "translate( " + margin.left + " ," + margin.top + ")")
  .attr("clip-path", "url(#clip)");

  svg
    .append("text")
    .text("유지비")
    .attr("x", 0 - height / 2 - 20)
    .attr("y", 0)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90)");
  
  svg
    .append("text")
    .text("주행거리")
    .attr("x", width / 2 + 90)
    .attr("y", height + margin.bottom-55)
    .style("text-anchor", "middle");

  let focus = svg
    .append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  let context = svg
    .append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


  let context_x = x + margin2.left;
  let context_y = y + margin2.top;

  let line = this.line;
  let line2 = this.line2;
  

  focus
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(this.xAxis);
  
  focus
    .append("g")
    .attr("class", "axis axis--y")
    .call(this.yAxis);
  
  // Line_chart.append("path")
  //       .datum(data)
  //       .attr("class", "line")
  //       .attr("d", line);

  Line_chart.append("path")
      .datum(this.ev_cost_data)
      .attr("class", "ev_line")
      .attr("d", line)
      .attr("stroke-width", "2px")
      .style("stroke", this.color);


  Line_chart.append("path")
      .datum(this.ice_cost_data)
      .attr("class", "ice_line")
      .attr("d", line)
      .attr("stroke-width", "2px")
      .style("stroke", "lightgray");
  

  // function transition(path) {
  //   path.transition()
  //       .duration(2000)
  //       .attrTween("stroke-dasharray", tweenDash);
  // }
  // function tweenDash() {
  //   var l = this.getTotalLength(),
  //       i = d3.interpolateString("0," + l, l + "," + l);
  //   return function (t) { return i(t); };
  // }
  
  // Line_chart.select("path.ev_line")
  //   .call(transition);
  
  // Line_chart.select("path.ice_line")
  //   .call(transition);


  context.append("path")
      .datum(this.ev_cost_data)
      .attr("class", "ev_line_2")
      .attr("d", line2)
      .style("stroke", this.color);
  
  context.append("path")
      .datum(this.ice_cost_data)
      .attr("class", "ice_line_2")
      .attr("d", line2)
      .style("stroke", "gray");
     
  context
  .append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height2 + ")")
  .call(this.xAxis2);



  context.attr("transform", "translate(" + context_x + "," + context_y + ")");
  
 

  
 return [line,svg,focus,context,Line_chart]
}



/*----------------------------------------------------------------------------------------------------------------*/
// 올뉴 아반떼
user_ice = [];

line_width = document.getElementById("line").width.animVal.value;
line_height = document.getElementById("line").height.animVal.value;

// var margin	= {top: 20, right: 30, bottom: 100, left: 20},
//     width	= line_width - margin.left - margin.right,
//     height	= line_height - margin.top - margin.bottom;

// var margin_context = {top: 320, right: 30, bottom: 20, left: 20},
//     height_context = line_height - margin_context.top - margin_context.bottom;

nameTextBox = document.querySelector("#car_name");
costTextBox = document.querySelector("#car_cost");
fuelTextBox = document.querySelector("#car_fuel");
applyBtn = document.querySelector('input[type="button"]');


ice_name = document.getElementById("ice_name");
ice_cost = document.getElementById("ice_cost");
ice_fuel = document.getElementById("ice_fuel");

x = 0;
y = 0;
// margin = { top: 20, right: 20, bottom: 50, left: 90 };
// width = 700 - margin.left - margin.right;
// height = 400 - margin.top - margin.bottom;

var svg = d3.select("#line"),
  margin = { top: 20, right: 40, bottom: 110, left: 80 },
  margin2 = { top: 430, right: 40, bottom: 30, left: 80 },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  height2 = +svg.attr("height") - margin2.top - margin2.bottom;

// ev_lowBtn = document.getElementById('ev_low');
// ev_fastBtn = document.getElementById('ev_fast');
// iceBtn = document.getElementById('ice');

/*----------------------------------------------------------------------------------------------------------------*/

d3.json("ControlGroup_ice.json",  function (error,data) {iceData(error,data)});
d3.json("Compared_ev.json", function (error,data) {evData(error,data)});


function iceData(error,data) {
  if (error) throw error;
  
  data.forEach((element) => {
    Ice.push([
      {
        name: element.차종별,
        price: element.가격,
        fuel: element.연비,
        grade: element.차급,
      },
    ]);
  });
}

function evData(error,data){
  if (error) throw error;

  data.forEach((element) => {
    Ev.push([
      {
        name: element.차종별,
        price: element.가격,
        fuel: element.연비,
        grade: element.차급,
      },
    ]);
  });

  main()
 
}

function main(){
  
  if (document.getElementById("ev_low").checked) declaredLine("ev_low");
  else if (document.getElementById("ev_fast").checked) declaredLine("ev_fast");

  applyBtn.addEventListener("click", function () {
    console.log()
    if(user_ice.length == 0){
      user_ice.push({name : nameTextBox.value, price : Number(costTextBox.value), fuel : Number(fuelTextBox.value)})
    }
    else{
      user_ice.forEach(function (element) {
        element.name = nameTextBox.value;
        element.price = Number(costTextBox.value);
        element.fuel =Number(fuelTextBox.value);
      });
    }

    if (document.getElementById("ev_low").checked) declaredLine("ev_low");
    else if (document.getElementById("ev_fast").checked) declaredLine("ev_fast");

    user_ice.forEach(function (element) {
      ice_name.innerText = element.name;
      ice_cost.innerText = element.price;
      ice_fuel.innerText = element.fuel;
    });

  });
}

function changeLine(event) {
  if (event.target.id == "ev_low") {
    declaredLine("ev_low");
  } else if (event.target.id == "ev_fast") {
    declaredLine("ev_fast");
  }
}

function evSelect() {
  selectValue = ev_select.options[ev_select.selectedIndex].value;

  // document.getElementById('ev_fast').setAttribute('checked', false);
  document.getElementById("ev_low").setAttribute("checked", false);

  if(user_ice.length == 0){
    Ice.forEach(function (element, index) {
      if (Ev[selectValue][0].grade == element[0].grade) {
        selectValue_ice = index;
        ice_name.innerText = element[0].name;
        ice_cost.innerText = element[0].price;
        ice_fuel.innerText = element[0].fuel;
      }
    });
  }
  else{
    console.log(user_ice)
    user_ice.forEach(function (element) {
        ice_name.innerText = element.name;
        ice_cost.innerText = element.price;
        ice_fuel.innerText = element.fuel;
    });
  }
  

  if (document.getElementById("ev_low").checked) declaredLine("ev_low");
  else if (document.getElementById("ev_fast").checked) declaredLine("ev_fast");
}

function declaredLine(line) {
  //svg, ev_car_data,ice_car_data, select, color
  // if(user_ice == null)

  if(user_ice.length == 0){
    ev_low_line = new Cost(svg, Ev[selectValue][0],Ice[selectValue_ice][0], low_1kwh, "#6A8EE4");
    ev_fast_line = new Cost(svg, Ev[selectValue][0],Ice[selectValue_ice][0], fast_1kwh, "#F47378");
  }
  else{
    ev_low_line = new Cost(svg, Ev[selectValue][0],user_ice[0], low_1kwh, "#6A8EE4");
    ev_fast_line = new Cost(svg, Ev[selectValue][0],user_ice[0], fast_1kwh, "#F47378");
  }



  
 

  if (line == "ev_low") {
    
    makeLine(ev_low_line)

  } else if (line == "ev_fast") {
    makeLine(ev_fast_line)
  }
}

function makeLine(Object){
  d3.selectAll("svg > *").remove();
  
  console.log(Object)
    //line,svg,focus,context,Line_chart
    let graph = Object.draw();
    
    let line = graph[0];
    let svg = graph[1];
    let focus = graph[2];
    let context = graph[3];
    let Line_chart = graph[4];
    

    
    let xScale =  Object.xScale;
    let xScale2 = Object.xScale2
    let xAxis = Object.xAxis;
   
    const tooltip = d3.select('#tooltip');
    const tooltipLine = svg.append('line');
    let diverseLine = svg.append('line')

    brushed = function () {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        var s = d3.event.selection || xScale2.range();
        xScale.domain(s.map(xScale2.invert, xScale2));
        Line_chart.select(".ev_line").attr("d", line);
        Line_chart.select(".ice_line").attr("d", line);
        diverseLine.select(".diverseLine").attr("d", line);
        focus.select(".axis--x").call(xAxis);
      
        diverseLine.attr('stroke', 'black')
          .attr("class", "diverseLine")
          .attr('x1', xScale(Object.pickValue))
          .attr('x2', xScale(Object.pickValue))
          .attr('y1', 0)
          .attr('y2', height)
          .attr('stroke','gray')
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
         
      svg.select(".zoom")
        .call(
          zoom.transform,
          d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
        );
    }
    let brush = d3.brushX().extent([[0, 0],[width, height2],]).on("brush end", brushed);
    zoomed = function () {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
      let t = d3.event.transform;
      xScale.domain(t.rescaleX(xScale2).domain());
      Line_chart.select(".ev_line").attr("d", line);
      Line_chart.select(".ice_line").attr("d", line);
      diverseLine.select(".diverseLine").attr("d", line);
      focus.select(".axis--x").call(xAxis);
      context.select(".brush") .call(brush.move, xScale.range().map(t.invertX, t));

      diverseLine.attr('stroke', 'black')
          .attr("class", "diverseLine")
          .attr('x1', xScale(Object.pickValue))
          .attr('x2', xScale(Object.pickValue))
          .attr('y1', 0)
          .attr('y2', height)
          .attr('stroke','gray')
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     
        
    }
    let zoom = d3.zoom().scaleExtent([1, Infinity]).translateExtent([[0, 0],[width, height]]).extent([[0, 0],[width, height]]).on("zoom",zoomed);  
    
    
    context
    .append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, xScale.range());

    
    tipBox = svg
    .append("rect")
    .attr("class", "zoom")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom)
    .on('mousemove', drawTooltip)
    .on('mouseout', removeTooltip);

  //   tipBox = svg.append('rect')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .attr('opacity', 0)
  //  ;


  function removeTooltip() {
      if (tooltip) tooltip.style('display', 'none');
      if (tooltipLine) tooltipLine.attr('stroke', 'none');
    }
    
  function drawTooltip() {
    const kilometer = Math.floor((xScale.invert(d3.mouse(tipBox.node())[0]) + 5) / 10) * 10;
    const ev_cost = cost(kilometer, Object.ev_car_data.fuel,Object.select,Object.ev_car_data.price);
    const ice_cost = cost(kilometer, Object.ice_car_data.fuel,ice_1L,Object.ice_car_data.price);
    
    const ev_cost_text = ev_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
    const ice_cost_text = ice_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 

    let tooltip_cost = [{name : "전기차 유지비", value : ev_cost ,color : Object.color},
                        {name : "휘발유 차량 유지비", value : ice_cost ,color : 'gray'}]
    tooltip_cost.sort(function (a, b) {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    tooltip_cost.forEach(function(v){
        v.value = v.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
        return
    })

    tooltipLine.attr('stroke', 'black')
      .attr('x1', xScale(kilometer))
      .attr('x2', xScale(kilometer))
      .attr('y1', 0)
      .attr('y2', height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    tooltip.html("주행거리 : " + kilometer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')  +"km")
      .style('display', 'block')
      .style("font-weight", "bold")
      .style('left',(d3.event.pageX + 5) + "px")
      .style('top', (d3.event.pageY - 28) + "px")
      .append('div')
      .html(tooltip_cost[0].name)
      .style("font-weight", "normal")
      .append('div')
      .style('color', tooltip_cost[0].color)
      .html( tooltip_cost[0].value +"원")
      .append('div')
      .style('color', 'black')
      .html(tooltip_cost[1].name)
      .append('div')
      .style('color', tooltip_cost[1].color)
      .html(tooltip_cost[1].value +"원");
    if(kilometer == Object.pickValue){
      tooltipLine.attr('stroke','yellow')
    }  
  
  }

}
