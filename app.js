let budgetInput = document.getElementById('budget');
let setButton = document.getElementById('set-budget');
let productTitleInput = document.getElementById('product-title');
let productCostInput = document.getElementById('product-cost');
let checkAmount = document.getElementById('checkAmount');
let budgetValue = document.getElementById('budget-value');
let expenseValue = document.getElementById('expense-value');
let remainingBalance = document.getElementById('Rbalance');
let clearButton = document.getElementById('clearBtn');

let budget = 0;
let totalExpenses = 0;
let itemCount = 0;

setButton.addEventListener('click', () => {
    budget = parseInt(budgetInput.value);
    if (!isNaN(budget) && budget >= 0) {
        budgetInput.disabled = true;
        budgetValue.textContent = budget;
        remainingBalance.textContent = budget;
    } else {
        console.error('Please enter a valid number');
    }
});

checkAmount.addEventListener('click', () => {
    let title = productTitleInput.value;
    let cost = parseInt(productCostInput.value);

    if (title && !isNaN(cost) && cost >= 0) {
        totalExpenses += cost;
        expenseValue.textContent = totalExpenses;
        let remaining = budget - totalExpenses;
        remainingBalance.textContent = remaining;
        productTitleInput.value = '';
        productCostInput.value = '';
        addItem(title, cost);
    } else {
        console.error('Please enter a valid cost');
    }
});

function addItem(title, cost) {
    itemCount++;
    let addition = document.querySelector('#expense-list');
    
    let itemList = `
    <div class='itemList'>
        <span class='sNo'>${itemCount} )</span> 
        <span class='title'>${title}</span>
        <span class='cost'>${cost}</span>
        <button class='delete'><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class='abc'>
        <hr>
    </div>
    `;
    
    addition.insertAdjacentHTML('beforeend', itemList);
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete') || event.target.closest('.delete')) {
        deleteItem(event);
    }
});

function deleteItem(event) {
    let itemElement = event.target.closest('.itemList');
    let cost = parseInt(itemElement.querySelector('.cost').textContent);
    totalExpenses -= cost; 
    expenseValue.textContent = totalExpenses;
    let remaining = budget - totalExpenses; 
    remainingBalance.textContent = remaining;
    itemElement.nextElementSibling.remove();
    itemElement.remove();
    itemCount--;

    if (itemCount === 0) {
        budgetInput.disabled = false;
    }
}

function clearAll() {
    budget = 0;
    totalExpenses = 0;
    itemCount = 0;
    budgetInput.disabled = false;
    budgetInput.value = '';
    budgetValue.textContent = '0';
    expenseValue.textContent = '0';
    remainingBalance.textContent = '0';
    productTitleInput.value = '';
    productCostInput.value = '';
    
    document.querySelector('#expense-list').innerHTML = '';
}

clearButton.addEventListener('click', clearAll);
