 const someCheckbox = document.getElementById('darkModeCheckBox');

//  someCheckbox.addEventListener('change', e => {


//    if(e.target.checked === true) {
//      document.body.style.backgroundColor = "red";
//    }
//  if(e.target.checked === false) {
//      document.body.style.backgroundColor = "blue";
//    }


//  });

const darkMode = `/* Insira o código aqui... */
:root {
    --main-color: #1e2124;
    --hover-color: #36393e;
    --body-color: #36393e;
    --box-color: white;
    --textColor: #99aab5;
}


#content {
    background-color: #36393e;
}

.footer {
    background-color: #36393e;
    display:none;
}

#navBar {
    background-color: #1e2124;
}

#sidebar {
    background-color: #2c2f33;
}


#sidebar .list-group-item-action {
    background-color: #1e2124;
    color: var(--textColor);
    font-weight: bold;
    font-size: 16.5px;
}

#sidebar .list-group-item:active {
    background-color: #23272a;
    color: #99aab5;
    font-weight: bold;
    font-size: 16.5px;
}

#sidebar .sidebar-list-group-item-collapse {
    background-color: transparent;
    color: #99aab5;
    font-weight: bold;
    font-size: 15px;
}

.table thead th {
    color: var(--textColor);
}

td {
    color: var(--textColor);
}

.control-label {
    color: var(--textColor);
}

#Cursos {
    background-color: #23272a;

    border: 1px solid #1e2124;
    color: var(--textColor);
}

.pull-right{
     color: white;
}

.table td{
    border:none;
}`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
 function listenForToggle() {
  someCheckbox.addEventListener('change', e => {


    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function applyDarkMode(tabs) {
      
      browser.tabs.insertCSS({code: darkMode}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "darkmodeToggleOn"
        });
      });
    }

    function removeDarkMode(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
          command: "darkmodeToggleOff"
        });
    }


    function reportError(error) {
      console.error(`Could not applyDarkMode: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */

     if(e.target.checked === true) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(applyDarkMode)
        .catch(reportError);
    }
    if(e.target.checked === false) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(removeDarkMode)
      .catch(reportError);
          }
 

  });
}

function reportExecuteScriptError(error) {
  console.error(`Failed to execute darkmode_Handler.js content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/ScriptTargets/darkmode_Handler.js"})
.then(listenForToggle)
.catch(reportExecuteScriptError);



    


  
