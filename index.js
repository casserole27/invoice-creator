/*
Author: Cassie Lewis
https://clewisdev.com
Date: April 2023
*/


import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/****** VARIABLES ******/

const taskArray = [];

const addBtn = document.getElementById('add-btn');

const taskInput = document.getElementById('task-input');
const priceSelect = document.getElementById('prices-select');


//TODO 
//!REMOVE BUTTON VARIABLE

//TODO 
//!SEND INVOICE BUTTON VARIABLE


/****** FUNCTIONS ******/

function renderTasksArray () {

    if (taskInput.value && priceSelect.value) {
        taskArray.push({
            name: taskInput.value,
            price: priceSelect.value,
            uuid: uuidv4()     
        })
    }
}

function renderTasksList() {
    let taskFeed = "";

    taskArray.forEach(function(task) {
        taskFeed += `
            <li>${task.name}
            <button class="remove-btn">remove</button>
            </li>`
    })

    document.getElementById('task-list').innerHTML = taskFeed
}

function renderPriceList() {
    let priceFeed = "";

    taskArray.forEach(function(task) {
        priceFeed += `
        <li>$${task.price}</li>`
    })

    document.getElementById('price-list').innerHTML = priceFeed;
}


//TODO 
//!CHARGE ONLY ONCE FOR EACH TASK (DON'T ADD DUPLICATES)

//TODO 
//!UPDATE TOTAL AMOUNT EACH TIME A TASK GETS ADDED

//TODO 
//!REMOVE BUTTON REMOVES TASKS FROM LIST AND TOTAL

//TODO 
//!SEND INVOICE BUTTON RESETS FORM AND TOTAL AMOUNT TO $0


/****** EVENT LISTENERS ******/

//TODO 
//!ADD BUTTON ADDS TASK TO ARRAY - EVENT LISTENER
addBtn.addEventListener("click", function() {
    renderTasksArray()
    renderTasksList()
    renderPriceList()
    taskInput.value = ""
    priceSelect.value = ""
})

//TODO 
//!REMOVE BUTTON REMOVES TASKS FROM LISTS AND TOTAL - EVENT LISTENER

//TODO
//!SEND INVOICE BUTTON RESETS - EVENT LISTENER