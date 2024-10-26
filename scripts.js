document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Smartphone", image: "smartphone.jpg", price: "$250" },
        { id: 2, name: "Laptop", image: "laptop.jpg", price: "$750" },
        { id: 3, name: "Bicycle", image: "bicycle.jpg", price: "$150" },
        { id: 4, name: "Camera", image: "camera.jpg", price: "$350" },
    ];

    const productGrid = document.getElementById("productGrid");

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;

        productGrid.appendChild(productCard);
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});


fetch('http://localhost:5000/api/products')
    .then(response => response.json())
    .then(products => {
        // Render products to the UI
        const productGrid = document.getElementById('productGrid');
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    });
