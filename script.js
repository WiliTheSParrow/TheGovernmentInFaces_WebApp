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

var headerSeniority = document.createElement("TH");
headerSeniority.innerHTML = "Seniority";
row.appendChild(headerSeniority);
table.appendChild(row);

var headerPercentage = document.createElement("TH");
headerPercentage.innerHTML = "Percentage of Votes";
row.appendChild(headerPercentage);
table.appendChild(row);

for (i = 0; i < 10; i++) {
    var row = document.createElement("TR");
    row.setAttribute("border", "1");
    
    var names = document.createElement("TD");
    var party = document.createElement("TD");
    var state = document.createElement("TD");
    var seniority = document.createElement("TD");
    var percentage = document.createElement("TD");
    
    names.innerHTML="ulj";
    party.innerHTML="le";
    state.innerHTML="mellem";
    seniority.innerHTML="valamit";
    percentage.innerHTML="mondok";
    
    row.appendChild(names);
    row.appendChild(party);
    row.appendChild(state);
    row.appendChild(seniority);
    row.appendChild(percentage);
    table.appendChild(row);
};
