// Canvas reference used throughout
// Keep fill color consistent while drawing
// Track if this is a tablet
var graffitiCanvas = null;	
var graffitiContext = null;
var graffitiFill = null;
var graffitiTouch = null;

// Called when the mouse is down on the canvas
// Chooses a random color
// Configures event listeners for drawing
function doGraffitiDown()
{
	// Random color generation
	graffitiFill = {
		red: Math.round( Math.random() * 255 ),
		green: Math.round( Math.random() * 255 ),
		blue: Math.round( Math.random() * 255 )
	};
	
	// Event listeners for drawing
	// Conditional check for tablets
	graffitiCanvas.addEventListener( graffitiTouch ? 'touchmove' : 'mousemove', doGraffitiMove );
	graffitiCanvas.addEventListener( graffitiTouch ? 'touchend' : 'mouseup', doGraffitiUp );
}

// Called when the mouse is down and moving on the canvas
// Draws a translucent circle to emulate spray paint
function doGraffitiMove( evt )
{
	var clientX = null;
	var clientY = null;
	var gradient = null;
	
	// If the device is a tablet
	if( graffitiTouch )
	{
		// Do not drag screen around
		evt.preventDefault();
		
		// Get the touch coordinates
		clientX = evt.touches[0].clientX;
		clientY = evt.touches[0].clientY;
	} else {
		// Not a tablet so grab mouse coordinates
		clientX = evt.clientX;
		clientY = evt.clientY;
	}
	
	// Radial gradient fill for the spray paint
	gradient = graffitiContext.createRadialGradient( 
		clientX, 
		clientY, 
		0, 
		clientX + 20, 
		clientY + 20, 
		40 
	);
	
	// Start with partial opacity
	// End with completely transparent				
	gradient.addColorStop( 
		0, 
		'rgba( ' + graffitiFill.red + ', ' + graffitiFill.green + ', ' + graffitiFill.blue + ', 0.5 )' 
	);
	gradient.addColorStop( 
		1, 
		'rgba( ' + graffitiFill.red + ', ' + graffitiFill.green + ', ' + graffitiFill.blue + ', 0 )' 
	);
	
	// Assign the radial gradient fill
	// Remove the stroke		
	graffitiContext.fillStyle = gradient;
	graffitiContext.strokeStyle = 'rgba( 0, 255, 0, 0 )';												
				
	// Draw a circle for the current point
	graffitiContext.beginPath();
	graffitiContext.arc( clientX, clientY, 40, 0, Math.PI * 2, true );									
	graffitiContext.stroke();
	graffitiContext.fill();	
}

// Called when the mouse is released over the canvas
// Stops drawing
function doGraffitiUp()
{
	// Conditionally watch for tablets
	graffitiCanvas.removeEventListener( graffitiTouch ? 'touchmove' : 'mousemove', doGraffitiMove );
	graffitiCanvas.removeEventListener( graffitiTouch ? 'touchend' : 'mouseup', doGraffitiUp );	
}

// Called when the window is resized
// Used to fit the canvas to the entire viewable space
function doGraffitiResize()
{
	graffitiCanvas.width = window.innerWidth;
	graffitiCanvas.height = window.innerHeight;
}