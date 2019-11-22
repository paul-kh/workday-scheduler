// Get current date and time
const day = new Date();
const dayWrapper = moment(day);
const currentHour = dayWrapper.hours();
const currentDay = dayWrapper.format('MM-DD-YYYY');
console.log("Current Date: ", dayWrapper.format('LLLL')); // current date with long format
console.log("Current Day MM-DD-YY: ", dayWrapper.format('MM-DD-YYYY'));
console.log("Today's current hour: ", dayWrapper.hours()); // current hours
console.log("Today 11pm: ", moment(23, 'HH').format()); // today 9am

// Display current date in jumbotron
// --------------------------------------------------------------------------
document.getElementById("currentDay").innerHTML = dayWrapper.format('LLLL');
//--------------------------------------------------------------------------

// Declare variables for getting background color changed dynamically upon the current time
let hourStr = ""; // event time as string to get from innerHTML  which contain "AM" or "PM"
let hour = 0; // event time as number converted from hourStr
const hourEls = document.querySelectorAll(".hour");
const eventEls = document.querySelectorAll(".col-8");



// CHANGE BACKGROUND COLOR UPON THE CURRENT TIME
//---------------------------------------------------------------------------
// - Loop through hourELs and eventEls
for (let i = 0; i < hourEls.length; i++) {
    hourStr = hourEls[i].innerHTML;
    // if hourStr is 3 characters and if the last 2 character is "AM",
    // then take the first character, convert to number, and assign to 'hour'
    if (hourStr.length === 3 && hourStr.substring(1, 3) === "AM") {
        hourStr = hourStr.substring(0, 1);
        hour = parseInt(hourStr);
        // console.log(hour);
    }
    // if hourStr is 3 characters and if the last 2 character is "PM",
    // then take the first character, convert to number, add 12 to be 24hrs based, and assign to 'hour'
    if (hourStr.length === 3 && hourStr.substring(1, 3) === "PM") {
        hourStr = hourStr.substring(0, 1);
        hour = parseInt(hourStr) + 12;
        // console.log(hour);
    }
    // if hourStr is 4 characters and if the last 2 character is "AM" and not "12PM",
    // then take the first 2 characters, convert to number, and assign to 'hour'
    if (hourStr.length === 4 && hourStr.substring(2, 4) === "AM" && hourStr != "12PM") {
        hourStr = hourStr.substring(0, 2);
        hour = parseInt(hourStr);
        // console.log(hour);
    }
    // if hourStr is 4 characters and if the last 2 character is "PM" and not "12PM",
    // then take the first 2 characters, convert to number, add 12 to be 24hrs based, and assign to 'hour'
    if (hourStr.length === 4 && hourStr.substring(2, 4) === "PM" && hourStr != "12PM") {
        hourStr = hourStr.substring(0, 2);
        hour = parseInt(hourStr) + 12;
        // console.log(hour);
    }
    // if hourStr is 4 characters and if the last 2 character is "PM" and is "12PM",
    // then take the first 2 characters and assign to 'hour'
    if (hourStr === "12PM") {
        hour = 12;
        // console.log(hour);
    }

    // apply background color of evenEls
    // - compare event hour and current hour 
    if (hour < currentHour) {
        eventEls[i].setAttribute("class", "col-8 p-0 past");
    } else if (hour === currentHour) {
        eventEls[i].setAttribute("class", "col-8 p-0 present");
        console.log("current hour", currentHour);
        console.log("event hour", hour);
    } else if (hour > currentHour) {
        eventEls[i].setAttribute("class", "col-8 p-0 future");
    }
}

// Save to localstorage
// --------------------------------------------------------------------
// - Add click event to all Save buttons
// - Save the array to LocalStorage
// *** RETRIEVE SAVED DATA
// - Check if array exists, if not then create empty array:
// - Compary each object in the array if the key saved (date + time) === current date + time of each event hour
const saveBtnEls = document.querySelectorAll(".saveBtn");
const eventTextAreaEls = document.querySelectorAll(".event-js");
const array1 = []; // [{hour: '10AM', eventTextEl: "eventTextAreaEl", buttonEl: "btnObj" }

for (let i = 0; i < saveBtnEls.length; i++) {
    array1.push({ "hour": hourEls[i].innerHTML, "eventTextEl": eventTextAreaEls[i], "button": saveBtnEls[i] });
}
console.log(array1);
// add click to each save button
for (let i = 0; i < array1.length; i++) {
    console.log(array1[i].button);
    array1[i].button.addEventListener("click", function () {
        if (array1[i].eventTextEl.value === "") {
            alert("nothing");
        } else {
            // save to localstorage
            const dataStr = localStorage.getItem("event") || "[]";
            const eventData = JSON.parse(dataStr);
            eventData.push({ date: currentDay, time: array1[i].hour, content: array1[i].eventTextEl.value });
            localStorage.setItem("event", JSON.stringify(eventData));
            // console.log(eventData);
        }
    });
}

// Output the saved event onto the calender
const dataStr = localStorage.getItem("event") || "[]";
const data = JSON.parse(dataStr);
console.log("data: ", data);

    for (let i = 0; i < hourEls.length; i++) {
        for (j = 0; j < data.length; j++) {
            if (data[j].time === hourEls[i].innerHTML && data[j].date === currentDay) {
                eventTextAreaEls[i].value = data[j].content;
            }
        }
    }




