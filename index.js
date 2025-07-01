/*
Author: Cassie Lewis
https://clewisdev.com
Date: April 2023
*/

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/****** VARIABLES ******/

let taskArray = [];

const invoiceForm = document.getElementById('invoice-form');

const companyName = document.getElementById('company-name-input');
const companyNameField = document.getElementById('company-name');
const companyEmail = document.getElementById('company-email-input');
const companyEmailField = document.getElementById('company-email');
const customerName = document.getElementById('customer-name-input');
const customerNameField = document.getElementById('customer-name');
const customerEmail = document.getElementById('customer-email-input');
const customerEmailField = document.getElementById('customer-email');
const notes = document.getElementById('invoice-notes');
const notesField = document.getElementById('notes');

const taskUl = document.getElementById('task-list');
const priceUl = document.getElementById('price-list');
const taskInput = document.getElementById('task-input');
const priceInput = document.getElementById('amount-input');
const totalAmt = document.getElementById('total-amt');

console.log('company name', companyName.value);
console.log('company email', companyEmail.value);

/****** FUNCTIONS ******/

const renderInfo = () => {
 companyNameField.innerText = companyName.value;
 companyEmailField.innerText = companyEmail.value;
 customerNameField.innerText = customerName.value;
 customerEmailField.innerText = customerEmail.value;
 notesField.innerText = notes.value;
}


const renderTasksArray = e => {
  e.preventDefault(); //Prevent form submission from stopping lists from rendering

  if (taskArray.find(({ name }) => name === taskInput.value)) {
      taskInput.value = "";
      priceInput.value = "";
      taskInput.classList.add('active');
      taskInput.placeholder = "Please enter new task";
  
  } else if (!taskArray.includes(taskInput.value)) {
      
    if (taskInput.value !== '' && priceInput.value !== '') {
      taskInput.classList.remove('active');
      taskInput.placeholder = "Enter task";
            
      taskArray.push({
          name: taskInput.value,
          price: priceInput.value,
          uuid: uuidv4()     
      });

    } else {
      renderErrors();
        // taskInput.value = "";
        // priceInput.value = "";
        // taskInput.classList.add('active');
        // taskInput.placeholder = "Task required";
    };
  };
  render();
};

function convertToTitleCase(str) {
  return str
    .split('-')                       // Split the string by hyphen
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
    .join(' ');                       // Join the words with a space
}

const inputs = document.querySelectorAll('input[type=text], input[type=email], input[type=number]')
const inputPlaceholders = Array.from(inputs).map(input => input.placeholder);
const renderErrors = () => {
  inputs.forEach(input => {
    if (input.value === '') {
    document.getElementById(input.id).classList.add('active');
    document.getElementById(input.id).placeholder = `${convertToTitleCase(input.id)} required`;
    document.getElementById(input.id).addEventListener('input', () => {
      document.getElementById(input.id).classList.remove('active');
  });
    } else {
      document.getElementById(input.id).classList.remove('active');
    }
  })
}

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


const render = () => {
  renderInfo();
  taskUl.innerHTML = renderTasksList(taskArray);
  priceUl.innerHTML = renderPriceList(taskArray);
  totalAmt.innerText = renderTotalPrice(taskArray);
  invoiceForm.reset();

  
};

const reset = e => {
  e.preventDefault(); //Added because form has no action attribute / submission at this time, will prompt for entry
  taskArray = [];
  render();
  totalAmt.innerText = `$0`;
  taskInput.classList.remove('active');
  taskInput.placeholder = "Enter task";
  
  companyNameField.innerText = "";
  companyEmailField.innerText = "";
  customerNameField.innerText = "";
  customerEmailField.innerText = "";
  notesField.innerText = "";

  inputs.forEach((input, index) => {
    document.getElementById(input.id).classList.remove('active')
    document.getElementById(input.id).placeholder = inputPlaceholders[index];
});

};

/****** EVENT LISTENERS ******/

document.getElementById('add-btn').addEventListener("click", renderTasksArray);

taskUl.addEventListener("click", e => removeItems(e.target.dataset.remove));

document.getElementById('send-btn').addEventListener("click", reset);