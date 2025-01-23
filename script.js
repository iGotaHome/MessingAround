let whiteScreen = document.getElementById("white_screen");
let visual1 = document.getElementById("in");
let visual2 = document.getElementById("mid");
let visual3 = document.getElementById("out");

let currentVisual = 1;
let scrollcounter = 0;
let threshold = 10;

document.addEventListener("wheel", (e) => {
  // Prevent default scrolling behavior
  e.preventDefault();
  console.log("scrollcountA = " + scrollcounter);

  // Increment the scroll counter
  scrollcounter++;
  console.log("scrollcountB = " + scrollcounter);



  // if (scrollcounter++) {
    console.log("scrollcountC = " + scrollcounter);
    console.log("reachme 00 " + whiteScreen.style);

    // Calculate opacity based on scroll counter
    let opacityValue = Math.min(Math.floor(scrollcounter / 2) * 0.2, 1);  // Increase opacity by 0.2 every 10 scrolls, max 1
    
    // Update opacity only if it has changed
    if (parseFloat(whiteScreen.style.opacity) !== opacityValue) {
      whiteScreen.style.opacity = opacityValue;
      console.log("Updated opacity: " + whiteScreen.style.opacity);
    }
    

  // }
  // Only transition after reaching the threshold
  if (scrollcounter >= threshold) {
    // Show the white screen during the transition
    whiteScreen.style.opacity = "1";

    // Hide all visuals and reset scale
    visual1.style.transform = "translate(-50%, -50%) scale(0)";
    visual2.style.transform = "translate(-50%, -50%) scale(0)";
    visual3.style.transform = "translate(-50%, -50%) scale(0)";

    visual1.style.opacity = "0";
    visual2.style.opacity = "0";
    visual3.style.opacity = "0";

    setTimeout(() => {
      // Set the visuals for the current transition
      if (currentVisual === 1) {
        visual1.style.opacity = "1";
        visual1.style.transform = "translate(-50%, -50%) scale(1)";
      } else if (currentVisual === 2) {
        visual2.style.opacity = "1";
        visual2.style.transform = "translate(-50%, -50%) scale(1)";
      } else if (currentVisual === 3) {
        visual3.style.opacity = "1";
        visual3.style.transform = "translate(-50%, -50%) scale(1)";
      }

      // Fade out the white screen after transition
      setTimeout(() => {
        whiteScreen.style.opacity = "0";
      }, 500); // Matches the white screen fade duration

    }, 500); // Time to let the shrinking animation complete

    // Reset the scroll counter
    scrollcounter = 0;

    // Move to the next visual
    if (e.deltaY > 0) {
      // Scroll down, move to next visual
      currentVisual = (currentVisual % 3) + 1;
    } else {
      // Scroll up, move to previous visual
      currentVisual = (currentVisual - 1) || 3;
    }
  }
}, { passive: false }); // Explicitly set passive to false