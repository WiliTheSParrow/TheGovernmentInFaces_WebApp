// Filter the data_____________________________________


if (location.pathname == "/senate-data.html" || location.pathname == "/house-data.html") {

    //Event listener
    var checkboxD = document.getElementById("d_checkbox");
    var checkboxR = document.getElementById("r_checkbox");
    var checkboxI = document.getElementById("i_checkbox");
    
    checkboxD.addEventListener("click", getCheckedBoxes);
    checkboxR.addEventListener("click", getCheckedBoxes);
    checkboxI.addEventListener("click", getCheckedBoxes);
    
    getCheckedBoxes();

};


// Get checked box values and put them into an array
// Pass the checkbox name to the function
function getCheckedBoxes(name="party") {
    var checkboxes = document.getElementsByName(name="party");
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i]);
        }
    }
    
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}


// Call as
var checkedBoxes = getCheckedBoxes();
// Check in console
console.log(checkedBoxes);

//Table Data____________________________________:
var table = document.getElementById("table-data")

var row = document.createElement("TR");
var headerName = document.createElement("TH");
headerName.innerHTML = "Name";
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


for (i = 0; i < data.results[0].members.length; i++) {

    //Names
    var row = document.createElement("TR");
    row.setAttribute("border", "1");
    var names = document.createElement("TD");

    if (data.results[0].members[i].middle_name === null) {
        names.innerHTML = (data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name).link(data.results[0].members[i].url);
    } else {
        names.innerHTML = (data.results[0].members[i].first_name + " " + data.results[0].members[i].middle_name + " " + data.results[0].members[i].last_name).link(data.results[0].members[i].url);
    };
    names.setAttribute("class", "tablenames");
    row.appendChild(names);
    table.appendChild(row);

    //Parties
    var parties = document.createElement("TD");
    parties.innerHTML = data.results[0].members[i].party;
    parties.setAttribute("class", "tableparties");
    row.appendChild(parties);
    table.appendChild(row);

    //State
    var states = document.createElement("TD");
    states.innerHTML = data.results[0].members[i].state;
    states.setAttribute("class", "tablestates");
    row.appendChild(states);
    table.appendChild(row);

    //Seniority
    var seniorities = document.createElement("TD");
    seniorities.innerHTML = data.results[0].members[i].seniority;
    seniorities.setAttribute("class", "tablesseniorities");
    row.appendChild(seniorities);
    table.appendChild(row);

    //Vote percentage
    var percentages = document.createElement("TD");
    percentages.innerHTML = data.results[0].members[i].votes_with_party_pct;
    percentages.setAttribute("class", "tablesseniorities");
    row.appendChild(percentages);
    table.appendChild(row);

}
