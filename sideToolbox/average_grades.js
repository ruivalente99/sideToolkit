import LogRocket from 'logrocket';
LogRocket.init('utcbcq/sidetoolbox');
let table = document.getElementsByClassName("table");
let aNode = table[0];
let rawGrades = [];
let grades = [];
let ucNames = [];
let credits = 0;
const { rows } = aNode;
for (let i = 1, row; (row = rows[i]); i++) {
  // Store on a array the grade, the seventh cell from the row
  if (row.cells[6].innerHTML.length != 38) {
    credits += parseFloat(row.cells[5].innerHTML);
    grades.push(
      parseFloat(row.cells[6].innerHTML) * parseFloat(row.cells[5].innerHTML)
    );
    rawGrades.push(parseFloat(row.cells[6].innerHTML));
    ucNames.push(row.cells[1].innerHTML);
  }
}
let average = grades.reduce((a, b) => a + b, 0) / credits;
average = Math.round(average * 100) / 100;
// create a card to store the info
let card = document.createElement("div");
card.className = "card";
// Add style to the card to look materialized
card.style = `
      background-color: #fff;
      border-radius: 2px;
      display: inline-block;
      height: 200px;
      position: relative;
      width: 100%;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      vertical-align: top;
      `;
// create a card body to store the info
let cardBody = document.createElement("div");
cardBody.className = "card-body";

//align body in the center
cardBody.style = `
      text-align: center;
      `;

// create a title for the card
let cardTitle = document.createElement("h5");
cardTitle.className = "card-title";
cardTitle.innerHTML = "Média e Créditos";
// create a text for the card
let cardText = document.createElement("p");
cardText.className = "card-text";
cardText.innerHTML =
  "Cadeiras feitas: " +
  grades.length +
  "<br> Créditos feitos: " +
  credits +
  "<br> Com a média: " +
  average;
// append the card body to the card
card.appendChild(cardBody);
// append the card title to the card body
cardBody.appendChild(cardTitle);
// append the card text to the card body
cardBody.appendChild(cardText);
// append the card to the table
aNode.parentNode.insertBefore(card, aNode);

// Add a link to my gitub with github icon
let gitHubLink = document.createElement("a");
gitHubLink.href = "https://github.com/ruivalente99/sideToolbox";
gitHubLink.target = "_blank";
gitHubLink.style = "margin-left: 10px;";
let gitHubIcon = document.createElement("img");
gitHubIcon.src =
  "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
gitHubIcon.style = "width: 30px; height: 30px;";
gitHubLink.appendChild(gitHubIcon);
cardBody.appendChild(gitHubLink);

// Add a tag on grey to give the author credits
let authorTag = document.createElement("p");
authorTag.style = "color: grey; font-size: 10px; margin-top: 10px;";
authorTag.innerHTML = "Created by Rui Valente";
cardBody.appendChild(authorTag);

// Add a button download the grades in a txt file
let downloadButton = document.createElement("button");
downloadButton.className = "btn btn-primary";
downloadButton.innerHTML = "Download";
downloadButton.style = "margin-top: 10px;";
downloadButton.onclick = function () {
  let text = "";
  for (let i = 0; i < rawGrades.length; i++) {
    //Remove spaces before and after the words in the ucNames
    ucNames[i] = ucNames[i].replace(/^\s+|\s+$/g, "");
    text += ucNames[i] + " - " + rawGrades[i] + "\r \n";
  }
  // Add Média and créditos feitos to the text
  text += "Cadeiras feitas: " + grades.length + "\r \n";
  text += "Créditos feitos: " + credits + "\r \n";
  text += "Média: " + average + "\r \n";

  text += " \n\nText generated by MediaNoSide extension by Rui Valente";
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", "grades.txt");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
//Append the button after the aNode
aNode.parentNode.insertBefore(downloadButton, aNode.nextSibling);

// Add a background color to the row  where the grade is not available
for (let i = 1, row; (row = rows[i]); i++) {
  if (row.cells[6].innerHTML.length == 38) {
    row.style = "background-color: #ffcccc;";
  } else {
    row.style = "background-color: #ccffcc;";
  }
}
