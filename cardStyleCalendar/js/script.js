//holds the XMLHttpRequest which will be used to dynamically add the days
var request;

$(function(){
	request = new XMLHttpRequest();
	request.open("GET", "https://mims002.github.io/websiteLayouts/cardStyleCalendar/json/data.json");
	//request.open("GET", "json/data.json");
	
	request.onload = xmlRequestData;
	
	request.send();
	
	
	
	console.log("ran");

	
	
});

function xmlRequestData(){
	
	if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      renderHTML(data);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
	
	
}

function renderHTML(data) {
  var htmlString = "";
  
  var day, date, eventDetail, eventLocation, eventTime, eventName, month;

  for(var i=0; i< data.numDays; i++){
	  
	  day = data.daysEntry[i].day;
	  date = data.daysEntry[i].date;
	  eventDetail = data.daysEntry[i].details;
	  eventLocation = data.daysEntry[i].location;
	  eventTime = data.daysEntry[i].time;
	  eventName = data.daysEntry[i].event;
	  month = data.daysEntry[i].month;
	  
	  
	  console.log(eventName);
	  
	  
	  var description = [eventName, eventTime, eventLocation, eventDetail ];
	  
	  createDaysEntry(day,date,month, createDescription(description));
	  
  }
  
}

function createDescription(d){
	var inner = "";
	var title =["Event: ", "Location: ", "Time: ", "Details: "];
	for(var i=0; i<d.length-1; i++){
		
		inner +='<span class="impact">'+title[i]+"</span>";
		inner += d[i]+"<br>";
		

	}
	inner += '<span class="depact">'+title[i] + d[i]+ "</span>";

	return inner;
}

function createDaysEntry(day,date,month,description){
	//creates the divs to the calendar entry
	var $divContainer = $("<div>", {"class":"calendar_entries"});
	var $divDate = $("<div>", {"class":"calendar_entries_left"});
	var $divInfo = $("<div>", {"class":"calendar_entries_right"});
	
	//puts the date and the day together 
	$divDate.html(day+"<br>"+date);
	
	//puts the description in the correct format 
	$divInfo.html(description);
	
	//appends date and description to the main entry 
	$divContainer.append($divDate);
	$divContainer.append($divInfo);
	
	//adds a unique class to it 
	$divContainer.attr({"class":"calendar_entries "+month+" "+date});
	
	//adds it to the website
	addDayInOrder($divContainer,month,day);
	$("#calendar_inner").append($divContainer);
	
}

function addDayInOrder($divContainer, month, day){
	
	var l = $("#calendar_inner").children().length;
	
	//adds the first month if it doesn't exits 
	if(l==0){
		var months = '<div class="calendar_entries"><span class="month">'+ month +'</span></div>';
		$("#calendar_inner").append(months);
	}
	
	for(var i = 0; i<l; i++){
		//console.log($("#calendar_inner").eq(i).is("."+month));
	}
	
	console.log(l);
	
}
function monthOrder(m){
	switch(m){
		case "Jan":
		case "January": 
			return 1;
			
		case "Feb":
		case "February": 
			return 1;
			
		case "Mar":
		case "March": 
			return 1;
		
	}
}

function msg(msg){  
 alert(msg);  
}  



