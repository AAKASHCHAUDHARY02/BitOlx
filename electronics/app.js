// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch products from Firestore where category is "Electronics"
const productsGrid = document.getElementById('products-grid');

// Fetch electronics products from Firestore
const fetchElectronicsProducts = async () => {
    try {
        const querySnapshot = await db.collection('products').where('category', '==', 'Electronics').get();
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            displayProduct(product);
        });
    } catch (error) {
        console.error("Error fetching products: ", error);
    }
};

// Function to display each electronics product on the page
const displayProduct = (product) => {
    const productCard = `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <a href="#" class="product-btn">Buy Now</a>
        </div>
    `;
    productsGrid.innerHTML += productCard;
};

// Load electronics products on page load
window.onload = fetchElectronicsProducts;
