maxValues = [];
minValues = [];
rollbacks = {};

Number.prototype.pad = function (len) {
    return (new Array(len+1).join("0") + this).slice(-len);
}

$(document).ready(function(){

});


$("#analyzeBtn").click(function(){
	url = $("#inputUrl").val();
	setInterval("fetchValues()", 2000);
});

var plotValues = function(){
	var ctx = document.getElementById("graph").getContext("2d");
	var data = {
		labels : maxValues.map(function(e){return e.ts.getHours().pad(2)+":"+e.ts.getMinutes().pad(2)+":"+e.ts.getSeconds().pad(2)}),
		datasets : [
			{
				fillColor : "rgba(220,220,220,0)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : maxValues.map(function(e){return e.value})
			},
			{
				fillColor : "rgba(151,187,205,0)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : minValues.map(function(e){return e.value})
			}
		]
	}

	var options = {
		animation: false
	};
	var chart = new Chart(ctx).Line(data,options);

}

var analyzeValues = function(){
	var ref = 0;
	maxValues.forEach(function(val){
		if(val.value < ref){
			rollbacks[val.ts.getTime()] = {from: ref, to: val.value};
		}
		ref = val.value;
	});
}

var displayRollbacks = function(){
	Object.keys(rollbacks).forEach(function(_ts){
		var ts = new Date(parseInt(_ts));
		var date = ts.getHours().pad(2)+":"+ts.getMinutes().pad(2)+":"+ts.getSeconds().pad(2);
		$('#errors').append("["+date+"] Rollback de chunk (ID de "+rollbacks[_ts].from+" -> "+rollbacks[_ts].to+")<br/>");
	});

}

var fetchValues = function(){
	$.post("./getStats.php", {"url": url} ,function(res){
		if(res && res.min && res.max){
			var ts = new Date();
			maxValues.push({ts:ts, value:res.max});
			minValues.push({ts:ts, value:res.min});
			maxValues = maxValues.slice(Math.max(0, maxValues.length-20), maxValues.length);
			minValues = minValues.slice(Math.max(0, minValues.length-20), minValues.length);
		}
		
		plotValues();
		analyzeValues();
		displayRollbacks();
	})
}
