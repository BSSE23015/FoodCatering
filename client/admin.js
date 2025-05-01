// Fetch users from localStorage
const users = JSON.parse(localStorage.getItem("register_users")) || [];

const tableBody = document.getElementById("userTableBody");

// Loop through each user and create a row
users.forEach((user, index) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
<td>${user.username}</td>
<td>${user.email}</td>
<td><span class="status pending">Active</span></td>
<td><i class="ri-more-2-fill"></i></td>
`;

  tableBody.appendChild(tr);
});

// If you want to update Total Customers
const totalCustomersCard = document.querySelector(".card h3 + p");
if (totalCustomersCard) {
  totalCustomersCard.innerText = users.length;
}
const orderTableBody = document.getElementById("ordersTableBody");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderOrders() {
  orderTableBody.innerHTML = "";

  orders.forEach((order, index) => {
    const orderDetails = order.cart
      .map((item) => `${item.name} x${item.quantity}`)
      .join("<br>");
    const orderTotal = order.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    orderTableBody.innerHTML += `
<tr>
<td>${order.email}</td>
<td>${orderDetails}</td>
<td>$${orderTotal.toFixed(2)}</td>
<td>
  <span id="status-${index}">${order.status}</span>
  ${
    order.status === "Pending"
      ? `<button class="btn btn-sm btn-success ms-2" onclick="confirmOrder(${index})">Confirm</button>`
      : ""
  }
</td>
</tr>
`;
  });
}

function confirmOrder(index) {
  orders[index].status = "Confirmed";
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

renderOrders();
// Dynamically update Total Sales from orders
function calculateTotalSales() {
  let totalSales = 0;

  orders.forEach((order) => {
    order.cart.forEach((item) => {
      totalSales += item.price * item.quantity;
    });
  });

  // Find the Total Sales <p> element and update it
  const salesCard = document.querySelectorAll(".card h3 + p")[1]; // Second <p> is for Total Sales
  if (salesCard) {
    salesCard.innerText = `$${totalSales.toFixed(2)}`;
  }
}

calculateTotalSales();
function renderSalesChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

  const salesData = {};

  orders.forEach((order) => {
    const total = order.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (salesData[order.email]) {
      salesData[order.email] += total;
    } else {
      salesData[order.email] = total;
    }
  });

  const labels = Object.keys(salesData);
  const data = Object.values(salesData);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Sales ($)",
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

// Call after rendering orders
renderSalesChart();
