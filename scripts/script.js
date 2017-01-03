var gridSize = 20;
var squareSize = 800/gridSize;
var ourColor = "blue";
var colorSetting = "";
var isBorder = true;

// Loadup the grid with default values when window loads.
$(document).ready(function(){
	$("#bluecircle").css("border-color", "black");
	gridStart(); // Populate grid with default settings.
	hoverEffect(); // Call the hover function to get it attached.
	setBorder(); // Call the setBorder function to get it attached.
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
	$(this).css("border-color", "black");
	// If this color is "fade", set ourColor to fade.
	if($(this).data("color") === "fade") {
		colorSetting = "fade";
	// Else if color is "random", set ourColor to random and.
	} else if($(this).data("color") === "random") {
		colorSetting = "random";
	// Otherwise set ourColor to the current circle's respective color.
	} else {
	ourColor = $(this).data("color");
	}
});

// Hover Effect. Note: When events are called(through functions, window loads, etc) they are ATTACHED to their target elements. Initially I had issues where I was attaching it multiple times and
// I later realized by using alerts that it was firing off more than once. We also wrap this in a function so that after deleted old DIVs and creating new DIVs we need to reattach this event to the new DIVs.
function hoverEffect() {
	$(".grid-square").mouseenter(function(){
		// Check if the ourColor is set to random, if it is we will change ourColor to a random color.
		if(colorSetting === "random") {
			ourColor = '#'+Math.random().toString(16).substr(2,6);
			// Set opacity back to default
			$(this).css("opacity","1");
		// else if ourColor is set to fade, we will begin changing opacity instead.
		} else if(colorSetting === "fade") {
			// Background has to be set to black so that we get a fade from white to black when increasing opacity.
			ourColor = "black";
			// Checks if opacity is default(1) and if so, sets it to 0(fully transparent).
			if($(this).css("opacity") === "1") {
				$(this).css("opacity", "0");
			}
		// As long as the div we're on has a transparency lower than default(1) we will increase it; increasing as high as .90.
			if($(this).css("opacity") < 0.9) {
				$(this).css("opacity", "+=0.1");
			}
		} else {
			// By default we need opacity to be 1(no transparency)
			$(this).css("opacity","1");
		}
		$(this).css("background-color", ourColor);
		if(!isBorder) {
			$(this).css("border", "1px solid "+ourColor);
		}
	});
}

function setBorder() {
	$("#borderbutton").click(function(){
		// If isBorder is true(on), we turn it off.
		if(isBorder) {
			// Run through each grid square and change it's border from black to the color of it's current background. This is how we toggle off the grid.
			$(".grid-square").each(function(){
				var resetColor = $(this).css("background-color");
				$(this).css("border", "1px solid "+resetColor);
				isBorder = false;
				$("button#borderbutton").html("Grid: Off");
			});
		// Otherwise if border is false(off), we turn it on and put a border on all grid-squares.
		} else {
			$(".grid-square").css("border", "1px solid #885a07");
			isBorder = true;
			$("button#borderbutton").html("Grid: On");
		}
	});
}


function gridStart() {
	// Create rows
	for(i=0; i<gridSize*gridSize; i++) {
  	$("#container").append("<div class='grid-square'></div>")
	}

	// Set Proper Size
	$(".grid-square").css("height", squareSize-2);
	$(".grid-square").css("width", squareSize-2);

	// Set border/grid properly.
	if(!isBorder) {
		$(".grid-square").css("border", "1px solid white");
	}
}