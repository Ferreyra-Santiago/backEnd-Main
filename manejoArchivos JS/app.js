const express = require('express')
const {productManager} = require("./productManager")
const app = express()

app.get('/', function (req, res) {
    res.send(`<html>
    <body>
    <h1>Bienvenido</h1>
    <h3
      >Ver todos los productos: http://localhost:3000/products y
      para limitar agregar ?limit=(Numero que desea) </h3
    >
    <h3
      > para filtrar
      http://localhost:3000/products/(Numero de id del producto)</h3
    >
    </body>
    </html>`
    )
})


app.get('/products', function (req, res) {
    let product = productManager.readFile() 
    const limit = req.query.limit
    if(limit && !isNaN(Number(limit))){
        res.send(product.slice(0, limit))
    }
    res.send(product)
})

app.get('/products/:id', function (req, res) {
    let product = productManager.readFile().find((e) => e.id === Number(req.params.id));
res.send(product)
})


app.listen(3000)