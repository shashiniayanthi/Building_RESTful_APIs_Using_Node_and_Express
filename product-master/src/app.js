//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');
const { error } = require('console');

const server = http.createServer(async (req, res) => {
  // Get all products
  if(req.url === '/api/products' && req.method === 'GET'){
    res.writeHead(200,{
      'content-type': 'application/json'  
    })
    let products = productsService.getProducts()
    res.end(products);
  }

  // Get a product with specified id
  else  if(req.url.match (/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
    id = req.url.split("/")[3];
    productsService.getProductsById(id, (error, product) => {
      if (error) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
      } else {
        // Handle product retrieval
        res.end(product);
      }
    });
  }

  // Create a new product
  else if (req.url === '/api/products' && req.method === 'POST') {
    try {
      const product_body = await getRequestData(req); 
      const savedProductId = await new Promise((resolve, reject) => {
        productsService.saveProduct(product_body, (error, savedProductId) => {
          if (error) {
            reject(error);
          } else {
            resolve(savedProductId); 
          }
        });
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ id: savedProductId }));
    } catch (error) {
      console.error('Error saving product:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error saving product' }));
    }
  }  

  // Update a specific product
  else  if(req.url.match (/\/api\/products\/([0-9]+)/) && req.method === 'PUT'){
    try {
    const id = req.url.split("/")[3];
    const product_body = await getRequestData(req); 
      const updateProduct = await new Promise((resolve, reject) => {
        productsService.updateProduct(id,product_body, (error, updateProduct) => {
          if (error) {
            reject(error);
          } else {
            resolve(updateProduct); 
          }
        });
      });
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updateProduct));

    } catch (error) {
      console.error('Error saving product:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error saving product' }));
    }
  }

  // Delete a specific Product
  else  if(req.url.match (/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'){
    try {
      const id = req.url.split("/")[3];
        const deleteProduct = await new Promise((resolve, reject) => {
          productsService.deleteProduct(id, (error, deleteProduct) => {
            if (error) {
              reject(error);
            } else {
              resolve(deleteProduct); 
            }
          });
        });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deleteProduct));
  
      } catch (error) {
        console.error('Error saving product:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error saving product' }));
      }
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})  
server.on('error',(error) => {
  if (error.code = 'EADRINUSE'){
    console.log('Port already in USE.')
  }
}) 