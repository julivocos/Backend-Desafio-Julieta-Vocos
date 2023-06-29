const fs = require('fs')

class ProductManager {

    constructor (path) {
        this.products = []
        this.path =path
        
    }

    addProduct (product) {

        if (!product.title || 
            !product.code || 
            !product.description || 
            !product.price || 
            !product.thumbnail || 
            !product.stock 
            ) {
            console.log ("Error! todos los campos son obligatorios")
            return
        }

        const codigoRepetido = this.products.find ((element) => element.code === product.code)
        if (codigoRepetido ) {
            return("Codigo de producto repetido")
            
        }
        
        product.id =this.products.length + 1;
        this.products.push(product)
        console.log(`Se agregó un nuevo producto con el id ${product.id}`)
        this.guardarProductos()
        
        
    }
    async getProducts () {
      try {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)
        return this.products
        
      } catch (error) {
        console.error('Error al leer los productos:', error)
        this.products = []
      }
    }

    async getProductById (id) {
      try {
        this.getProducts()
        const product = this.products.find(product => product.id === id)
        console.log('Se encontro el producto con ID')

      } catch (error) {
        console.log('Error al obtener el producto:', error)
      }
      return this.getProducts()
    }

    updateProduct(id, updateProduct) {
        this.getProducts()
          .then((products) => {
            const productIndex = products.findIndex((product) => product.id === id);
    
            if (productIndex === -1) {
                console.log('Error al obtener el producto:')
                return;
            }

            products[productIndex].title = updateProduct.title;
            products[productIndex].description = updateProduct.description;
            products[productIndex].price = updateProduct.price;
            products[productIndex].thumbnail = updateProduct.thumbnail;
            products[productIndex].code = updateProduct.code;
            products[productIndex].stock = updateProduct.stock;
            
            console.log(`Producto actualizado con ID ${id}`)
            this.guardarProductos(products)
            this.getProducts()
        })
        .catch((e) => {
            console.log('Error al obtener el producto:', e)
            return e
        })
    }    

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id)
        if (productIndex === -1) {
          return console.log('El producto que quiere eliminar no existe')
        }
    
        this.products.splice(productIndex, 1)
        console.log(`Se eliminó el producto con ID ${id}`)
        this.guardarProductos()
        this.getProducts()
        
        return
    }
    
    guardarProductos(products) {
        try {
          const data = JSON.stringify(products || this.products, null, 2)
          fs.writeFileSync(this.path, data, 'utf-8')
          console.log('Producto guardado correctamente')
        } catch (err) {
          console.log('Error al guardar los productos')
        }
    }
}

const manager = new ProductManager('./products.json')

manager.getProducts()
    .then(() =>{
    })
    .catch (() =>{
        
    })

manager.getProductById(2)
    .then(() => {

    })
    .catch(() => {
        
     })

/*manager.updateProduct(4,
   {
    title: "Mouse",
    description: "Marca Genius",
    price: "$5000",
    thumbnail: "img4",
    code: "1004",
    stock: "5",
})*/

//manager.deleteProduct(1)

module.exports= ProductManager

