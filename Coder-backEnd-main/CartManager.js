const fs = require("fs");
const { productManager } = require("./ProductManager");
class CartManager {
  path;
  constructor(path) {
    this.path = path;
    this.carts = this.readFile();
  }
  readFile() {
    const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
    return data;
  }

  writeData(data) {
    let dataString = JSON.stringify(data);
    fs.writeFileSync(`./${this.path}`, dataString);
    return dataString;
  }

  addCart() {
    let carts = this.readFile();
    let cart = {
      products: [],
      id: 1,
      quantity: 0
    };
    if (carts.length === 0) {
      this.carts.push(cart);
      this.writeData(this.carts);
    } else if (carts.length > 0) {
      let idNew = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
      let cart = {
        products: [],
        id: idNew,
        quantity: 0
      };
      
      this.carts.push(cart);
      this.writeData(this.carts);
    }
  }
  getCartById(id) {
    let idItem = this.readFile().find((e) => e.id === id);
    if (idItem) {
      return console.log(idItem);
    }
    console.log("ID not found");
  }
  addProductCart(cid,pid) {
    let productId = productManager.readFile().find((e) => e.id === pid)
    let product = productId.id
    let cartId=this.carts.find((cart) => cart.id === cid)
    let products = Object.values(cartId)
    let quantity = products[2]
   
    if (!cartId) {
      console.log("ID Cart not found")
    }
    else if(cartId){ 
      console.log(quantity)
      let productUpdate = this.carts.filter((cart) => cart.id !== cid);
      let cartNew = {
        products: [{product,  quantity }],
        id: cid,
        quantityTotal: quantity = quantity + 1
      };
      productUpdate.push(cartNew);
      this.writeData(productUpdate);
    }
  }
  deleteCart(id) {
    let cart = this.readFile();
    let cartDelete = cart.filter((e) => e.id != id)
    if (cartDelete.length < cart.length) {
      this.writeData(cartDelete);
    }
    else{console.log("ID not found");} 
  }

  deleteAll() {
    this.writeData([]);
  }
}

const cartManager = new CartManager("./database/carts.json");
// cartManager.addProductCart(2,2)
module.exports = {
  cartManager: cartManager,
};
