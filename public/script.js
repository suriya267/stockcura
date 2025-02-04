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
    const row = document.createElement("tr");
    const date = new Date(stock.expiry);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    row.innerHTML = `
          <td class="border pl-3 py-2 pr-2">${stock.name}</td>
          <td class="border p-2 text-center">${stock.qty}</td>
          <td class="border p-2 text-center">${formattedDate}</td>
          <td class="border p-2 space-x-2 flex items-center justify-center">
            <button class="bg-yellow-400 px-4 py-1 rounded text-white" onclick="editStock(${index})">Edit</button>
          </td>
        `;
    stockTable.appendChild(row);
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
