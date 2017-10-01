//Logs all the action use for debugging 
var DEBUG = true;
//holds the imgages that will be used to displayed in the gallery 
var img1, img2, img3, numImg=5, currentImg=0;


var transform = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];

$(document).ready(function(){
	img1 = $(".background>.img_container").children().eq(1);
	img2 = $(".background>.img_container").children().eq(0);
	
	img3 = new Image();
 
	img3.src = "img/0.jpg";
	
	
	//setInterval(img1.addClass("fadeOut").removeClass("fadeOut"), 5000);
	setTimeout(fadeIn, 1000);
	
})


function fadeIn(){
	img1.attr("src", getNewImage());
	adjustImage(img1);
	
	img1.removeClass("fadeOut").addClass("fadeIn");
	img2.removeClass("fadeIn").addClass("fadeOut");
	
	setTimeout(fadeOut, 5000);
	if(DEBUG) console.log("fadedIn");
}
function fadeOut(){
	img2.attr("src", getNewImage());
	adjustImage(img2);
	
	img2.removeClass("fadeOut").addClass("fadeIn");
	img1.removeClass("fadeIn").addClass("fadeOut");
	
	setTimeout(fadeIn, 5000);
	if(DEBUG) console.log("fadedOut");
	
}
//returns the next image
function getNewImage(){
	var imgpath = "";
	currentImg = (currentImg+1)%numImg;
	imgpath = "img/"+currentImg+".jpg";
	return imgpath;
}

//aligns the image
function adjustImage($img){
	var height = $img.height();
	var width = $img.width();
	
	var superheight = $(".background").height();
	var superwidth = $(".background").width();
	
	if(DEBUG) console.log(height +"xx"+width);
		if(DEBUG) console.log(superheight +"xx"+superwidth);
		
	if(superheight > superwidth){
		$img.css({"height":"100vh","width":"auto"});
	}
	if(superwidth > superheight){
		$img.css({"width":"100vw","height":"auto"});
	}
	
	
	
}
 /* 
  img = $('#tt')[0];
  //initalizes the images 
  img1 = $(".background").children().eq(0);
  img2 = $(".background").children().eq(1);
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
	var transformProperty = getSupportedPropertyName(transform);
	//img1.css("z-index","0");
	var width_parent = img1.parent().width(); 
	img2.stop(false,true);
	//img2.css({"top":"10px"});
	img1.fadeOut(3500);
	img2.fadeIn(3500,postChange);
	//img2.css("left",width_parent).animate({"left":"0px"},3500, postChange);
	

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



function getSupportedPropertyName(properties) {
    for (var i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] != "undefined") {
            return properties[i];
        }
    }
    return null;
}
  
  

  


	













*/











