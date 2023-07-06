const { Router } = require ('express')
const cartRouter = Router()

const CartManager =require('../CartManager')
const manager = new CartManager('./carts.json')

cartRouter.post('/', async (req , res)  =>{
    
    const cart = await manager.addCart()
    if (!cart) {
        return res.send({
            Error:"No se pudo agregar el carrito"
        })
    }
   
    return res.send(cart)
  
})  

cartRouter.get('/:cid', async (req, res) => {//listar los productos que pertenezcan al carrito 
    
    const cid = parseInt(req.params.cid)
    const cart = await manager.getCartsById(cid)

     if (!cart) {
        return res.status(404).json({
            Error:"El carrito no existe"
        })
    }

    return res.send(cart)
   
})

cartRouter.post('/:cid/product/:pid', async (req , res)  =>{
   const cid =parseInt(req.params.cid)
   const pid =parseInt(req.params.pid)
   const products = await manager.addProductInCart(cid, pid)

   if (!products) {
    return res.status(404).json({
        Error:"No se puede agregar el producto al carrito"
    })
}

    return res.send(products)
})

module.exports = cartRouter