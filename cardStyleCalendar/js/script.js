$(function(){
	var request = new XMLHttpRequest();
	request.open("GET", "https://mims002.github.io/websiteLayouts/cardStyleCalendar/json/data.json");
	var data = JSON.parse(request.responseText);
      renderHTML(ourData);
	if (request.status >= 200 && request.status < 400) {
      
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
	
});


function renderHTML(data) {
  var htmlString = "";
  console.log(data[0].name);
}




function msg(msg){  
 alert(msg);  
}  





