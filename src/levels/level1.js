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
// Select the command box
var cmdBox = document.getElementById("draggable-cmd");

// Variables to track mouse position
var startOffset, endOffset;

// Event listener for mouse down on the command box
cmdBox.addEventListener("mousedown", startHighlight);

// Event listener for mouse up on the command box
cmdBox.addEventListener("mouseup", endHighlight);

// Event listener for mouse move on the command box
cmdBox.addEventListener("mousemove", continueHighlight);

// Function to start text highlighting
function startHighlight(e) {
    startOffset = getOffset(e);
}

// Function to continue text highlighting
function continueHighlight(e) {
    if (startOffset !== undefined) {
        endOffset = getOffset(e);
        updateSelection(startOffset, endOffset);
    }
}

// Function to end text highlighting
function endHighlight(e) {
    endOffset = getOffset(e);
    updateSelection(startOffset, endOffset);
    startOffset = undefined;
}

// Function to get the offset of the mouse click within the command box
function getOffset(e) {
    var range = document.createRange();
    range.selectNodeContents(cmdBox);
    var currentOffset = range.startOffset;
    var node = document.elementFromPoint(e.clientX, e.clientY);
    if (node === cmdBox) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            currentOffset = sel.getRangeAt(0).startOffset;
        }
    }
    return currentOffset;
}

// Function to update the selection range and apply styling to the selected text
function updateSelection(start, end) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.setStart(cmdBox.firstChild, Math.min(start, end));
    range.setEnd(cmdBox.firstChild, Math.max(start, end));
    selection.removeAllRanges();
    selection.addRange(range);
}
//CMD TEXT HIGHLIGHT ENDS HERE

// Function to execute user commands
function executeCommand(event) {
  if (event.key === "Enter") {
    const commandInput = document.getElementById("user-command");
    const userInput = commandInput.value.trim(); // Remove leading/trailing spaces
    const outputContainer = document.getElementById("output-container");

    // Create a new output container for the command
    const newOutputContainer = document.createElement("div");
    newOutputContainer.className = "command-output-container";

    // Create a new output div for the command
    const newOutput = document.createElement("div");
    newOutput.className = "command-output";
    const maindirectory = "C:\\Windows\\System32> ";
    // const userChangePass1 = `Type a password for the user:<pre> <input class="cmd-input" type="password" size="75" autofocus id="user-command" ></pre>`;
    // const userChangePass2 = `Retype the password to confirm:<pre> <input class="cmd-input" type="password" size="75" autofocus id="user-command" onkeydown="executeCommand(event)"></pre>`;
    // All Powershell Commands stated here

    var dir = `
<pre>
Volume in drive C has no label.
Volume Serial Number is ECC2-795E

Directory of C:\Users\Hacker123\Desktop

04/27/2020  06:03 PM    DIR          .
04/27/2020  06:03 PM    DIR          ..
04/30/2020  12:03 AM    DIR          ZHackers.exe
04/28/2020  04:22 AM    DIR          Message.exe
</pre>
   `;

    var attrib = `
<pre>
A                    C:\Users\Hacker123\Desktop\ZHackers.exe
A                    C:\Users\Hacker123\Desktop\Message.exe
A                    C:\Users\Hacker123\Desktop\Soft.rar
</pre>
   `;

    var attrib1 = `
<pre>
A                    C:\Users\Hacker123\Desktop\ZHackers.exe
A                    C:\Users\Hacker123\Desktop\Message.exe
A                    C:\Users\Hacker123\Desktop\Soft.rar
</pre>
   `;

    var net = `
<pre>
The syntax of this command is:<br><br>

NET<br>
    [ ACCOUNTS | COMPUTER | CONFIG | CONTINUE | FILE | GROUP | HELP |<br>
      HELPMSG | LOCALGROUP | PAUSE | SESSION | SHARE | START |<br>
      STATISTICS | STOP | TIME | USE | USER | VIEW ]
</pre>
   `;

    var netUser = `
<pre>
User accounts for \\DESKTOP-127001

---------------------------------------------------------<br>
Administrator               DefaultAccount<br>
Guest                       Hacker123<br>
The command completed successfully.
</pre>
   `;

    var netUserPass = `
<pre>
Type a password for the user:
Retype the password to confirm:

System error 5 has occurred.
Access is denied.
</pre>
   `;

    var netUserEmptyPass = `
<pre>
System error 5 has occurred.

Access is denied.
</pre>
   `;

    var netUserNewPass = `
<pre>
Password for Hacker123 is: JNqey_4_eTrAyPMUKI2w7r1jRPwB3NIj4JBwIwg46o4

command completed successfully.
</pre>
   `;

    var userContent = `
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
   `;
    // All Powershell Commands started here
    if (userInput === "") {
      // If the user input is empty, just add a new empty line
      newOutput.innerHTML = maindirectory;
    } else if (userInput.toLowerCase() === "ipconfig") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML =
        maindirectory +
        userInput +
        "<br>" +
        "IP Configuration for your system...";
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "net") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>" + net;
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "dir") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>" + dir;
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>" + attrib;
      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +s +r +h soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +r +s +h soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +h +r +s soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +r +h +s soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +h +s +r soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib +s +h +r soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "none";
      document.querySelector(".wd").style.display = "none";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib -s -r -h soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "flex";
      document.querySelector(".wd").style.display = "flex";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib -h -r -s soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "flex";
      document.querySelector(".wd").style.display = "flex";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib -r -h -s oft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "flex";
      document.querySelector(".wd").style.display = "flex";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib -s -h -r soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "flex";
      document.querySelector(".wd").style.display = "flex";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "attrib -h -s -r soft.rar") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>";
      document.querySelector(".rar").style.display = "flex";
      document.querySelector(".wd").style.display = "flex";

      // You can add more details here if needed
    } else if (userInput.toLowerCase() === "net user hacker123") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>" + userContent;
    } else if (userInput.toLowerCase() === "net user hacker123 *") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>" + netUserPass;
    } else if (userInput.toLowerCase() === "net user hacker123 /random") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>" + netUserNewPass;
    } else if (userInput.toLowerCase() === 'net user hacker123 ""') {
      // Implement the 'ipconfig' command
      newOutput.innerHTML =
        maindirectory + userInput + "<br>" + netUserEmptyPass;
    } else if (userInput.toLowerCase() === "net user") {
      // Implement the 'ipconfig' command
      newOutput.innerHTML = maindirectory + userInput + "<br>" + netUser;
      // You can add more details here if needed
    } else if (
      userInput.toLowerCase() === "ls" ||
      userInput.toLowerCase() === "dir"
    ) {
      // Implement 'ls' or 'dir' command (list files in a directory)
      // For simplicity, let's assume you're listing some example files
      const fileList = ["file1.txt", "file2.txt", "folder1", "folder2"];
      newOutput.innerHTML =
        maindirectory + userInput + "<br>" + fileList.join("\n");
    } else {
      // Command not recognized
      //newOutput.textContent
      newOutput.innerHTML =
        maindirectory +
        userInput +
        "<br>" +
        userInput +
        " is not recognized as an internal or external command,<br>operable program or batch file.";
    }

    // Append the output to the new output container
    newOutputContainer.appendChild(newOutput);

    // Append the new output container to the main output container
    outputContainer.appendChild(newOutputContainer);

    // Clear the input field
    commandInput.value = "";

    // Automatically scroll to the bottom of the .draggable-cmd div
    const draggableCmd = document.getElementById("draggable-cmd");
    draggableCmd.scrollTop = draggableCmd.scrollHeight;

    // Move the input field to the bottom of the output
    // outputContainer.appendChild(commandInput);

    // Autofocus on the input field for the next command
    commandInput.focus();
  }
}

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
