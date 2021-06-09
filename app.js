if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


function ready() {
    let cartIcons = document.getElementsByClassName("cart-icon-container");
    for (let i = 0; i < cartIcons.length; i++) {
        cartIcons[i].addEventListener("click", addToCart);
    }
    updateTotal()
}

function addToCart(e) {
    let storeItem = e.currentTarget.parentElement.parentElement;
    let imageSource = storeItem.getElementsByClassName("store-item-image")[0].src;
    let index = imageSource.indexOf("imgs");
    let storeItemName = storeItem.getElementsByClassName("store-item-name")[0].textContent;
    let storeItemPrice = storeItem.getElementsByClassName("store-item-price")[0].textContent;

    let newRow = `<div class="cart-items">
    <img class="cart-item-image" src="${imageSource.slice(index)}">
    <div class="cart-item-information">
        <span class="cart-item-name">${storeItemName}</span>
        <span class="cart-item-price">${storeItemPrice}</span>
    </div>
    <span trash-icon-container><i class="fas fa-trash-alt trash-icon"></i></span>
</div>`

    let cartTotalContainer = document.getElementsByClassName("total-container")[0];

    cartTotalContainer.insertAdjacentHTML("beforebegin", newRow);

    updateTotal();
}

function updateTotal() {
    let cartContainer = document.getElementsByClassName("cart-container")[0];
    let cartItems = cartContainer.getElementsByClassName("cart-items");
    let total = 0;
    /*
    for (let i = 0; i < cartItems.length; i++) {
        let cartItemPrice = cartItems[i].getElementsByClassName("cart-item-price")[0].textContent;
        total += parseInt(cartItemPrice.replace("£", ""))
    }
    document.getElementsByClassName("total-price")[0].textContent = "£" + total;
    */
    let prices = [];
    for (let i = 0; i < cartItems.length; i++) {
        let cartItemPrice = cartItems[i].getElementsByClassName("cart-item-price")[0].textContent;
        prices.push(parseFloat(cartItemPrice.replace("£", "")))
    }
    total = prices.reduce((acca, current) => {
        return acca + current;
    }, 0)
    console.log(prices)
    document.getElementsByClassName("total-price")[0].textContent = "£" + total.toFixed(2);
}

