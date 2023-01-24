

const socket = io()
socket.emit("mensaje", "Mensaje enviado desde el cliente al servidor")
socket.on("mesagge", data => {
    // console.log(data)
})
socket.on("products", products => {
    // console.log(products)
})



const formulario = document.querySelector(".formulario").addEventListener("submit", (e)=>{
    e.preventDefault();

    let producto = {
        title:  document.querySelector("#nombre").value,
        description: document.querySelector('#descripcion').value,
        price: document.querySelector('#precio').value,
        thumbnail: document.querySelector('#url').value,
        code: document.querySelector('#codigo').value,
        status: true,
        stock: document.querySelector('#stock').value,
    };
    socket.emit("productoNuevo", {producto})
  
})


