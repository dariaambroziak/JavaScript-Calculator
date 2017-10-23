
(function() {
  "use strict";

  //------GET ELEMENTS----------//
  var el = function(element) {
    if (element.charAt(0) === "#") {
      return document.querySelector(element);
      console.log(element);
    }

    return document.querySelectorAll(element);
  };

  //------VARIABLES----------//
  var viewer = el("#viewer"),
    equals = el("#equals"),
    nums = el(".num"),
    ops = el(".ops"),
    theNum = "",
    oldNum = "",
    resultNum,
    operator;

  //------NUMBER IS CLICKED. GET THE CURRENT NUMBER SELECTED----------//
  var setNum = function() {
    if (resultNum) {
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum;

  };

  //------OPERATOR IS CLICKED. PASS NUMBER TO oldNum AND SAVE OPERATOR----------//
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "");
  };

  //------EQUALS IS CLICKED. CALCULATE RESULT----------//
  var displayNum = function() {

    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    //------PERFORM OPERATION----------//
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

    //------IF NaN OR INFINITY RETURNED----------//
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        resultNum = "0";
      } else {
        resultNum = "Look at what you've done";
        el('#calculator').classList.add("broken");

      }
    }
    //------RESULT----------//
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    //------NOW RESET oldNum & KEEP RESULT----------//
    oldNum = 0;
    theNum = resultNum;

  };

  //------CLEAR BUTTON----------//
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  //------EVENT TO NUMBERS----------//
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  //------EVENT TO OPERATORS----------//
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  //------EVENT TO EQUAL SIGN----------//
  equals.onclick = displayNum;

  //------CLEAR BUTTON----------//
  el("#clear").onclick = clearAll;

}());
