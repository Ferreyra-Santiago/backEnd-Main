const fs = require("fs");




let cocaCola = {
  title: "Coca Cola",
  description: "Bebida",
  price: 300,
  thumbnail: "asd",
  code: 1,
  stock: 500,
  }
  let teclado = {
  title: "Logitech",
  description: "Teclado 100% USB",
  price: 1500,
  thumbnail: "asd",
  code: 2,
  stock: 5,
  }
  
  let mouse = {
  title: "Logitech",
  description: "Mouse Inalambrico 16000 Dpi",
  price: 1000,
  thumbnail: "asd",
  code: 3,
  stock: 8,
  }
  

class ProductManager {
  path;
  constructor(path) {
    this.path = path;
    this.products = this.readFile();
  }

  readFile() {
    const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
    return data;
  }

  writeData(data) {
    let dataString = JSON.stringify(data);
    fs.writeFileSync(`./${this.path}`, dataString, );
    return dataString;
  }

  addProduct(item) {
    let items = this.readFile();
    if (items.find((e) => e.code === item.code)) {
      console.log("a CODE has already been assigned");
    } else if (
      !!!item.title ||
      !!!item.description ||
      !!!item.price ||
      !!!item.thumbnail ||
      !!!item.code ||
      !!!item.stock
    ) {
      console.log("Todos los campos son obligatorios");
    } else {
      item.id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
      items.push(item);
      this.writeData(items);
    }
  }
  getProductById(id) {
    let idItem = this.readFile().find((e) => e.id === id);
    if (idItem) {
      return console.log(idItem);
    }
    console.log("ID not found");
  }
  updateProduct(id, product) {
    let data = this.readFile();
    if (data.find((product) => product.id === id)) {
      let productDeleted = data.filter((product) => product.id !== id);
      product.id = id;
      productDeleted.push(product);
      this.writeData(productDeleted);
      return productDeleted;
    } else {
      console.log("The product to be updated does not exist");
    }
  }
  deleteProduct(id) {
    let products = this.readFile();
    let productDelete = products.filter((e) => e.id != id)
    if(productDelete.length < products.length){
    this.writeData(productDelete);
    console.log("Se ha Eliminado con exito el producto")
  }
    else{
      console.log("ID not found")
    }
  }
  deleteAll() {
    this.writeData([]);
  }
}
const productManager = new ProductManager("products.json");

// console.log(productManager.readFile());
// productManager.addProduct(cocaCola);
// productManager.addProduct(teclado);
// productManager.addProduct(mouse);
// productManager.getProductById(2);
// productManager.updateProduct(1,{
//   title: "Redragon",
//   description: "Mouse Inalambrico 16000 Dpi",
//   price: 1000,
//   thumbnail: "Sin Imagen",
//   code: "5",
//   stock: 8,
// })
// productManager.deleteProduct(1);
// productManager.deleteAll()


module.exports ={
  productManager
}

console.log(`Bienvenido
Ver todos los productos: http://localhost:3000/products  y para limitar agregar ?limit=(Numero que desea)
y para filtrar http://localhost:3000/products/(Numero de id del producto)`)