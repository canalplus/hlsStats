maxValues = [];
minValues = [];
url = "http://95.81.147.22/1UiSsTgEJDqA2aKSwMDxVLZVBtO32FwwVEoQ=/7186/hlsdvr/canalplusdecale-hd-andr7/r7-hd/canalplusdecale-hd-video=3400000.m3u8";

$(document).ready(function(){

});


$("#analyzeBtn").click(function(){
	url = $("#inputUrl").val();
	setInterval("fetchValues()", 2000);
});

var plotValues = function(){
	var ctx = document.getElementById("graph").getContext("2d");
	var data = {
		labels : maxValues.map(function(e){return e.ts.getHours()+":"+e.ts.getMinutes()+":"+e.ts.getSeconds()}),
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

var fetchValues = function(){
	$.post("./getStats.php", {"url": url} ,function(res){
		if(res && res.min && res.max){
			var ts = new Date();
			maxValues.push({ts:ts, value:res.max});
			minValues.push({ts:ts, value:res.min});
			maxValues = maxValues.slice(maxValues.length-20, maxValues.length);
			minValues = minValues.slice(minValues.length-20, minValues.length);
		}
		
		plotValues();
	})
}
