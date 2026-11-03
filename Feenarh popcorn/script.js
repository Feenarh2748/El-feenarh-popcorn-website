"script.js"

/* ==========================================
   EL~FEENARH POPCORN
   CART + CHECKOUT + PAYMENT EVIDENCE
========================================== */


/* ==========================================
   WHATSAPP NUMBER
========================================== */


const whatsappNumber = "2349027485570";


/* ==========================================
   CART
========================================== */

let cart = [];


/* ==========================================
   ELEMENTS
========================================== */

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartSummary =
    document.getElementById("cartSummary");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

const navCartCount =
    document.getElementById("navCartCount");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const paymentAmount =
    document.getElementById("paymentAmount");


/* ==========================================
   MOBILE MENU
========================================== */

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.getElementById("mainNav");


menuButton.addEventListener("click", function () {

    const isOpen =
        mainNav.classList.toggle("active");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Close mobile menu after clicking link */

const navigationLinks =
    document.querySelectorAll("#mainNav a");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        mainNav.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* ==========================================
   ADD TO CART
========================================== */

addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        /* Check whether product already exists */

        const existingProduct =
            cart.find(function(item) {

                return item.name === name;

            });


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        updateCart();


        /* Visual feedback */

        const originalText =
            button.textContent;

        button.textContent =
            "Added ✓";


        button.disabled = true;


        setTimeout(function() {

            button.textContent =
                originalText;

            button.disabled = false;

        }, 1000);


        /* Move user toward cart */

        document
            .getElementById("cart")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    cartItemsContainer.innerHTML = "";


    /* Total number of products */

    let itemCount = 0;

    let total = 0;


    cart.forEach(function(item, index) {

        itemCount += item.quantity;

        total +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₦${item.price.toLocaleString("en-NG")}
                    each
                </p>

            </div>


            <div
                class="quantity-controls"
                aria-label="Quantity controls">

                <button
                    type="button"
                    class="decrease"
                    aria-label="Decrease ${item.name} quantity">

                    −

                </button>


                <span
                    class="quantity-number"
                    aria-label="Quantity">

                    ${item.quantity}

                </span>


                <button
                    type="button"
                    class="increase"
                    aria-label="Increase ${item.name} quantity">

                    +

                </button>

            </div>


            <button
                type="button"
                class="remove-cart-item">

                Remove

            </button>

        `;


        /* Increase quantity */

        cartItem
            .querySelector(".increase")
            .addEventListener("click", function() {

                item.quantity += 1;

                updateCart();

            });


        /* Decrease quantity */

        cartItem
            .querySelector(".decrease")
            .addEventListener("click", function() {

                if (item.quantity > 1) {

                    item.quantity -= 1;

                } else {

                    cart.splice(index, 1);

                }

                updateCart();

            });


        /* Remove */

        cartItem
            .querySelector(".remove-cart-item")
            .addEventListener("click", function() {

                cart.splice(index, 1);

                updateCart();

            });


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    /* Cart count */

    navCartCount.textContent =
        itemCount;


    /* Empty cart */

    if (cart.length === 0) {

        emptyCart.hidden = false;

        cartSummary.hidden = true;

    } else {

        emptyCart.hidden = true;

        cartSummary.hidden = false;

    }


    /* Total */

    cartSubtotal.textContent =
        "₦" + total.toLocaleString("en-NG");

    cartTotal.textContent =
        "₦" + total.toLocaleString("en-NG");


    updateCheckout();

}


/* ==========================================
   CHECKOUT SUMMARY
========================================== */

function updateCheckout() {

    checkoutItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const checkoutItem =
            document.createElement("div");

        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div>

                <div class="checkout-item-name">

                    ${item.name}

                </div>


                <div class="checkout-item-quantity">

                    Quantity: ${item.quantity}

                </div>

            </div>


            <strong>

                ₦${itemTotal.toLocaleString("en-NG")}

            </strong>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    checkoutTotal.textContent =
        "₦" + total.toLocaleString("en-NG");


    paymentAmount.textContent =
        "₦" + total.toLocaleString("en-NG");

}


/* ==========================================
   PROCEED TO CHECKOUT
========================================== */

checkoutButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a popcorn first."
            );

            return;

        }


        updateCheckout();


        document
            .getElementById("checkout")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* ==========================================
   PAYMENT EVIDENCE
========================================== */

const paymentEvidence =
    document.getElementById("paymentEvidence");

const evidencePreview =
    document.getElementById("evidencePreview");

const evidenceImage =
    document.getElementById("evidenceImage");

const evidenceFileName =
    document.getElementById("evidenceFileName");

const removeEvidence =
    document.getElementById("removeEvidence");


paymentEvidence.addEventListener(
    "change",
    function() {

        const file =
            paymentEvidence.files[0];


        if (!file) {

            evidencePreview.hidden = true;

            evidenceImage.src = "";

            evidenceFileName.textContent = "";

            return;

        }


        /* Only allow images */

        if (!file.type.startsWith("image/")) {

            alert(
                "Please upload an image of your payment evidence."
            );

            paymentEvidence.value = "";

            evidencePreview.hidden = true;

            return;

        }


        /* Display filename */

        evidenceFileName.textContent =
            file.name;


        /* Create preview */

        const reader =
            new FileReader();


        reader.onload = function(event) {

            evidenceImage.src =
                event.target.result;

            evidencePreview.hidden =
                false;

        };


        reader.readAsDataURL(file);

    }
);


/* ==========================================
   REMOVE PAYMENT EVIDENCE
========================================== */

removeEvidence.addEventListener(
    "click",
    function() {

        paymentEvidence.value = "";

        evidenceImage.src = "";

        evidenceFileName.textContent = "";

        evidencePreview.hidden = true;

    }
);


/* ==========================================
   ORDER FORM
========================================== */

const orderForm =
    document.getElementById("orderForm");


orderForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /* Make sure cart isn't empty */

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a popcorn first."
            );

            document
                .getElementById("flavours")
                .scrollIntoView({
                    behavior: "smooth"
                });

            return;

        }


        /* Get customer information */

        const customerName =
            document
                .getElementById("customerName")
                .value
                .trim();


        const customerPhone =
            document
                .getElementById("customerPhone")
                .value
                .trim();


        const deliveryAddress =
            document
                .getElementById("deliveryAddress")
                .value
                .trim();


        const customerNote =
            document
                .getElementById("customerNote")
                .value
                .trim();


        const evidenceFile =
            paymentEvidence.files[0];


        /* Payment evidence is required */

        if (!evidenceFile) {

            alert(
                "Please attach your payment evidence before submitting your order."
            );

            paymentEvidence.focus();

            return;

        }


        /* Calculate total */

        let total = 0;

        let orderList = "";


        cart.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            orderList +=
`
🍿 ${item.name}
Quantity: ${item.quantity}
Price: ₦${item.price.toLocaleString("en-NG")}
Item Total: ₦${itemTotal.toLocaleString("en-NG")}

`;

        });


        /* Payment evidence filename */

        const evidenceName =
            evidenceFile.name;


        /* WhatsApp message */

        const message =
`Hello El~feenarh Popcorn! 🍿

I would like to place an order.

👤 CUSTOMER DETAILS
━━━━━━━━━━━━━━

Name:
${customerName}

Phone:
${customerPhone}

Delivery Address:
${deliveryAddress}


🍿 ORDER DETAILS
━━━━━━━━━━━━━━

${orderList}
━━━━━━━━━━━━━━

💰 TOTAL:
₦${total.toLocaleString("en-NG")}


Additional Note:
${customerNote || "None"}

Thank you! ❤️`;


        /* WhatsApp URL */

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        /* Open WhatsApp */

        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* ==========================================
   INITIAL CART
========================================== */

updateCart();