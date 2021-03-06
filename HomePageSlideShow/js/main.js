//Logs all the action use for debugging 
var DEBUG = true;
//holds the imgages that will be used to displayed in the gallery 
var img1, img2, img3, numImg=7, currentImg=0;


var transform = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];

$(document).ready(function(){
	img1 = $(".background>.img_container").children().eq(1);
	img2 = $(".background>.img_container").children().eq(0);
	
	
	
	adjustImage(img1);
	adjustImage(img2);
	
	
	//setInterval(img1.addClass("fadeOut").removeClass("fadeOut"), 5000);
	fadeIn();
	
})

//fades in the image 
function fadeIn(){
	img1.one("load",function(){
		adjustImage(img1);
		
		
		img1.removeClass("fadeOut").addClass("fadeIn");
		img2.removeClass("fadeIn").addClass("fadeOut");
		
		setTimeout(fadeOut, 3000);
		if(DEBUG) console.log("fadedIn");	
		
	}).attr("src", getNewImage());
	
	
	
}

//fades out the image
function fadeOut(){
	img2.one("load",function(){
		
		adjustImage(img2);
		
		
		img2.removeClass("fadeOut").addClass("fadeIn");
		img1.removeClass("fadeIn").addClass("fadeOut");
		
		setTimeout(fadeIn, 3000);
		if(DEBUG) console.log("fadedOut");
			
	}).attr("src", getNewImage());
	
	
	
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
	
	//resets the image position
	$img.css({"left":"0","top":"0","height":"auto","width":"auto"});
	
	
	var height = $img.height();
	var width = $img.width();
	
	
	var superheight = $(".background").height();
	var superwidth = $(".background").width();
	
	
	
	if(DEBUG) console.log("imgage size",height +"xx"+width);
	if(DEBUG) console.log("image contianer size", superheight +"xx"+superwidth);
	
	//adjusts the height first 
	if( height != superheight ){
		
		$img.css({"height":superheight+"px","width":"auto"});
		if(DEBUG) console.log("height is bigger: ",superheight);
	
		width = $img.width();
		
		
		if(superwidth<width){
			var px = -1.0*((width-superwidth)/2.0);
			$img.css("left",px+"px");
			if(DEBUG) console.log("moving image by "+px+"px");
		}
	}
	//adjust the width if nessasary 
	if(width<superwidth) {
		$img.css({"width":superwidth+"px","height":"auto"});
		//alert("ran");
		if(DEBUG) console.log("width is bigger", superwidth);
	}
	
	

	
	
}


$(window).resize(function() {
	adjustImage(img1);
	adjustImage(img2);
	
});
	

