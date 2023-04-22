let ShoppingCart = document.getElementById("shopcart");
let label = document.getElementById("label");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
  let cartIcon = document.getElementById("cartnum")
  cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

console.log(allitemsdata);

calculation();

let generatecard = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = allitemsdata.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">${price}/-</p>
            </h4>
            <i onclick = "remove(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="cart-buttons">
            <div class="buttons">
            <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
            <p id= ${id}>${item}</p>
            <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3> ${item * price}/-</h3>
          </div> 
        </div>
      </div>
      `;
      })
      .join(""));
  }
  else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2 class="empty">Cart is Empty</h2>
    <a href="sahara.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `; 
  }
};

generatecard();

let increment = (id) => {
  let selectedItem = id;
  let search =basket.find((x)=> x.id === selectedItem.id)
  if(search === undefined){
      basket.push({
          id : selectedItem.id,
          item: 1,
      });
  }
  else{
      search.item +=1;
  }
  generatecard();
  update(selectedItem.id);
  localStorage.setItem("data" , JSON.stringify(basket))

};

let decrement = (id) => {
  let selectedItem = id;
  let search =basket.find((x)=> x.id === selectedItem.id)
  if(search === undefined) return;
  else if(search.item === 0){
      return;
  }
  else{
      search.item -=1;
  }
  update(selectedItem.id);
  basket = basket.filter((x)=>x.item !== 0);
  generatecard();
  localStorage.setItem("data" , JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x)=>x.id === id); 
  document.getElementById(id).innerHTML =search.item;
  calculation();
  TotalAmount();
}; 

let remove = ((id)=>{
  let selectedItem = id;
  basket = basket.filter((x)=> x.id !== selectedItem.id);
  localStorage.setItem("data" , JSON.stringify(basket));
  generatecard();
  TotalAmount();
  calculation();
});

let clearCart = () => {
  basket = [];
  generatecard();
  calculation();
  localStorage.setItem("data" , JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item,id } = x;
        let filterData = allitemsdata.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2 class="total">Total Bill : ${amount} /-</h2>
    <button onclick = "checkoutCart()" class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `);
  } else return;
};

let checkoutCart = () =>{
  basket = [];
  generatecard();
  calculation();
  localStorage.setItem("data" , JSON.stringify(basket));
  return (label.innerHTML = `
    <h2 class="total">Order Placed</h2>
    <a href="sahara.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `);
};

TotalAmount();