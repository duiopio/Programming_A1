/*
 * Assignment 1: Paired Modelling
 * ------------------------------
 * Programming 2022, Interaction Design Bacherlor, Malmö University
 * 
 * This assignment is written by:
 * Filippo De Togni
 * David Palmberg
 * 
 * 
 * The template contains some sample code exemplifying the template code structure.
 * You can build on top of it, or remove the example values etc.
 * 
 * For instructions, see the Canvas assignment: https://mau.instructure.com/courses/11936/assignments/84965
 * For guidence on how to use the template, see the demo video: 
 */


// The state should contain all the "moving" parts of your program, values that change.
let state = Object.freeze({
    pointerEvent: { x: 0, y: 0 },
    lastPointerEvent: { x: 0, y: 0 },
});


/** This seems like a good way to fix the rotation: 
 * https://stackoverflow.com/questions/19618745/css3-rotate-transition-doesnt-take-shortest-way
 */
let rot;
function rotateThis(newRotation) {
    let apparentRotation;
    rot = rot || 0; // if rot undefined or 0, make 0, else rot
    apparentRotation = rot % 360;
    if ( apparentRotation < 0 ) { apparentRotation += 360; }
    if ( apparentRotation < 180 && (newRotation > (apparentRotation + 180)) ) { rot -= 360; }
    if ( apparentRotation >= 180 && (newRotation <= (apparentRotation - 180)) ) { rot += 360; }
    rot += (newRotation - apparentRotation);
    return rot
}


// The settings should contain all of the "fixed" parts of your programs, like static HTMLElements and paramaters.
const settings = Object.freeze({
    flag: {
        height: 200,
        width: 320,
        element: document.querySelector("#flag"),
        stripes: {
            horizontal: {
                height: 50,
                element: document.querySelector("horizontal-stripe"),
            },
        },
    },
});


/**
 * Update the state object with the properties included in `newState`.
 * @param {Object} newState An object with the properties to update in the state object.
 */
function updateState(newState) {

    // Create a constant that holds the last PointerEvent stored in the state
    const lastEvent = state.pointerEvent;

    // Overrides the state.pointerEvent with the new one and assigns the old one to state.lastPointerEvent
    state = Object.freeze({ ...newState, lastPointerEvent: lastEvent });
}


/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {
    const { pointerEvent } = state;
    const { flag } = settings;

    const verticalOffset = flag.height / 2;
    const horizontalOffset = flag.width;

    flag.element.style.left = `${pointerEvent.x}px`;
    flag.element.style.top = `${pointerEvent.y - verticalOffset}px`;

    window.requestAnimationFrame(loop);
}


/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
    const { flag } = settings;
    flag.element.style.height = `${flag.height}px`;
    flag.element.style.width = `${flag.width}px`;
    flag.element.style.margin = `0px`;

    const stripe = flag.stripes.horizontal;
    const stripeOffset = (flag.height / 2) - (stripe.height / 2);

    document.addEventListener("pointermove", function (event) {
        updateState({ pointerEvent: event });
    });

    loop();
}


setup(); // Always remember to call setup()!


/**
 * @param {Object} flag
 */
function rotate(flag) {
    /** Extract the x and y values for both the current event and the last event
    * 
    *    pointerEvent ┬─> x —> currentX
    *                 └─> y —> currentY
    * 
    *    lastPointerEvent ┬─> x —> lastX
    *                     └─> y —> lastY
    */
    const { pointerEvent: { x: currentX, y: currentY }, lastPointerEvent: { x: lastX, y: lastY } } = state;

    /** Rotate flag following the cursor direction
    * Snipped inspired by code written by OpherV on StackOverflow:
    * https://stackoverflow.com/questions/15653801/rotating-object-to-face-mouse-pointer-on-mousemove */
    const newAngle = Math.atan2(currentY - lastY, currentX - lastX);
    const rotation = newAngle - Math.PI
    const degRotation = degreesFromRadians(rotation);
    const adjustedRotation = rotateThis(degRotation);

    if (shouldRotate(currentX, lastX, currentY, lastY)) {
      flag.element.style.transform = `rotate(${adjustedRotation}deg)`;
    }
}


/**
 * We need this otherwise the rotation happens too often and it jitters.
 */
setInterval(function() {
  const { flag } = settings;
  const random = Math.floor(Math.random());
  rotate(flag);
}, 10);


/** Determines wether the coordinates are different enough to perform a rotation
 * @param {number} newX
 * @param {number} oldX
 * @param {number} newY
 * @param {number} oldY
 * @returns {Boolean}
 */
function shouldRotate(newX, oldX, newY, oldY, threshold = 10) {

  let a = Math.round(newX); // Rounded new X
  let b = Math.round(oldX); // Rounded old X
  let c = Math.round(newY); // Rounded new Y
  let d = Math.round(oldY); // Rounded old Y

  let xDifference = Math.abs( a - b );
  let yDifference = Math.abs( c - d );

  if ( xDifference < threshold && yDifference < threshold ) {
    return false;
  } else {
    return true;
  }
}


/** Converts the radians to degrees.
 * Thanks to https://www.w3resource.com/javascript-exercises/javascript-math-exercise-34.php
 * 
 * @param {number} radians 
 * @returns {number}
 */
function degreesFromRadians(radians) {
  return radians * ( 180 / Math.PI);
}

function flapFlag(lag) {
  const { flag } = settings;
  
}