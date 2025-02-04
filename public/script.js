let editIndex = -1;
let stockData = JSON.parse(localStorage.getItem("stockData")) || [];
const form = document.getElementById("stock-form");
const stockTable = document.getElementById("stock-table");
const addButton = document.getElementById("add-btn");
const searchBar=document.getElementById("search-bar");
const clearButton=document.getElementById("clear");

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

let tempStockData = deepCopy(stockData);

function deepCopy(info) {
  let stringifyInfo=  JSON.stringify(info);
  return JSON.parse(stringifyInfo);
}

searchBar.addEventListener('input', () => {
  const filteredResults = tempStockData.filter(item =>
    item.name.toLowerCase().includes(searchBar.value.toLowerCase())
  );
  stockData=filteredResults;
  renderTable()
})

clearButton.addEventListener("click", () => {
  searchBar.value=''
  stockData=deepCopy(tempStockData);
  renderTable()
})


function renderTable() {
  stockTable.innerHTML = "";
  stockData.forEach((stock, index) => {
    const date = new Date(stock.expiry);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const li = document.createElement('li');
    li.classList.add('flex', 'justify-between', 'items-center', 'p-4', 'bg-slate-600', 'rounded-lg', 'shadow-md', 'space-x-4');

    li.innerHTML = `
           <div class="flex-1">
               <strong class="text-lg text-white">${stock.name}</strong>
               <div class="text-sm text-white"><b>Expiry:</b> ${formattedDate}</div>
           </div>
           <div class="flex items-center space-x-4">
               <span class="text-lg font-semibold text-white">${stock.qty}</span>
              <button class="edit-button px-4 py-2 rounded-lg edit-btn" onclick="editStock(${index})">Edit</button>
           </div>
    `;
    stockTable.appendChild(li);
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
  tempStockData=deepCopy(JSON.parse(localStorage.getItem("stockData")));    

}

// Render table on page load
renderTable();
