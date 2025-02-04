let editIndex = -1;
const stockData = JSON.parse(localStorage.getItem("stockData")) || [];
const form = document.getElementById("stock-form");
const stockTable = document.getElementById("stock-table");
const addButton = document.getElementById("add-btn");

addButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const qty = document.getElementById("qty").value;
  const expiry = document.getElementById("expiry").value;

  if (!name || !qty || !expiry) {
    alert("Please fill out all fields!");
    return;
  }

  if (editIndex === -1) {
    // Add new stock
    stockData.push({ name, qty, expiry });
  } else {
    // Edit existing stock
    stockData[editIndex] = { name, qty, expiry };
    editIndex = -1;
    addButton.textContent = "Add Stock";
  }

  saveToLocalStorage();
  form.reset();
  renderTable();
});

function renderTable() {
  stockTable.innerHTML = "";
  stockData.forEach((stock, index) => {
    // const row = document.createElement("tr");
    const date = new Date(stock.expiry);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const li = document.createElement('li');
    li.classList.add('flex', 'justify-between', 'items-center', 'p-4', 'bg-slate-600', 'rounded-lg', 'shadow-md', 'space-x-4');

    li.innerHTML = `
           <div class="flex-1">
               <strong class="text-lg text-white">${stock.name}</strong>
               <div class="text-sm text-white"><b>Expiry:</b> ${stock.expiry}</div>
           </div>
           <div class="flex items-center space-x-4">
               <span class="text-lg font-semibold text-white">${stock.qty}</span>
              <button class="edit-button px-4 py-2 rounded-lg edit-btn" onclick="editStock(${index})">Edit</button>
           </div>
    `;
    stockTable.appendChild(li);
  });

  filteredEntries.forEach(entry => {
    const li = document.createElement('li');
    li.classList.add('flex', 'justify-between', 'items-center', 'p-4', 'bg-gray-200', 'rounded-lg', 'shadow-md', 'space-x-4');

    li.innerHTML = `
<div class="flex-1">
    <strong class="text-lg">${entry.description}</strong>
    <div class="text-sm text-gray-500">${entry.type}</div>
</div>
<div class="flex items-center space-x-4">
    <span class="text-lg font-semibold">₹${entry.amount.toFixed(2)}</span>
   <button class="edit-button text-white px-4 py-2 rounded-lg edit-btn" data-id="${entry.id}">Edit</button>
    <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 delete-btn" data-id="${entry.id}">Delete</button>
</div>
`;
    entryList.appendChild(li);
});
}

function editStock(index) {
  const stock = stockData[index];
  document.getElementById("name").value = stock.name;
  document.getElementById("qty").value = stock.qty;
  document.getElementById("expiry").value = stock.expiry;
  editIndex = index;
  addButton.textContent = "Update Stock";
}

function saveToLocalStorage() {
  localStorage.setItem("stockData", JSON.stringify(stockData));
}

// Render table on page load
renderTable();
