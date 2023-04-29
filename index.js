/*
Author: Cassie Lewis
https://clewisdev.com
Date: April 2023
*/

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/****** VARIABLES ******/

let taskArray = [];

const addBtn = document.getElementById('add-btn');

const taskUl = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const priceSelect = document.getElementById('prices-select');
const totalAmt = document.getElementById('total-amt');

/****** FUNCTIONS ******/

function renderTasksArray (arr) {
    
    if (arr.find(({ name }) => name === taskInput.value)) {
        taskInput.value = ""
        priceSelect.value = ""
        taskInput.classList.toggle('active');
        taskInput.placeholder = "Please enter new task";
    
    } else if (!arr.includes(taskInput.value)) {
        
        if (taskInput.value != '') {
            taskInput.classList.remove('active');
            taskInput.placeholder = "Enter task";
            arr.push({
                name: taskInput.value,
                price: priceSelect.value,
                uuid: uuidv4()     
            });
        };
    };
};
 
function renderTasksList(arr) {
    let taskFeed = "";

    arr.forEach(function(task) {
        taskFeed += `
            <li>${task.name}
            <button 
                class="remove-btn"
                data-remove="${task.uuid}">
                remove
                </button>
            </li>`
    });

    taskUl.innerHTML = taskFeed;
}

function renderPriceList(arr) {
    let priceFeed = "";

    arr.forEach(function(task) {
        priceFeed += `
        <li>$${task.price}</li>`
    });

    document.getElementById('price-list').innerHTML = priceFeed;
}


function renderTotalPrice(arr) {
  
    let total = 0;
    arr.forEach(function(amount) {
        total += parseInt(amount.price);
    })
    
    totalAmt.innerText = `$${total}`;
}

function removeItems(postId) {
 
    const index = taskArray.findIndex(function(task) {
        return task.uuid === postId;
    });
   
    taskArray.splice(index, 1);

    renderTasksList(taskArray);
    renderTotalPrice(taskArray);

};

function reset () {
    
    taskArray = [];
    renderTasksList(taskArray);
    renderPriceList(taskArray);
    renderTotalPrice(taskArray);
    totalAmt.innerText = `$0`;

};

/****** EVENT LISTENERS ******/

addBtn.addEventListener("click", function() {
    
    renderTasksArray(taskArray);
    renderTasksList(taskArray);
    renderPriceList(taskArray);
    renderTotalPrice(taskArray);
    taskInput.value = "";
    priceSelect.value = "";

});

taskUl.addEventListener("click", function(e) {
    
    const removeTarget = e.target.dataset.remove;
    removeItems(removeTarget);

});

document.getElementById('send-btn').addEventListener("click", function () {
    
    reset();

})