//Logs all the action use for debugging 
var DEBUG = true;
//holds the imgages that will be used to displayed in the gallery 
var img1, img2, img3, numImg=5, currentImg=0;


var transform = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];

$(document).ready(function(){
	img1 = $(".background>.img_container").children().eq(1);
	img2 = $(".background>.img_container").children().eq(0);
	
	
	
	adjustImage(img1);
	adjustImage(img2);
	
	
	//setInterval(img1.addClass("fadeOut").removeClass("fadeOut"), 5000);
	fadeIn();
	
})


function fadeIn(){
	img1.attr("src", getNewImage());
	adjustImage(img1);
	adjustImage(img2);
	
	img1.removeClass("fadeOut").addClass("fadeIn");
	img2.removeClass("fadeIn").addClass("fadeOut");
	
	setTimeout(fadeOut, 6000);
	if(DEBUG) console.log("fadedIn");
}
function fadeOut(){
	img2.attr("src", getNewImage());
	
	adjustImage(img2);
	adjustImage(img1);
	
	img2.removeClass("fadeOut").addClass("fadeIn");
	img1.removeClass("fadeIn").addClass("fadeOut");
	
	setTimeout(fadeIn, 6000);
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
	containerheight =$(".container_slider").offset().top+$(".container_slider").outerHeight(true);
	if(DEBUG) console.log("container height is : ", containerheight);
	$(".background").css("height",containerheight);
	$(".background").css("width","100vw");
	
	var height = $img.height();
	var width = $img.width();
	
	
	var superheight = $(".background").height();
	var superwidth = $(".background").width();
	
	if(DEBUG) console.log("imgage size",height +"xx"+width);
	if(DEBUG) console.log("image contianer size", superheight +"xx"+superwidth);
	
	/*special case from 730px-1080px*/
	if(superheight > superwidth || (superheight<1080 && superheight>730)){
		
		$img.css({"height":superheight+"px","width":"auto"});
		if(DEBUG) console.log("height is bigger: ",superheight);
	}
	else if(superwidth > superheight ){
		$img.css({"width":superwidth+"px","height":"auto"});
		if(DEBUG) console.log("width is bigger", superwidth);
	}
	
	if(superwidth<width){
		var px = -1*(((width-superwidth)/2)/height)*100;
		$img.css("left",px+"%");
		if(DEBUG) console.log("moving image by "+px+"%");
	}else{
		$img.css("left","0%");
	}

	
	
}

function initsize(){
	containerheight =$(".container_slider").offset().top+$(".container_slider").outerHeight(true);
	if(DEBUG) console.log("container height is : ", containerheight);
	$(".background").css("height",containerheight);
	$(".background").css("width","100vw");
	
	var height = $img.height();
	var width = $img.width();
	
	
	var superheight = $(".background").height();
	var superwidth = $(".background").width();
	
	if(DEBUG) console.log("imgage size",height +"xx"+width);
	if(DEBUG) console.log("image contianer size", superheight +"xx"+superwidth);
}

$(window).resize(function() {
	adjustImage(img1);
	adjustImage(img2);
	
});
	






















