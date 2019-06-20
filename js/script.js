var app = new Vue({
    el: '#app',

    data: {
        members: [],
        checkedDataArray: [],
        noParties: [],
        noDemocrats: [],
        noRepublicans: [],
        noIndependent: [],
        membersVotesLeastParty: [],
        membersVotesMostParty: [],
        membersMissedVotesPercDesc: [],
        membersMissedVotesPercAsc: [],
        bottomLoyalty: [],
        topLoyalty: [],
        bottomAttendance: [],
        topAttendance: [],
        urlsh: "",
        isTableFull: true,
        states: {
            "AL": "Alabama",
            "AK": "Alaska",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "DC": "District Of Columbia",
            "FL": "Florida",
            "GA": "Georgia",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PA": "Pennsylvania",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming"
        }
    },

    created: function () {
        if (
            location.pathname == "/senate-data.html" ||
            location.pathname == "/senate_attendance.html" ||
            location.pathname == "/senate_loyalty.html"
        ) {
            this.urlsh = "senate";
        } else if (
            location.pathname == "/house-data.html" ||
            location.pathname == "/house_attendance.html" ||
            location.pathname == "/house_loyalty.html"
        ) {
            this.urlsh = "house";
        };

        this.getData();
    },

    methods: {
        getData: function () {
            fetch("https://api.propublica.org/congress/v1/113/" + this.urlsh + "/members.json", {
                    method: "GET",
                    headers: new Headers({
                        "X-API-Key": '4nXBqNQbaectboHwhphpVBldHZGmdNLph0DjOSjj'
                    })
                }).then(function (response) {
                    if (response.ok)
                        return response.json();
                }).then(function (json) {
                    var data = json;
                    app.members = data.results[0].members;
                    app.checkedDataArray = app.members;
                    app.countParties();
                    app.sortMembers();
                    app.leastMostVotes();
                })
                .catch(function (error) {
                    console.log(error);
                })
        },

        checkedData: function () {
            app.checkedDataArray = [];
            if (location.pathname == "/senate-data.html" ||
                location.pathname == "/house-data.html") {
                states = document.getElementById("states");
                checkboxD = document.getElementById("d_checkbox");
                checkboxR = document.getElementById("r_checkbox");
                checkboxI = document.getElementById("i_checkbox");
            };
            for (var i = 0; i < app.members.length; i++) {
                if (states.value == app.members[i].state || states.value == "All") {
                    if (checkboxD.checked === true && app.members[i].party == "D") {
                        app.checkedDataArray.push(app.members[i]);
                    }
                    if (checkboxR.checked === true && app.members[i].party == "R") {
                        app.checkedDataArray.push(app.members[i]);
                    }
                    if (checkboxI.checked === true && app.members[i].party == "I") {
                        app.checkedDataArray.push(app.members[i]);
                    }
                }
            }
            if (app.checkedDataArray == "") {

                app.isTableFull = false;
            } else {
                app.isTableFull = true;
            }
        },

        countParties: function () {
            if (location.pathname != "/senate-data.html" &&
                location.pathname != "/house-data.html" &&
                location.pathname != "/home.html") {
                //Counting the number of all parties, democrats, republicans and independents_____
                for (var i = 0; i < this.members.length; i++) {
                    this.noParties.push(this.members[i]);
                    if (this.members[i].party == "D") {
                        this.noDemocrats.push(this.members[i]);
                    }
                    if (this.members[i].party == "R") {
                        this.noRepublicans.push(this.members[i]);
                    }
                    if (this.members[i].party == "I") {
                        this.noIndependent.push(this.members[i]);
                    }
                }
            }
        },

        totalPercent: function (party) {
            var result = 0;
            if (party.length > 0) {
                for (var i = 0; i < party.length; i++) {
                    result = result + parseFloat(party[i].votes_with_party_pct);
                }
            } else return 0;
            result /= party.length;
            return result;
        },

        sortMembers: function () {
            //Loyalty:
            this.membersVotesLeastParty = [...this.members].sort(function (a, b) {
                return a.votes_with_party_pct - b.votes_with_party_pct
            });
            this.membersVotesMostParty = [...this.members].sort(function (a, b) {
                return b.votes_with_party_pct - a.votes_with_party_pct
            });
            //Attendance:
            this.membersMissedVotesPercDesc = [...this.members].sort(function (a, b) {
                return b.missed_votes_pct - a.missed_votes_pct
            });
            this.membersMissedVotesPercAsc = [...this.members].sort(function (a, b) {
                return a.missed_votes_pct - b.missed_votes_pct
            })
        },

        tenPerceentLeastMost: function (array, key, sortedArray) {
            for (var i = 0; i < array.length; i++) {
                if (i < array.length / 10) {
                    sortedArray.push(array[i]);
                } else if (array[i][key] == array[i - 1][key]) {
                    sortedArray.push(array[i]);
                } else {
                    break;
                };
            };
            return sortedArray;
        },

        leastMostVotes: function () {
            if (location.pathname == "/senate_attendance.html" ||
                location.pathname == "/house_attendance.html") {
                app.tenPerceentLeastMost(app.membersMissedVotesPercDesc, "missed_votes_pct", app.bottomAttendance);
                app.tenPerceentLeastMost(app.membersMissedVotesPercAsc, "missed_votes_pct", app.topAttendance);
            };

            if (location.pathname == "/senate_loyalty.html" ||
                location.pathname == "/house_loyalty.html") {
                app.tenPerceentLeastMost(app.membersVotesLeastParty, "votes_with_party_pct", app.bottomLoyalty);
                app.tenPerceentLeastMost(app.membersVotesMostParty, "votes_with_party_pct", app.topLoyalty);
            };
        }
    }
    

});

//Scroll To Top Button:
$(document).ready(function () {
    
    $(window).scroll(function(){
        if($(this).scrollTop()>40){
            $('#topBtn').fadeIn();
        } else{
            $('#topBtn').fadeOut();
        }
    });
    
    $("#topBtn").click(function () {
        $('html , body').animate({
            scrollTop : 0}, 800);
    });
});