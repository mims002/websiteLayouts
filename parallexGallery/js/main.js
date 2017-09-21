//Logs all the action use for debugging 
var DEBUG = true;
//holds the imgages that will be used to displayed in the gallery 
var img1, img2, img3;

$(document).ready(function(){
  img = $('#tt')[0];
  //initalizes the images 
  img1 = $(".container_slider").children().eq(0);
  img2 = $(".container_slider").children().eq(1);
  //adds the action listener to it
  img.addEventListener("click", swapImage);

  img3 = new Image();
 
  img3.src = "img/i2.jpg";
  adjustImage(img3);
  
  
  //starts moving the gallery form start
  swapImage();
  
  
  
});

i =0;

var width_parent;
//runs on click 
function swapImage(){
	if(DEBUG)console.log(i++);
	if(DEBUG)console.log(i++);
	
	
	changeImage();
	
}
//changed img1 to img2 by removing active attribute
function changeImage(){
	
	//img1.css("z-index","0");
	var width_parent = img1.parent().width(); 
	img2.stop(false,true);
	//img2.css({"top":"10px"});
	
	img2.css("left",width_parent).animate({"left":"0px"},3500, postChange);

}
function adjustImage($img){
	var height = $img.height;
	var width = $img.width;
	
	if(DEBUG) console.log(height +"xx"+width);
}
//moves the background image after animating it 
function postChange(){
	
	console.log("ran~!");
	img1.html("");
	img1.css("left",width_parent);
	img1.css("z-index","1");
	img2.css("z-index","-1");
	
	
	
	var imgT = img1;
	img1 = img2;
	img2 = imgT;
	
	img1.stop(false,true);
	changeImage();
	

}



	
	

























