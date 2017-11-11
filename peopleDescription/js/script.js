var DEBUG = true;
var $personContainer;
var personDivSize = 250;
var personDivMargin = 40;
var numPerson = 0;

$(function(){
	if($(".loading").length ==0)
		$("body").append("<p class='loading'>...loading</p>");
	//google sheets json file
	//https://docs.google.com/spreadsheets/d/1Wd_MUhy01g8zQcxUitY9akCsC6M9wvKokjZRUGEwkHI/edit?usp=sharing
	//var JSONURL= 'https://spreadsheets.google.com/feeds/list/1Wd_MUhy01g8zQcxUitY9akCsC6M9wvKokjZRUGEwkHI/1/public/basic?alt=json';
	var JSONURL= 'https://spreadsheets.google.com/feeds/list/1Wd_MUhy01g8zQcxUitY9akCsC6M9wvKokjZRUGEwkHI/1/public/basic?alt=json';
	
	//loads the people data
	$.ajax({
	url: JSONURL,
	success: function(data){
		
		if(DEBUG) console.log(data);
		//holds all the people
		var peopleEntry = [];
		var cells = data.feed.entry;
		
		for (var i = 0; i < cells.length; i++){
			var person = new Object();
			
			
			var rowsCols = cells[i].content.$t.split(',');
			
			for(var j = 0; j< rowsCols.length; j++){
				var startIndex = rowsCols[j].indexOf(':');
				if(person['description'] == null){
					var startIndex = rowsCols[j].indexOf(':');
					person[rowsCols[j].substring(0, startIndex++).trim()] = rowsCols[j].substring(startIndex); 
				}else //allows description with commas to be added
					person['description']= person['description']+","+ rowsCols[j];
			}
			
			peopleEntry.push(person);
			
			if(DEBUG) console.log("loaded person", person);
		}
		//sorts by thier rank
		peopleEntry.sort(function(a, b){return parseInt(a.rank) - parseInt(b.rank)})
		
		renderPeopleEntry(peopleEntry);

	}
		
		
		});
		
})
//return the url to the image by extracting ID for google drive images 
function getImageUrl(s){
	if(s==null) return "";
	s = s.split('/');
	return 'https://docs.google.com/uc?id=' + (s[5]);
}
//adds each person to a div from the peopleEntry array
function renderPeopleEntry(data){
	
	var name, position, description, url;
	//holds all the people 
	$personContainer = $("<div>", {"class":"person_container"});
	$("body").append($personContainer);
	
	
	//goes through each data and adds each person
	for(var i = 0; i < data.length; i++){
		setSize($personContainer);
		numPerson++;
		name = data[i].name;
		position= data[i].position;
		description= data[i].description;
		url = data[i].pictureurl;
		//for google drive images
		//url = getImageUrl(data[i].pictureurl);
		
		if(DEBUG) console.log(name,position,description);
		
		$person = createPerson(name,position,description,url);
		
		$personContainer.append($person);
		//sets the action event listener to display full description when clicked
		$person.click( function(){	
					displayDescription(data, $personContainer.children().index(this));
		});
	}
		
}

//created the div for each person and returns it 
function createPerson(name,position,description,url){
	
	var $person = $("<div>", {"class":"person"});
	var $title = $("<div>", {"class":"description_person"});
	//reads out a loading message 
	
	var img = new Image();
	
	img.onload = function(){
		
		//removed the reading message after the first loads up
		$person.css("background-image","url("+url+")");
		$(".loading").remove();
		
	}
	if(name.length>10) name = name.substring(0,13)+"..";
	img.src = url;
	
	$person.append($title);
	$title.html("<span class='impact'>"+name+ "</span><br>"+position);
	
	return $person;
	
	
}

//sets the size for the personContainer div so it is always centered
function setSize($personContainer){
	var width = $(window).width();
	
	var finalSize = Math.floor(width/(personDivSize + personDivMargin)) ;
	if (numPerson < finalSize) finalSize = numPerson;
	
	
	var size = 0;
	if(finalSize < 2){
		size = personDivSize;
	}else{
		size = finalSize* (personDivSize + personDivMargin);
		fixBottomRow(finalSize);
		
	}
	
	$personContainer.css("width", size+"px");
	if(DEBUG) console.log('personContainer = ',finalSize);
	
}
//displays the description 
function displayDescription(data, index){
	var $background = $('<div>', {'class':'background_description'}).css('display','block');
	var $foreground = $('<div>', {'class':'foreground_description'}).css('display','block');
	
	$('body').append($background);
	$('body').append($foreground);
	
	var $personDescription = $personContainer.children().eq(index).clone();

	$foreground.css({
		'max-width': '400px',
		'max-height': '400px',
		'height':$foreground.width()+'px',
	});

	$personDescription.css({
		'border-radius':'0',
		'float':'none',
		'margin':'0',
		'width': $foreground.width()+'px',
		'height': $foreground.height()+'px'
	});
		
	$personDescription.children().eq(0).css({

		'height': '100%',
		'width': $foreground.width()+'px',
		'top': '0',
		'top': '0',
		'color': 'black',
		'line-height': '130%',
		'background-color' : 'rgba(255,255,255,.8)',
		'overflow':'auto',
		'padding-top': '20px',
	}).html(createDescription(data, index));
	
	$foreground.append($personDescription);

	//$foreground.html(data[index].description);
	//removes the popup once its displayed once the black part is hit
	window.onscroll = function () {  
		// called when the window is scrolled.
		$foreground.remove();
		$background.remove();
	};
	$( window ).resize(function () {  
		// called when the window is scrolled.
		$foreground.remove();
		$background.remove();
	});
	$background.click(function(){this.remove();$foreground.remove(); });
	
}
function createDescription(data, index){
	var s = "<div style='margin: 10px; padding-bottom:15px;'>Name: <br><span class='impact'>"+ data[index].name+ "</span><br>"+
			"Position: <br><span class='impact'>"+ data[index].position+ "</span><br>"+
			"<p style='margin-top:1em; text-align: left;'>"+
			"<span class='depact'>"+ data[index].description+ "</span></p></div>";
	return s;
}
//removes the current displaying description 
function removeDiv($div){
	$div.remove();
}
//fixes the last column size to be centered
function fixBottomRow (colSize){
	
}
$(window).resize(function() {
	setSize($personContainer);
	
});