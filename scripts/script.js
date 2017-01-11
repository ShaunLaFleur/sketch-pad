var gridSize = 64;
var squareSize = 800/gridSize;
var ourColor = "blue";
var colorSetting = "";
var isBorder = false;

// Loadup the grid with default values when window loads.
$(document).ready(function(){
	gridStart(); // Populate grid with default settings.
	swabStart(); // Color Swab generator.
});

// Generate Sketch Pad
function gridStart() {
	// Create rows
	for(i=0; i<gridSize*gridSize; i++) {
  	$("#container").append("<div class='grid-square'></div>")
	}

	// Set Proper Size
	$(".grid-square").css("height", squareSize-2); // -2 to make up for the 1px border on each side.
	$(".grid-square").css("width", squareSize-2); // Same as above.

	// Set border/grid properly.
	if(isBorder) {
		$(".grid-square").css("border", "1px solid #4286f4");
	}
	
// Attach mouseenter effect
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
			// By default we need opacity to be 1(no transparency).
			$(this).css("opacity","1");
		}
		$(this).css("background-color", ourColor);
	});
	 
}

// Generate Color Swab
function swabStart() {
	for(i=0; i<225; i++) {
		$("#contain-colors").append("<div class='grid-color' data-color=''></div>");
		var randColor = '#'+Math.random().toString(16).substr(2,6);
		$(".grid-color").last().css("background-color", randColor);
		$(".grid-color").last().data("color", randColor);
	}

	// Color Swab Click
	$(".fade-rain, .grid-color").click(function(){
		// Unhighlight.
		$(".fade-rain").css("border-color", "white");
		// Highlight this option.
		$(this).css("border-color", "black");
		// If this color is "fade", set ourColor to fade.
		if($(this).data("color") === "fade") {
			colorSetting = "fade";
			$("#selected").css("background-color", "transparent");
		// Else if color is "random", set ourColor to random.
		} else if($(this).data("color") === "random") {
			colorSetting = "random";
			$("#selected").css("background-color", "transparent");
		// Otherwise set ourColor to the currently selected color.
		} else {
			ourColor = $(this).data("color");
			$("#selected").css("background-color", ourColor);
			// Reset Color Setting
			colorSetting = "";
		}		
	});


	// Color Swab Hover
	$(".grid-color").mouseenter(function(){
		var preview = $(this).css("background-color");
		$("#highlighted").css("background-color", preview);
	});

	$(".grid-color").mouseleave(function(){
		$("#highlighted").css("background-color", "transparent");
	});
}

// Reset Button
$("#clear-grid").click(function(){	
  	$(".grid-square").remove();
  	gridStart();
});

// Resize Button
$("#resize").click(function(){
	$(".grid-square").remove();
 	gridSize = parseInt(prompt("Choose a pixel density. e.g 100 = 100x100 pixels dense. Go too high and the script may stop running!", "100"));
 	squareSize = 800/gridSize;
 	gridStart();
});

// Grid Toggle Button
$("#borderbutton").click(function(){
	// If isBorder is true(on), we turn it off.
	if(isBorder) {
			//Toggle the grid off by changing it's border to transparent.
			$(".grid-square").css("border", "1px solid transparent");
			isBorder = false;
			$("button#borderbutton").html("Grid: Off");
	// Otherwise if border is false(off), we turn it on and put a border on all grid-squares.
	} else {
		$(".grid-square").css("border", "1px solid #4286f4");
		isBorder = true;
		$("button#borderbutton").html("Grid: On");
	}
});

// Regenerate Button
$("#regencolors").click(function(){
	$(".grid-color").remove(); // REmove all grid colors.
	swabStart(); // Repopulate the grid with colors.
});