var members = data.results[0].members;

//GENERATING THE TABLE FROM DATA:

//Checkbox event listener___________________________________________
if (location.pathname == "/senate-data.html" ||
    location.pathname == "/house-data.html") {


    var states = document.getElementById("states");
    var checkboxD = document.getElementById("d_checkbox");
    var checkboxR = document.getElementById("r_checkbox");
    var checkboxI = document.getElementById("i_checkbox");

    //Event listener
    states.addEventListener("click", checkedData);
    checkboxD.addEventListener("click", checkedData);
    checkboxR.addEventListener("click", checkedData);
    checkboxI.addEventListener("click", checkedData);

    checkedData();

}

//Filtering data regarding checkboxes & dropdown menu_______________
function checkedData() {
    var checkedDataArray = [];

    for (var i = 0; i < members.length; i++) {
        if (states.value == members[i].state || states.value == "All") {
            if (checkboxD.checked === true && members[i].party == "D") {
                checkedDataArray.push(members[i]);
            }
            if (checkboxR.checked === true && members[i].party == "R") {
                checkedDataArray.push(members[i]);
            }
            if (checkboxI.checked === true && members[i].party == "I") {
                checkedDataArray.push(members[i]);
            }
            if (checkboxD.checked === false && checkboxR.checked === false && checkboxI.checked === false) {
                checkedDataArray.push(members[i]);
            }
        }
    }
    if (checkedDataArray == "") {
        noMatch();
    } else {
        makeTableData(checkedDataArray);
    }
}

function noMatch() {
    var table = document.getElementById("table-data");
    table.innerHTML = "No matches found.";
}

//Makin the table___________________________________________________
function makeTableData(checkedDataArray) {

    // Where the table takes place in the HTML:
    var table = document.getElementById("table-data");
    table.innerHTML = "";

    //Header:
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

    //Where the magic happens:
    for (i = 0; i < checkedDataArray.length; i++) {
        //Names
        var row = document.createElement("TR");
        row.setAttribute("border", "1");
        var names = document.createElement("TD");

        if (checkedDataArray[i].middle_name === null) {
            names.innerHTML = (checkedDataArray[i].first_name + " " + checkedDataArray[i].last_name).link(checkedDataArray[i].url);
        } else {
            names.innerHTML = (checkedDataArray[i].first_name + " " + checkedDataArray[i].middle_name + " " + checkedDataArray[i].last_name).link(checkedDataArray[i].url);
        };
        names.setAttribute("class", "tablenames");
        row.appendChild(names);
        table.appendChild(row);

        //Parties
        var parties = document.createElement("TD");
        parties.innerHTML = checkedDataArray[i].party;
        parties.setAttribute("class", "tableparties");
        row.appendChild(parties);
        table.appendChild(row);

        //State
        var states = document.createElement("TD");
        states.innerHTML = checkedDataArray[i].state;
        states.setAttribute("class", "tablestates");
        row.appendChild(states);
        table.appendChild(row);

        //Seniority
        var seniorities = document.createElement("TD");
        seniorities.innerHTML = checkedDataArray[i].seniority;
        seniorities.setAttribute("class", "tablesseniorities");
        row.appendChild(seniorities);
        table.appendChild(row);

        //Vote percentage
        var percentages = document.createElement("TD");
        percentages.innerHTML = checkedDataArray[i].votes_with_party_pct;
        percentages.setAttribute("class", "tablesseniorities");
        row.appendChild(percentages);
        table.appendChild(row);

    }
}

// DATA STATISTICS:

if (location.pathname == "/senate_attendance.html" ||
    location.pathname == "/senate_loyalty.html") {

    var statistics = {
        "totalOfParties": 0,
        "numberOfDemocrats": 0,
        "numberOfRepublicants": 0,
        "numberOfIndependents": 0,
        "bottomLoyalty": 0,
        "topLoyalty": 0,
        "bottomAttendance": 0,
        "topAttendance": 0
    };

    dataStatistics();
}


function dataStatistics() {
    var noParties = [];
    var noDemocrats = [];
    var noRepublicans = [];
    var noIndependent = [];

    for (var i = 0; i < members.length; i++) {

        noParties.push(members[i]);
        if (members[i].party == "D") {
            noDemocrats.push(members[i]);
        }
        if (members[i].party == "R") {
            noRepublicans.push(members[i]);
        }
        if (members[i].party == "I") {
            noIndependent.push(members[i]);
        }
    }

    var totalOfParties = statistics.totalOfParties = noParties.length;
    var numberOfDemocrats = statistics.numberOfDemocrats = noDemocrats.length;
    var numberOfRepublicans = statistics.numberOfRepublicants = noRepublicans.length;
    var numberOfIndependents = statistics.numberOfIndependents = noIndependent.length;

    console.log("From script:")
    console.log(totalOfParties);
    console.log(numberOfDemocrats);
    console.log(numberOfRepublicans);
    console.log(numberOfIndependents);

}
