
const foods = [
    {id:1, name:"Chicken Biriyani", price:150},
    {id:2, name:"Veg Biriyani", price:100},
    {id:3, name:"Parotta", price:20},
    {id:4, name:"Fried Rice", price:120},
    {id:5, name:"Chicken 65", price:130},
    {id:6, name:"Fresh Juice", price:50}
];

let cart = [];

function showMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior:"smooth"
    });
}

function displayFoods() {
    let html = "";

    foods.forEach(food => {
        html += `
        <div class="food-card">
            <h3>${food.name}</h3>
            <p>Rs.${food.price}</p>
            <button onclick="addFood(${food.id})">
                Add to Cart
            </button>
        </div>`;
    });

    document.getElementById("food-list").innerHTML = html;
}

function addFood(id) {
    let food = foods.find(f => f.id === id);
    let existing = cart.find(item => item.id === id);

    if(existing) {
        existing.qty++;
    } else {
        cart.push({...food, qty:1});
    }

    displayCart();
}

function displayCart() {
    let html = "";
    let total = 0;

    cart.forEach(item => {
        let amount = item.price * item.qty;
        total += amount;
        html += `<p>${item.name} x ${item.qty} = Rs.${amount}</p>`;
    });

    document.getElementById("cart").innerHTML = html;
    document.getElementById("total").innerText =
        "Total: Rs." + total;
}

function placeOrder() {
    let name = document.getElementById("customer").value;

    if(!name.trim() || cart.length === 0) {
        alert("Enter customer name and select food!");
        return;
    }

    let total = cart.reduce(
        (sum,item) => sum + item.price * item.qty, 0
    );

    let gst = total * 0.05;
    let final = total + gst;

    document.getElementById("bill").innerHTML = `
        <h2>RESTAURANT BILL</h2>
        <p>Customer: ${name.replace(/[&<>"']/g, "")}</p>
        ${cart.map(item =>
            `<p>${item.name} x ${item.qty} = Rs.${item.price * item.qty}</p>`
        ).join("")}
        <hr>
        <p>Food Total: Rs.${total.toFixed(2)}</p>
        <p>GST (5%): Rs.${gst.toFixed(2)}</p>
        <h3>Final Bill: Rs.${final.toFixed(2)}</h3>
        <h3>Thank You! Visit Again</h3>
    `;
}

displayFoods();
