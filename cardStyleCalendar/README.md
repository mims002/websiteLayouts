# Card Style Calendar Template
Created by Mrinnmoy Mondal 


## Card Style Calendar (w/auto sort & w/database support) [Sample Page](https://mims002.github.io/websiteLayouts/cardStyleCalendar/)
<img src="Sample%20Images/mobile.PNG" height="400px"></img>
<img src="Sample%20Images/portrait.PNG" width="500px"></img>
## Description
This is a card style calendar layout consisting of a month, date, and description. It uses a resposive layout. Calendars entried are dynamically added from a database. It offers smart checks incase the database was not correctly implemented. It will sort all dates by year, month and then date. The past dates will be greyed out. Years that are not current will have the year listed. 
## How to use 
Use the given template and change fields as nessasary  
The database must create a json file 
```{
	"numDays" : 2, 
	
	"daysEntry": [
		{
			"month":"September 2016",
			"day" : "Mon",
			"date": 19,
			"event":"Event",
			"time": "3-4pm",
			"location": "Place",
			"details" :"more info" 
			
		},
		{	
			"month":"September",
			"day" : "Tue",
			"date": 16,
			"event":"Event",
			"time": "3-4pm",
			"location": "Place",
			"details" :"more info" 
			
		}
}
```  
Change the Sample items in the code. Month can have a year but it is not nessesary if the year is the same as the current year. Date and numDays have to be ints. numDays are how many of the data enteries you want showing.

## Testing
This layout has been tested on Chrome v60 on mobile and Desktop. To run the test click on the sample page and run it on a broswer. If everything loads it has passed. Test cases coming soon. 





