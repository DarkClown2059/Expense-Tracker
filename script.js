// Single clean script for the Expense Tracker app

// Redirect to login if not logged in
if (!localStorage.getItem('loggedIn')) {
	window.location.href = 'login.html';
}

// Elements
const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');
const listEl = document.getElementById('list');
const formEl = document.getElementById('form');
const textEl = document.getElementById('text');
const amountEl = document.getElementById('amount');
const logoutBtn = document.getElementById('logout-btn');

// Logout functionality (guard in case element is missing)
if (logoutBtn) {
	logoutBtn.addEventListener('click', () => {
		localStorage.removeItem('loggedIn');
		window.location.href = 'login.html';
	});
}

// Load transactions
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function formatINR(num) { return '₹' + Number(num).toFixed(2); }

function addTransactionDOM(transaction) {
	const sign = transaction.amount < 0 ? '-' : '+';
	const item = document.createElement('li');
	item.classList.add(transaction.amount < 0 ? 'expense-item' : 'income-item');
	item.innerHTML = `${transaction.text} <span>${sign}${formatINR(Math.abs(transaction.amount))}</span><button onclick="removeTransaction(${transaction.id})">x</button>`;
	listEl.appendChild(item);
}

function updateValues() {
	const amounts = transactions.map(t => t.amount);
	const total = amounts.reduce((acc, v) => acc + v, 0);
	const income = amounts.filter(v => v > 0).reduce((a, v) => a + v, 0);
	const expense = amounts.filter(v => v < 0).reduce((a, v) => a + v, 0) * -1;

	balanceEl.textContent = formatINR(total);
	// show +/- explicitly, remove the currency symbol from the formatted number
	moneyPlusEl.textContent = '+' + formatINR(income).replace(/₹/g, '');
	moneyMinusEl.textContent = '-' + formatINR(expense).replace(/₹/g, '');
}

function updateLocalStorage() { localStorage.setItem('transactions', JSON.stringify(transactions)); }

function removeTransaction(id) { transactions = transactions.filter(t => t.id !== id); init(); updateLocalStorage(); }

function addTransaction(e) {
	e.preventDefault();
	const text = textEl.value.trim();
	const amount = parseFloat(amountEl.value);
	if (!text || isNaN(amount)) return;
	const transaction = { id: Date.now(), text, amount };
	transactions.push(transaction);
	updateLocalStorage();
	addTransactionDOM(transaction);
	updateValues();
	textEl.value = '';
	amountEl.value = '';
}

function init() {
	if (!listEl) return;
	listEl.innerHTML = '';
	transactions.forEach(addTransactionDOM);
	updateValues();
}

if (formEl) formEl.addEventListener('submit', addTransaction);
init();