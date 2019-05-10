var table = document.getElementById("table-data")
table.setAttribute("border", "1");
var row = document.createElement("TR");
var headerName = document.createElement("TH");
headerName.innerHTML = "Senator";
row.appendChild(headerName);
table.appendChild(row);

var headerParty = document.createElement("TH");
headerParty.innerHTML = "Party Affiliation";
row.appendChild(headerParty);
table.appendChild(row);

var headerState = document.createElement("TH");
headerState.innerHTML = "State";
row.appendChild(headerState);
table.appendChild(row);
