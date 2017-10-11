
(function() {
  "use strict";

  // Get elements
  var el = function(element) {
    if (element.charAt(0) === "#") {
      return document.querySelector(element);
      console.log(element);
    }

    return document.querySelectorAll(element);
  };

  // Variables
  var viewer = el("#viewer"),
    equals = el("#equals"),
    nums = el(".num"),
    ops = el(".ops"),
    theNum = "",
    oldNum = "",
    resultNum,
    operator;

  // Number is clicked. Get the current number selected
  var setNum = function() {
    if (resultNum) {
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum;

  };

  // Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "");
  };

  // Equals is clicked. Calculate result
  var displayNum = function() {

    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        resultNum = "0";
      } else {
        resultNum = "Look at what you've done";
        el('#calculator').classList.add("broken");

      }
    }

    // Display result
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;

  };

  // Clear button is pressed.
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearAll;

}());
