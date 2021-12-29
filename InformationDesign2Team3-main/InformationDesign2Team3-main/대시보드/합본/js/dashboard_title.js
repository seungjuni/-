var rectX = 30;
var rectY = 30;
var rectWidth = 10;
var rectHeight = 30;
var cornerRadius = 10;


Tittle = function(element,text){
    this.text = text;
    this.canvas = document.getElementById(element);
    this.ctx =  this.canvas.getContext("2d"); 

}
Tittle.prototype = Object.create(Tittle.prototype);
Tittle.prototype.draw = function(color){
    // Set faux rounded corners
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = cornerRadius;

    this.ctx.beginPath();
    // 색 설정
    this.ctx.strokeStyle = color; // 선 색
    this.ctx.fillStyle = '#333333'; // 채운 사각형 색

    // 그리기
    this.ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    this.ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    this.ctx.font = '25px Arial';
    this.ctx.fillText(this.text, rectX+15, rectY+25);
    
}

// var ctx = canvas.getContext("2d"); // 캔버스 객체 생성

ev_vs_ice = new Tittle("Canvas_EV_vs_ICE","전기차 vs 휘발유 자동차")
compared_ev = new Tittle("Canvas_Compared_Ev","전기차종별 비교")
map_ev = new Tittle("Canvas_Map_Ev","전기충전소 분포 현황")


// ctx.fillText('연료값', rectX+15, rectY+75);
// ctx.fillText('완속 : 1kWh', rectX+15, rectY+110);
// ctx.fillText('급속 : 1kWh', rectX+15, rectY+140);

