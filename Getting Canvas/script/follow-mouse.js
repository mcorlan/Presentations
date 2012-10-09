// Called to generate a random color
// Applied to drawing
function randomColor()
{
	var red = null;
	var green = null;
	var blue = null;	
	
	// Randomly generated color
	red = Math.round( Math.random() * 255 );
	green = Math.round( Math.random() * 255 );
	blue = Math.round( Math.random() * 255 );	
	
	// Return a CSS formatted color value
	return 'rgb( ' + red + ', ' + green + ', ' + blue + ' )';		
}

// Called when the mouse is down on the canvas
// Generates a random color
// Starts tracing a new line based on mouse position
function doFollowMouseDown( evt )
{
	var red = null;
	var green = null;
	var blue = null;	
	
	// Randomly generated color
	red = Math.round( Math.random() * 255 );
	green = Math.round( Math.random() * 255 );
	blue = Math.round( Math.random() * 255 );		
	
	// Setup a new stroke
	// Begin the path
	mouseContext.strokeStyle = 'rgb( ' + red + ', ' + green + ', ' + blue + ' )';			
	mouseContext.moveTo( evt.offsetX, evt.offsetY );
	mouseContext.beginPath();
	
	// Listen for the mouse to move
	// Listen for when the mouse is released
	mouseCanvas.addEventListener( 'mousemove', doFollowMouseMove );
	mouseCanvas.addEventListener( 'mouseup', doFollowMouseUp );
}

// Called when the mouse moves while down on the canvas
function doFollowMouseMove( evt )
{
	// Draw the most recent segment of the line	
	// Based on mouse coordinates relative to canvas
	mouseContext.lineTo( evt.offsetX, evt.offsetY );		
	mouseContext.stroke();	
}

// Called when the mouse is released from the canvas
function doFollowMouseUp()
{
	// Remove event listeners
	// Allows drawing only when the mouse is down on the canvas
	mouseCanvas.removeEventListener( 'mousemove', doFollowMouseMove );
	mouseCanvas.removeEventListener( 'mouseup', doFollowMouseUp );	
}