document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    const cartList = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const cartPanel = document.getElementById("cart");
    const cart = [];
    const openCartButton = document.getElementById("openCart");
  
    //creating a variable to define the products 
    const products = [
      {
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50,
        image: "./assets/images/image-waffle-thumbnail.jpg"
      },
      {
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00,
        image: "./assets/images/image-creme-brulee-thumbnail.jpg"
      },
      {
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00,
        image: "./assets/images/image-macaron-thumbnail.jpg"
      },
      {
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50,
        image: "./assets/images/image-tiramisu-thumbnail.jpg"
      },
      {
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00,
        image: "./assets/images/image-baklava-thumbnail.jpg"
      },
      {
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00,
        image: "./assets/images/image-meringue-thumbnail.jpg"
      },
      {
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50,
        image: "./assets/images/image-cake-thumbnail.jpg"
      },
      {
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 4.50,
        image: "./assets/images/image-creme-brulee-thumbnail.jpg"
      },
      {
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50,
        image: "./assets/images/image-panna-cotta-thumbnail.jpg"
      }
    ];
  
    //list of the products
    productList.innerHTML = products.map(({ name, category, price, image }) => `
      <li class="product-item">
        <img src="${image}" alt="${name}" class="product-image">
        <h2>${name}</h2>
        <p>${category} - $${price.toFixed(2)}</p>
        <button class="add-to-cart" data-name="${name}" data-price="${price}">Add to Cart</button>
      </li>
    `).join("");
  
    //adding the products to the cart
    productList.addEventListener("click", ({ target }) => {
      if (target.classList.contains("add-to-cart")) {
        const name = target.dataset.name;
        const price = Number(target.dataset.price);  
  
        //creating a function to verifie if the products are in the list, otherwise add them
        const item = cart.find(item => item.name === name) || cart[cart.push({ name, price, quantity: 0 }) - 1];
        item.quantity++;
        updateCart();
      }
    });
  
    // creating a function to update the panel of the cart and display the current items
    function updateCart() {
      let total = 0;
  
      
      cartList.innerHTML = cart.map(({ name, price, quantity }) => {
        total += price * quantity;
        return `<li>${name} x${quantity} - $${(price * quantity).toFixed(2)}</li>`;
      }).join("");
  
      //updating the cartCount total
      cartCount.textContent = cart.reduce((sum, { quantity }) => sum + quantity, 0);
      cartTotal.textContent = total.toFixed(2);
    }
  
    //this will show the cart panel when clicking "View Cart"
    openCartButton.addEventListener("click", () => {
      cartPanel.style.display = "block"; 
    });
  
    //this will hide the cart panel when clicking outside the panel
    document.body.addEventListener("click", (event) => {
      if (!cartPanel.contains(event.target) && !openCartButton.contains(event.target)) {
        cartPanel.style.display = "none"; 
      }
    });
  });
  
