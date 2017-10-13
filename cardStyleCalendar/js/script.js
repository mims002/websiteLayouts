var colr = ["#F26D44", "#F26A44","#F26A44"];
color =[];
var colorIndex = 0;

var dateObj = new Date();
var currentMonth = dateObj.getUTCMonth() + 1; //months from 1-12
var currentDay = dateObj.getUTCDate();
var currentYear = dateObj.getUTCFullYear();

var DEBUG = true;

//holds the XMLHttpRequest which will be used to dynamically add the days
var request;

$(function(){
	request = new XMLHttpRequest();
	request.open("GET", "https://mims002.github.io/websiteLayouts/cardStyleCalendar/json/data1.json");
	//request.open("GET", "https://googledrive.com/host/0B-u62Mq0rwlkSjZNWFV2UVZUQ3c");
	//request.open("GET", "json/data.json");
	
	request.onload = xmlRequestData;
	
	request.send();
	
	
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
  
  var day, date, eventDetail, eventLocation, eventTime, eventName, month, year;

  for(var i=0; i< data.numDays; i++){
	  
	  day = data.daysEntry[i].day;
	  date = data.daysEntry[i].date;
	  eventDetail = data.daysEntry[i].details;
	  eventLocation = data.daysEntry[i].location;
	  eventTime = data.daysEntry[i].time;
	  eventName = data.daysEntry[i].event;
	  month = data.daysEntry[i].month;
	  
	  year = ((month.split(" ")).length>=2) ? parseInt(month.split(" ")[1]) : currentYear;
	  
	  	  
	  var description = [eventName, eventTime, eventLocation, eventDetail ];
	  
	  createDaysEntry(day,date,month, year, createDescription(description));
	  
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

function createDaysEntry(day,date,month,year, description){
	//creates the divs to the calendar entry
	var $divContainer = $("<div>", {"class":"calendar_entries"});
	var $divDate = $("<div>", {"class":"calendar_entries_left"});
	var $divInfo = $("<div>", {"class":"calendar_entries_right"});
	console.log( date);
	//greys out the boc if the month or day has passed
	if( (year < currentYear) ||
		(year == currentYear && monthOrder(month.split(" ")[0]) < currentMonth)  || 
		(year == currentYear && monthOrder(month.split(" ")[0]) == currentMonth && date < currentDay) ){
			
			$divContainer.css("color","rgba(0,0,0,0.50)");
		}
		
	
	
	$divContainer.css("backgroundColor",color[colorIndex]);
	
	//puts the date and the day together 
	$divDate.html(day+"<br>"+date);
	
	//puts the description in the correct format 
	$divInfo.html(description);
	
	//appends date and description to the main entry 
	$divContainer.append($divDate);
	$divContainer.append($divInfo);
	
	//adds a unique class to it 
	$divContainer.attr({"class":"calendar_entries "+date+" "+month});
	
	addDayInOrder($divContainer,year,month,date);
	
}

//adds the date in order 
//also calls add month if nesaasary
function addDayInOrder($divContainer,year, month, date){
	
	if(DEBUG) console.log("Starting adding------------");
	
	//adds the month and return the div
	var $parentMonth = getMonth(year,month);
	
	
	var $prevdate = $parentMonth;
	
	//starts at the month and finds the right place to place the day 
	for(var i = $parentMonth.index()+1; i< $("#calendar_inner").children().length; i++){
		//gets the previous date as to which it will be entered after 
		$prevdate = $("#calendar_inner").children().eq(i);
		var s = $prevdate.attr('class').split(" ");
		//if the list goes beyond the current month 
		//brings it back and breaks
		if(s[0] === "type_month" || i+1 == $parentMonth.index()){
			$prevdate = $("#calendar_inner").children().eq(i-1);
			break;
		}
			
		var last_date = parseInt(s[1]);
		
		
		if(date<last_date){
			$prevdate.before($divContainer);
			if(DEBUG) console.log("END adding----------------");
			return;
		}
	}
	
	
	//adds it to the website after the month
	$prevdate.after($divContainer);
	
	
	if(DEBUG) console.log("END adding----------------");
}

//adds the month if it doesn't exits
//returns the month div 
function getMonth(year,month){
	
	var monthNum = monthOrder((month).split(" ")[0]);
	var formattedMonthStr = getFullMonthName(monthNum)+" "+ year;
	console.log(formattedMonthStr);
	var fromattedMonthDisplay = (year == currentYear) ? getFullMonthName(monthNum) :  formattedMonthStr;

	
	var $month = $("div."+"type_month."+getFullMonthName(monthNum)+"."+ year+".calendar_entries");

	
	
	//creates new month 
	if($month.length==0){
		
		//if there is not other months to compare to
		if($("#calendar_inner").children().length == 0){
			$("#calendar_inner").append($month = $('<div>', { "class" : ("type_month calendar_entries " + formattedMonthStr),
								   html    : ('<span class="month">'+ fromattedMonthDisplay +'</span>')}));
			
			if(DEBUG) console.log("Month Created class "+ $month.attr('class'));
			return $month ;
		}
		
		
		//finds the right month order 
		var $tempMonth;
		for(var i = $("#calendar_inner").children().length-1; i>=0; i--){
			$month = $("#calendar_inner").children().eq(i);
			
			//if its all the way at the top
			if( i == 0){
				$month.before($month = $('<div>', { "class" : ("type_month calendar_entries " + formattedMonthStr),
								   html    : ('<span class="month">'+ fromattedMonthDisplay +'</span>')}));
				break;
			}
			
			var s = $month.attr('class').split(" ");
			
			var monthTempStr = s[2];
			var yearTemp = parseInt(s[3]);
			
			//checks year and month
			if(yearTemp>year) continue;
			if(yearTemp==year && monthOrder(monthTempStr)> monthNum) continue ;
		
			
			$month = addToDivAfter(
					$month, 
					{"class": ("type_month calendar_entries " + month)}, 
					('<span class="month">'+fromattedMonthDisplay+'</span>') );
			if(DEBUG) console.log("Month Created class "+ $month.attr('class'));
			break;
		}
		
		
		
	}
	
	
	
	return $month;
	
	
}

function addToDivAfter($div, attr, htmlString){
	var container = $("<div>");
	container.attr(attr);
	container.html(htmlString);
	$div.after(container);
	
	return container;
}

function addToDivBefore($div, attr, htmlString){
	var container = $("<div>");
	container.attr(attr);
	container.html(htmlString);
	$div.before(container);
	
	return container;
}

function monthOrder(m){
	//safety check 
	//makes sure if the database doesn't include an uppercase month
	m = m+"";
	m = m.toLowerCase();
	m = m.charAt(0).toUpperCase() + m.substring(1);
	switch(m){
		case "Jan":
		case "January": 
			return 1;
			
		case "Feb":
		case "February": 
			return 2;
			
		case "Mar":
		case "March": 
			return 3;
		
		case "Apr":
		case "April": 
			return 4;

		case "May":
		case "May":
			return 5;

		case "Jun":
		case "June":
			return 6;

		case "Jul":
		case "July":
			return 7;

		case "Aug":
		case "August":
			return 8;

		case "Sept":
		case "September":
			return 9;

		case "Oct":
		case "October":
			return 10;

		case "Nov":
		case "November":
			return 11;

		case "Dec":
		case "December":
			return 12;
	}
	
	return -1;
}


function getFullMonthName(i){
	switch(i){
		case 1 : return "January"; 
		case 2 : return "February"; 
		case 3 : return "March";
		case 4 : return "April";
		case 5 : return "May";
		case 6 : return	"June";
		case 7 : return "July";
		case 8 : return "August";
		case 9 : return "September";
		case 10 : return "October";
		case 11 : return "November";
		case 12 : return "December";
	}
	return -1;
}

function msg(msg){  
 alert(msg);  
}  



