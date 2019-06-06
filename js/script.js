//GENERATING THE TABLE FROM DATA:
//The list of members______________________________________________
var members = data.results[0].members;
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
};
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
            };
        };
    };
    if (checkedDataArray == "") {
        noMatch();
    } else {
        makeTableData(checkedDataArray);
    };
};

function noMatch() {
    var table = document.getElementById("table-data");
    table.innerHTML = "No matches found.";
};
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

    //Where the magic happens____________________________
    for (i = 0; i < checkedDataArray.length; i++) {

        //Names__________________________________________
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

        //Parties________________________________________
        var parties = document.createElement("TD");
        parties.innerHTML = checkedDataArray[i].party;
        parties.setAttribute("class", "tableparties");
        row.appendChild(parties);
        table.appendChild(row);

        //State__________________________________________
        var states = document.createElement("TD");
        states.innerHTML = checkedDataArray[i].state;
        states.setAttribute("class", "tablestates");
        row.appendChild(states);
        table.appendChild(row);

        //Seniority______________________________________
        var seniorities = document.createElement("TD");
        seniorities.innerHTML = checkedDataArray[i].seniority;
        seniorities.setAttribute("class", "tablesseniorities");
        row.appendChild(seniorities);
        table.appendChild(row);

        //Vote percentage________________________________
        var percentages = document.createElement("TD");
        percentages.innerHTML = checkedDataArray[i].votes_with_party_pct;
        percentages.setAttribute("class", "tablesseniorities");
        row.appendChild(percentages);
        table.appendChild(row);
    };
};

// DATA STATISTICS:

if (location.pathname != "/senate-data.html" &&
    location.pathname != "/house-data.html" &&
    location.pathname != "/home.html") {

    var noParties = [];
    var noDemocrats = [];
    var noRepublicans = [];
    var noIndependent = [];
    var result = 0;
    var resultD = 0;
    var resultR = 0;
    var resultI = 0;

    //Counting the number of all parties, democrats, republicans and independents_____
    for (var i = 0; i < members.length; i++) {

        noParties.push(members[i]);
        result += members[i].votes_with_party_pct;

        if (members[i].party == "D") {
            noDemocrats.push(members[i]);
            resultD += members[i].votes_with_party_pct;
        }
        if (members[i].party == "R") {
            noRepublicans.push(members[i]);
            resultR += members[i].votes_with_party_pct;
        }
        if (members[i].party == "I") {
            noIndependent.push(members[i]);
            resultI += members[i].votes_with_party_pct;
        };
    };

    //Sorting the members array for vote percentage least_____________________________
    var membersVotesLeastParty = [...members].sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });
    //Sorting the members array for vote percentage most______________________________
    var membersVotesMostParty = [...members].sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });
    //Missed votes most (least engaged)________________________________________________
    var membersMissedVotesPercDesc = [...members].sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });
    //missed votes least (most engaged)________________________________________________
    var membersMissedVotesPercAsc = [...members].sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    });

    //Statistics object________________________________________________________________
    var statistics = {
        "totalOfParties": noParties.length,
        "numberOfDemocrats": noDemocrats.length,
        "numberOfRepublicans": noRepublicans.length,
        "numberOfIndependents": noIndependent.length,
        "votesWPartyD": (resultD /= noDemocrats.length).toFixed(2),
        "votesWPartyR": (resultR /= noRepublicans.length).toFixed(2),
        "votesWPartyI": (resultI /= noIndependent.length).toFixed(2),
        "totalvotedWParty": (result /= noParties.length).toFixed(2),
        "bottomLoyalty": tenPercentCalc(membersVotesLeastParty, "votes_with_party_pct"),
        "topLoyalty": tenPercentCalc(membersVotesMostParty, "votes_with_party_pct"),
        "bottomAttendance": 0,
        "topAttendance": 0
    };

    //Console log to see if it's working:

    if (location.pathname == "/senate_loyalty.html" ||
        location.pathname == "/senate_attendance.html") {
        console.log(JSON.stringify(statistics));
        console.log(tenPercentCalc(membersMissedVotesPercDesc, "votes_with_party_pct"));
        console.log(tenPercentCalc(membersMissedVotesPercAsc, "votes_with_party_pct"));
    };
};

//Calculation to get 10% percent of the members (least/most voted w party, missed voting)____
function tenPercentCalc(array, key) {
    var sortedArray = [];
    array.sort(function (a, b) {
        return a - b
    });
    for (var i = 0; i < array.length; i++) {
        if (i < array.length / 10) {
            sortedArray.push(array[i]);
        } else if (array[i][key] == array[i - 1][key]) {
            sortedArray.push(array[i]);
        } else {
            break;
        };
    };
    return sortedArray
};
