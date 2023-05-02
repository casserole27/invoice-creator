/*
Author: Cassie Lewis
https://clewisdev.com
Date: April 2023
*/

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/****** VARIABLES ******/

let taskArray = [];

const taskUl = document.getElementById('task-list');
const priceUl = document.getElementById('price-list');
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
    return taskFeed;
}

function renderPriceList(arr) {
    let priceFeed = "";
    arr.forEach(function(task) {
        priceFeed += `
        <li>$${task.price}</li>`
    });
    return priceFeed;
};


function renderTotalPrice(arr) {
    let total = 0;
    arr.forEach(function(amount) {
        total += parseInt(amount.price);
    });
    return `$${total}`;
};


function removeItems(postId) {
    const index = taskArray.findIndex(function(task) {
        return task.uuid === postId;
    });
    taskArray.splice(index, 1);
    render()
};

function handleFormSubmit(e) {
    e.preventDefault(); //Prevent form submission from rendering lists
    render();
    taskInput.value = "";
    priceSelect.value = "";
};


function render () {
    renderTasksArray(taskArray);
    taskUl.innerHTML = renderTasksList(taskArray)
    priceUl.innerHTML = renderPriceList(taskArray)
    totalAmt.innerText = renderTotalPrice(taskArray)
};


function reset (e) {
    e.preventDefault(); //Form does not have an action / does not have submit
    taskArray = [];
    render()
    totalAmt.innerText = `$0`;
};

/****** EVENT LISTENERS ******/

document.getElementById('invoice-form').addEventListener("submit", handleFormSubmit);

taskUl.addEventListener("click", function(e) {
    const removeTarget = e.target.dataset.remove;
    removeItems(removeTarget);
});

document.getElementById('send-btn').addEventListener("click", reset)