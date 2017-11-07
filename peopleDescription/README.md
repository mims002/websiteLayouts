# Card Style Info Template
Created by Mrinnmoy Mondal 


## Card Style Info [Sample Page](https://mims002.github.io/websiteLayouts/peopleDescription/)
<img src="Sample%20Images/mobile.PNG" height="400px"></img>
<img src="Sample%20Images/portrait.PNG" width="500px"></img>
## Description
This is a card style info layout consisting of a image, description and a external link button. It uses a resposive layout wirh CSS grid. Not all broswers may support it. The image uses the full width of the display.This can be used to show different organizations, people, events, etc.
## How to use 
Use the given template and change fields as nessasary  
```<!-- start new org-->
<div class="container">  
  <div id="pic_set"><img src="img/Sample_Image.jpg"></div>  
  <div id="description_set">  
    <!-- Organization Name-->  
    <b style="font-size: 1.2em">
      Sample Title 
    </b> <br>  
    <!-- Organization Type-->
    <div style="margin-left: 1em" ><em>
      Sample Organization Type
    </div></em>
    <p style="margin-left: 1em" >
      Sample Descrition.
    </p>
  </div>
  <!-- change button text and link-->
  <button id="get_connected_button" onclick='parent.location="https://www.google.com/"'>
    Sample Buttom Text
  </button>
</div>
<!-- end new org-->
```  
Change the Sample items in the code and provide a image path per item.

## Testing
This layout has been tested on Chrome v60 on mobile and Desktop. To run the test click on the sample page and run it on a broswer. If everything loads it has passed. 





