// Hacker123 PowerShell

//cmd drag fuction starts here

// Select the command box and header elements
var cmdBox = document.getElementById("draggable-cmd");
var cmdHeader = document.getElementById("cmd-header");

// Variables to track mouse position
var offsetX, offsetY;

// Boolean to check if dragging is active
var isDragging = false;

// Event listener for mouse down on the command header
cmdHeader.addEventListener("mousedown", startDrag);

// Function to start dragging
function startDrag(e) {
  e.preventDefault();
  isDragging = true;

  // Get the initial mouse position
  offsetX = e.clientX - cmdBox.offsetLeft;
  offsetY = e.clientY - cmdBox.offsetTop;

  // Change the cursor style
  document.body.style.cursor = "grabbing";

  // Add event listeners for mouse move and mouse up events
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}

// Function to perform dragging
function drag(e) {
  e.preventDefault();
  if (isDragging) {
    // Calculate the new position of the command box
    var x = e.clientX - offsetX;
    var y = e.clientY - offsetY;

    // Update the position of the command box
    cmdBox.style.left = x + "px";
    cmdBox.style.top = y + "px";
  }
}

// Function to stop dragging
function stopDrag(e) {
  e.preventDefault();
  isDragging = false;

  // Change the cursor style back to default
  document.body.style.cursor = "auto";

  // Remove event listeners for mouse move and mouse up events
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
}
//cmd drag function ends here

//CMD TEXT HIGHLIGHT STARTS HERE
// Select the new output container
var newOutputContainer = document.getElementById("output-container");

// Variables to track mouse position
var startX, startY, endX, endY;
var isHighlighting = false;

// Event listener for mouse down on the new output container
newOutputContainer.addEventListener("mousedown", startHighlight);

// Event listener for mouse up on the new output container
newOutputContainer.addEventListener("mouseup", toggleHighlight);

// Event listener for mouse move on the new output container
newOutputContainer.addEventListener("mousemove", continueHighlight);

// Function to start text highlighting
function startHighlight(e) {
  e.stopPropagation(); // Stop event propagation
  isHighlighting = true;
  startX = e.clientX;
  startY = e.clientY;
}

// Function to continue text highlighting
function continueHighlight(e) {
  e.stopPropagation(); // Stop event propagation
  if (isHighlighting) {
    endX = e.clientX;
    endY = e.clientY;
    updateSelection(startX, startY, endX, endY);
  }
}

// Function to end or toggle text highlighting
function toggleHighlight(e) {
  e.stopPropagation(); // Stop event propagation
  isHighlighting = !isHighlighting;
}

// Function to update the selection range and apply styling to the selected text
function updateSelection(x1, y1, x2, y2) {
  var selection = window.getSelection();
  var range = document.createRange();

  // Determine start and end points based on mouse movement direction
  var startX = Math.min(x1, x2);
  var startY = Math.min(y1, y2);
  var endX = Math.max(x1, x2);
  var endY = Math.max(y1, y2);

  // Find the elements at the start and end positions
  var startNode = document.elementFromPoint(startX, startY);
  var endNode = document.elementFromPoint(endX, endY);

  // Set the range start and end points
  range.setStart(startNode, getOffset(startNode, startX, startY));
  range.setEnd(endNode, getOffset(endNode, endX, endY));

  selection.removeAllRanges();
  selection.addRange(range);
}

// Function to get the offset of the mouse click within an element
function getOffset(node, x, y) {
  var range = document.createRange();
  range.selectNodeContents(node);
  var clientRects = range.getClientRects();

  for (var i = 0; i < clientRects.length; i++) {
    var rect = clientRects[i];
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return i;
    }
  }

  return 0;
}

//CMD TEXT HIGHLIGHT ENDS HERE

//CMD TO STORE COMMAND HISTORY STARTS HERE
// Store user inputs
let commandHistory = [];
let currentIndex = -1;

// Function to execute command
function executeCommand(event) {
  const commandInput = document.getElementById("user-command");
  const userInput = commandInput.value.trim(); // Remove leading/trailing spaces
  const outputContainer = document.getElementById("output-container");

  if (event.key === "Enter") {
    // Execute command and add to output
    const newOutputContainer = document.createElement("div");
    newOutputContainer.className = "command-output-container";
    const newOutput = document.createElement("div");
    newOutput.className = "command-output";
    const maindirectory = "C:\\Windows\\System32> ";

    // Handle special commands
    if (userInput === "") {
      newOutput.innerHTML = maindirectory;
    } else {
      handleCommand(userInput, newOutput, maindirectory);
    }

    // Append the output to the new output container
    newOutputContainer.appendChild(newOutput);
    // Append the new output container to the main output container
    outputContainer.appendChild(newOutputContainer);

    // Add command to history
    commandHistory.unshift(userInput);
    currentIndex = -1;

    // Clear input field
    commandInput.value = "";
  } else if (event.key === "ArrowUp") {
    // Navigate command history - move to previous command
    currentIndex = Math.min(currentIndex + 1, commandHistory.length - 1);
    commandInput.value = commandHistory[currentIndex] || "";
  } else if (event.key === "ArrowDown") {
    // Navigate command history - move to next command
    currentIndex = Math.max(currentIndex - 1, -1);
    commandInput.value = commandHistory[currentIndex] || "";
  }
}
//CMD TO STORE COMMAND HISORY ENDS HERE
//CLEAR THE TERMINAL
// Event listener for keydown event
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 76 && event.ctrlKey) {
        clearTerminal();
    }
});

// Function to clear the terminal
function clearTerminal() {
    const outputContainer = document.getElementById("output-container");
    // Clear the content of the output container
    outputContainer.innerHTML = "";
    // Reset command history and index
    commandHistory = [];
    currentIndex = -1;
}


// Event listener for input field
document
  .getElementById("user-command")
  .addEventListener("keydown", executeCommand);

// Function to handle user commands
const commands = {
  ipconfig: "IP Configuration for your system...",
  net: `
        <pre>
The syntax of this command is:<br><br>

NET<br>
    [ ACCOUNTS | COMPUTER | CONFIG | CONTINUE | FILE | GROUP | HELP |<br>
      HELPMSG | LOCALGROUP | PAUSE | SESSION | SHARE | START |<br>
      STATISTICS | STOP | TIME | USE | USER | VIEW ]
</pre>
       `,
  dir: `
        <pre>
Volume in drive C has no label.
Volume Serial Number is ECC2-795E

Directory of C:\\Users\\Hacker123\\Desktop

04/27/2020  06:03 PM    DIR          .
04/27/2020  06:03 PM    DIR          ..
04/30/2020  12:03 AM    DIR          ZHackers.exe
04/28/2020  04:22 AM    DIR          Message.exe
</pre>
       `,
  attrib: `
<pre>
A                    C:\\Users\\Hacker123\\Desktop\\ZHackers.exe
A                    C:\\Users\\Hacker123\\Desktop\\Message.exe
A                    C:\\Users\\Hacker123\\Desktop\\Soft.rar
</pre>
   `,
  "net user": `
<pre>
User accounts for \\DESKTOP-127001

---------------------------------------------------------<br>
Administrator               DefaultAccount<br>
Guest                       Hacker123<br>
The command completed successfully.
</pre>
   `,
  netUserPass: `
<pre>
Type a password for the user:
Retype the password to confirm:

System error 5 has occurred.
Access is denied.
</pre>
   `,
  netUserEmptyPass: `
<pre>
System error 5 has occurred.

Access is denied.
</pre>
   `,
  netUserNewPass: `
<pre>
Password for Hacker123 is: JNqey_4_eTrAyPMUKI2w7r1jRPwB3NIj4JBwIwg46o4

command completed successfully.
</pre>
   `,
  userContent: `
<pre>
User name                    Hacker123
Full Name
Comment
User's comment
Country/region code          000 (System Default)
Account active               Yes
Account expires              Never

Password last set            12/2/2019 9:57:40 PM
Password expires             Never
Password changeable          12/2/2019 9:57:40 PM
Password required            No
User may change password     Yes

Workstations allowed         All
Logon script
User profile
Home directory
Last logon                   12/5/2019 8:06:17 PM

Logon hours allowed          All

Local Group Memberships      *Administrators
Global Group memberships     *None
The command completed successfully.
</pre>
   `,
  // Add more commands here...
};

// Function to handle commands
function handleCommand(userInput, newOutput, maindirectory) {
  // Handle special commands
  if (userInput === "") {
    // If the user input is empty, just add a new empty line
    newOutput.innerHTML = maindirectory;
  } else {
    // Check if the command exists in the commands object
    const commandOutput = commands[userInput.toLowerCase()];
    if (commandOutput) {
      newOutput.innerHTML = maindirectory + userInput + "<br>" + commandOutput;
    } else if (userInput.toLowerCase() === "ipconfig") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML =
        maindirectory +
        userInput +
        "<br>" +
        "IP Configuration for your system...";
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "net") {
      // Implement the 'net' command
      newOutput.innerHTML =
        maindirectory + userInput + "<br>" + commands["net"];
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "dir") {
      // Implement the 'dir' command
      newOutput.innerHTML =
        maindirectory + userInput + "<br>" + commands["dir"];
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib") {
      // Implement the 'attrib' command
      newOutput.innerHTML =
        maindirectory + userInput + "<br>" + commands["attrib"];
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +s +r +h soft.rar") {
      // Implement the 'attrib +s +r +h soft.rar' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +r +s +h soft.rar") {
      // Implement the 'attrib +r +s +h soft.rar' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";
      // You can add more details here if needed
    } else {
      // Command not recognized
      newOutput.innerHTML =
        maindirectory +
        userInput +
        "<br>" +
        userInput +
        " is not recognized as an internal or external command,<br>operable program or batch file.";
    }
  }
}
//CMD COMMANDS ENDS HERE

// JavaScript code to show the context menu when the right mouse button is clicked
const contextMenu = document.getElementById("context-menu");

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  contextMenu.style.display = "block";
  contextMenu.style.left = event.clientX + "px";
  contextMenu.style.top = event.clientY + "px";
});

document.addEventListener("click", function () {
  contextMenu.style.display = "none";
});

/*This code here is for the loading  Gif image */
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});

/*javascript Desktop Event*/

/*Main notification*/
function notify(type, message) {
  (() => {
    let n = document.createElement("div");
    let id = Math.random().toString(36).substr(2, 10);
    n.setAttribute("id", id);
    n.classList.add("notification", type);
    n.innerText = message;
    document.getElementById("notification-area").appendChild(n);
    setTimeout(() => {
      var notifications = document
        .getElementById("notification-area")
        .getElementsByClassName("notification");
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].getAttribute("id") == id) {
          notifications[i].remove();
          break;
        }
      }
    }, 5000);
  })();
}

/*notification templetes*/

function notifySuccess() {
  notify("success", "This is demo success notification message");
}
function notifyError() {
  notify("error", "This is demo error notification message");
}
function notifyInfo() {
  notify(
    "info",
    "Your command is not recognized as an internal or external command at this level, Please check the message box to use the right command"
  );
}

var id;
function allowdrop(ev) {
  ev.preventDefault();
}

function dragstart(ev) {
  id = ev.target.id;
  // alert(" Col"+id);
}

function dragstart1(ev) {
  id = ev.target.id;
  // alert(" Col"+id);
}
function drop(ev) {
  ev.target.append(document.getElementById(id));
}

document.getElementById("winc").addEventListener("click", function () {
  document.querySelector(".wina").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".wina").style.display = "none";
});
document.querySelector(".close1").addEventListener("click", function () {
  document.querySelector(".level").style.display = "none";
});
document.querySelector(".close2").addEventListener("click", function () {
  document.querySelector(".note").style.display = "none";
});
document.querySelector(".lvl").addEventListener("click", function () {
  document.querySelector(".level").style.display = "none";
});
document.querySelector(".ml").addEventListener("click", function () {
  document.querySelector(".note").style.display = "flex";
  document.querySelector(".note").style.position = "absolute";
  document.querySelector(".note").style.height = "60%";
  document.querySelector(".cmd").style.height = "6%";
});
document.querySelector(".c3").addEventListener("click", function () {
  document.querySelector(".cmd").style.display = "list-item";
  document.querySelector(".cmd-input").focus();
});

document.querySelector(".bt").addEventListener("click", function () {
  document.querySelector(".cmd").style.display = "none";
});
// document.querySelector('.title').addEventListener('click',
//     function(){
//         document.querySelector('.cmd').style.height = '60%';
//         document.querySelector('.note').style.height = '6%';

//     });
document.querySelector(".note").addEventListener("click", function () {
  document.querySelector(".note").style.height = "60%";
  document.querySelector(".cmd").style.height = "6%";
});

// CMD functionality

document.getElementById("help").addEventListener("click", function () {
  document.querySelector(".wina").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".wina").style.display = "none";
});
