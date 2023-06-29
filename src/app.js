const express = require ('express')
const app = express()

const ProductManager =require('./ProductManager')
const manager = new ProductManager('products.json')


app.get('/products', async (req , res)  =>{
    try {
       const limit = parseInt(req.query.limit)
        const products = await manager.getProducts()
        
        if (!limit) {
            return res.send(products) 
        }

        const limitProducts = products.slice(0, limit)
        return res.send(limitProducts)

    } catch (error) {
    }

})

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const products = await manager.getProductById()
        const product = products.find(product => product.id === pid)

        if (pid>10 || pid<1) {
            const objerror= {Error:"El producto no existe"}
            return res.send(objerror)
        }
        return res.send(product)

    } catch (error) {        
    }
  
  })

app.listen(8080, () =>{
    console.log('Servidor express escuchando en el puerto 8080')
})