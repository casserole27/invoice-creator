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

const renderTasksArray = e => {
    
    e.preventDefault(); //Prevent form submission from stopping lists from rendering

    if (taskArray.find(({ name }) => name === taskInput.value)) {
        clearInputs()
        taskInput.classList.add('active');
        taskInput.placeholder = "Please enter new task";
    
    } else if (!taskArray.includes(taskInput.value)) {
        
        if (taskInput.value !== '' && priceSelect.value !== '') {
            taskInput.classList.remove('active');
            taskInput.placeholder = "Enter task";
                  
            taskArray.push({
                name: taskInput.value,
                price: priceSelect.value,
                uuid: uuidv4()     
            });

        } else {
            clearInputs();
            taskInput.classList.add('active');
            taskInput.placeholder = "Enter task and select price";
        };
    };
    render();
};

const renderTasksList = arr => {
    let taskFeed = "";
    arr.forEach(task => {
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


const renderPriceList = arr => {
    let priceFeed = "";
    arr.forEach(task => priceFeed += `<li>$${task.price}</li>`);
    return priceFeed;
};


const renderTotalPrice = arr => {
    let total = 0;
    arr.forEach(amount => total += parseInt(amount.price));
    return `$${total}`;
};


const removeItems = postId => {
    const index = taskArray.findIndex(task => task.uuid === postId);
    taskArray.splice(index, 1);
    render();
};


const clearInputs = () => {
    taskInput.value = "";
    priceSelect.value = "";
};


const render = () => {
    taskUl.innerHTML = renderTasksList(taskArray);
    priceUl.innerHTML = renderPriceList(taskArray);
    totalAmt.innerText = renderTotalPrice(taskArray);
    clearInputs();
};

const reset = e => {
    e.preventDefault(); //Added because form has no action attribute / submission at this time, will prompt for entry
    taskArray = [];
    render();
    totalAmt.innerText = `$0`;
    taskInput.classList.remove('active');
    taskInput.placeholder = "Enter task";
};

/****** EVENT LISTENERS ******/

document.getElementById('invoice-form').addEventListener("submit", renderTasksArray);

taskUl.addEventListener("click", e => removeItems(e.target.dataset.remove));

document.getElementById('send-btn').addEventListener("click", reset);