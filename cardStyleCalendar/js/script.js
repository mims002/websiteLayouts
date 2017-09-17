$(function(){
	var request = new XMLHttpRequest();
	request.open("GET", "jason/data.json");
	
	if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
	
});







function msg(msg){  
 alert(msg);  
}  





