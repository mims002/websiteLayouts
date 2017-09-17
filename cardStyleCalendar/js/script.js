var request;

$(function(){
	request = new XMLHttpRequest();
	request.open("GET", "https://mims002.github.io/websiteLayouts/cardStyleCalendar/json/data.json");
	
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
  console.log(data[0].name);
}




function msg(msg){  
 alert(msg);  
}  





