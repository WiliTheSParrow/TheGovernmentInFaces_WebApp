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
        "bottomAttendance": tenPercentCalc(membersMissedVotesPercDesc, "missed_votes_pct"),
        "topAttendance": tenPercentCalc(membersMissedVotesPercAsc, "missed_votes_pct")
    };

    //Writing out the tables:
    createTableGlance();

    if (location.pathname == "/senate_attendance.html" ||
       location.pathname == "/house_attendance.html") {
        tableStatistics(statistics.bottomAttendance, "leastEngaged", "missed_votes", "missed_votes_pct");
        tableStatistics(statistics.topAttendance, "mostEngaged", "missed_votes", "missed_votes_pct");
    };

    if (location.pathname == "/senate_loyalty.html" ||
       location.pathname == "/house_loyalty.html") {
        tableStatistics(statistics.bottomLoyalty, "leastEngaged", "total_votes", "votes_with_party_pct");
        tableStatistics(statistics.topLoyalty, "mostEngaged", "total_votes", "votes_with_party_pct");
    };


};

//Calculation to get 10% percent of the members (least/most voted w party, missed voting)____
function tenPercentCalc(array, key) {
    var counter = 0;
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

//Making table for statistics______________________________________________

function tableStatistics(array, tableId, key1, key2) {
    // Where the table takes place in the HTML___________________
    var tableId = document.getElementById(tableId);
    tableId.setAttribute("border", "1");

    //Magic______________________________________________
    for (var i = 0; i < array.length; i++) {

        var row = document.createElement("TR");
        row.setAttribute("border", "1");
        //Name_____________________________________________
        var data01 = document.createElement("TD");
        if (array[i].middle_name === null) {
            data01.innerHTML = (array[i].first_name + " " + array[i].last_name).link(array[i].url);
        } else {
            data01.innerHTML = (array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name).link(array[i].url);
        }
        //Data_____________________________________________
        data01.setAttribute("class", "tablenames");
        row.appendChild(data01);
        tableId.appendChild(row);

        var data02 = document.createElement("TD");
        data02.innerHTML = array[i][key1];
        row.appendChild(data02);
        tableId.appendChild(row);

        var data03 = document.createElement("TD");
        data03.innerHTML = array[i][key2];
        row.appendChild(data03);
        tableId.appendChild(row);
    };
};

function createTableGlance() {
    // Where the table takes place in the HTML___________________
    var tableBody = document.getElementById("AtAGlance");
    tableBody.setAttribute("border", "1");

    //Republicans:
    var row1 = document.createElement("TR");
    row1.setAttribute("border", "1");
    
    var tdData1 = document.createElement("TD");
    tdData1.innerHTML = "Republicans";
    row1.appendChild(tdData1);
    tableBody.appendChild(row1);

    var tdData2 = document.createElement("TD");
    tdData2.innerHTML = statistics.numberOfRepublicans;
    row1.appendChild(tdData2);
    tableBody.appendChild(row1);

    var tdData3 = document.createElement("TD");
    tdData3.innerHTML = statistics.votesWPartyR;
    row1.appendChild(tdData3);
    tableBody.appendChild(row1);
    

    //Democrats:
    var row2 = document.createElement("TR");
    row2.setAttribute("border", "1");
    
    var tdData4 = document.createElement("TD");
    tdData4.innerHTML = "Democrats";
    row2.appendChild(tdData4);
    tableBody.appendChild(row2);

    var tdData5 = document.createElement("TD");
    tdData5.innerHTML = statistics.numberOfDemocrats;
    row2.appendChild(tdData5);
    tableBody.appendChild(row2);

    var tdData6 = document.createElement("TD");
    tdData6.innerHTML = statistics.votesWPartyD;
    row2.appendChild(tdData6);
    tableBody.appendChild(row2);

    //Independent:
    var row3 = document.createElement("TR");
    row3.setAttribute("border", "1");
    
    var tdData7 = document.createElement("TD");
    tdData7.innerHTML = "Independents";
    row3.appendChild(tdData7);
    tableBody.appendChild(row3);

    var tdData8 = document.createElement("TD");
    tdData8.innerHTML = statistics.numberOfIndependents;
    row3.appendChild(tdData8);
    tableBody.appendChild(row3);

    var tdData9 = document.createElement("TD");
    tdData9.innerHTML = statistics.votesWPartyI;
    row3.appendChild(tdData9);
    tableBody.appendChild(row3);

    //Total:
    var row4 = document.createElement("TR");
    row4.setAttribute("border", "1");
    
    var tdData10 = document.createElement("TD");
    tdData10.innerHTML = "Total";
    row4.appendChild(tdData10);
    tableBody.appendChild(row4);

    var tdData11 = document.createElement("TD");
    tdData11.innerHTML = statistics.totalOfParties;
    row4.appendChild(tdData11);
    tableBody.appendChild(row4);

    var tdData12 = document.createElement("TD");
    tdData12.innerHTML = statistics.totalvotedWParty;
    row4.appendChild(tdData12);
    tableBody.appendChild(row4);
};