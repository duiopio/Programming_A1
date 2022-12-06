/*
 * Assignment 1: Paired Modelling
 * ------------------------------
 * Programming 2022, Interaction Design Bacherlor, Malmö University
 * 
 * This assignment is written by:
 * Name Surname
 * Name Surname
 * 
 * 
 * The template contains some sample code exemplifying the template code structure.
 * You can build on top of it, or remove the example values etc.
 * 
 * For instructions, see the Canvas assignment: https://mau.instructure.com/courses/11936/assignments/84965
 * For guidence on how to use the template, see the demo video:
 *
 */

// The state should contain all the "moving" parts of your program, values that change.
let state = Object.freeze({
    pointerEvent: { x: 0, y: 0 },
    lastPointerEvent: { x: 0, y: 0 },
});


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
    const { pointerEvent, lastPointerEvent } = state;
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
        rotate(flag);
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

    /** Determine whether the curso is moving up, right, down or left.
    * Snipped inspired by code written by Thangaraj on StackOverflow: https://stackoverflow.com/a/57069082
    */
    if (currentX < lastX && currentY == lastY) {
        // console.log("Left");
        flag.element.style.transform = "rotate(0turn)";
    } else if (currentX > lastX && currentY == lastY) {
        // console.log("Right");
        flag.element.style.transform = "rotate(0.5turn)";
    } else if (currentX == lastX && currentY < lastY) {
        // console.log("Up");
        flag.element.style.transform = "rotate(0.25turn)";
    } else if (currentX == lastX && currentY > lastY) {
        // console.log("Down");
        flag.element.style.transform = "rotate(0.75turn)";
    }

    // console.log(`currentX:${Math.round(currentX)}, lastX:${Math.round(lastX)}`);
}