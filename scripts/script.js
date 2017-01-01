var gridSize = 100;
var squareSize = 800/gridSize;
var ourColor = "blue";
var colorSetting = "";

// Loadup the grid with default values when window loads.
$(document).ready(function(){
	$("#bluecircle").css("border-color", "#d3d3e2");
	gridStart(); // Populate grid with default settings
	hoverEffect(); // Call the hover function to get it active
});

// Reset Button
$("#clear-grid").click(function(){	
  	$(".grid-square").remove();
  	gridStart();
  	hoverEffect();
});

// Resize Button
$("#resize").click(function(){
	$(".grid-square").remove();
 	gridSize = parseInt(prompt("Choose a pixel density. e.g 100 = 100x100 pixels dense.", "100"));
 	squareSize = 800/gridSize;
 	gridStart();
 	hoverEffect();
});

// Color Swab
$(".color-circle").click(function(){
	// Reset Color Setting
	colorSetting = "";
	// Unhighlight any highlighted circles.
	$(".color-circle").css("border-color", "transparent");
	// Highlight this circle.
	$(this).css("border-color", "#d3d3e2");
	// If this color is "fade", set ourColor to fade and call the hover function without using a parameter.
	if($(this).data("color") === "fade") {
		colorSetting = "fade";
	// Else if color is "random", set ourColor to random and call the hover function without using a parameter.
	} else if($(this).data("color") === "random") {
		colorSetting = "random";
	// Otherwise set ourColor to the current circle's respective color and send it as a parameter to the hover function.
	} else {
	ourColor = $(this).data("color");
	}
});

// Hover Effect NOTE, WHEN AN EVENT IS CALLED(THROUGH FUNCTION OR NOT) IT "ATTACHES" TO IT'S RELATED ELEMENT. THIS IS WHY WE CALL IT EVERYTIME WE RESET THE GRID DUE TO HAVING NEW DIVS.
function hoverEffect() {
	$(".grid-square").mouseenter(function(){
		// Check if the ourColor is set to random, if it is we will change the color parameter to a random color. This triggers on each hover.
		if(colorSetting === "random") {
			ourColor = '#'+Math.random().toString(16).substr(2,6);
		} else if(colorSetting === "fade") {
			if($(this).css("opacity") === "1") {
				$(this).css("opacity", "0");
			}
		if($(this).css("opacity") < 0.9) {
			$(this).css("opacity", "+=0.1");
			ourColor = "black";
		}
		} else {
			$(this).css("opacity","1");
		}
			$(this).css("background-color", ourColor);
	});
}

function gridStart() {
// Create rows
for(i=0; i<gridSize*gridSize; i++) {
  $("#container").append("<div class='grid-square'></div>")
}

// Set Proper Size
$(".grid-square").css("height", squareSize);
$(".grid-square").css("width", squareSize);
}