using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description; 
using WebApp1.Models; 

namespace WebApp1.Controllers
{
    [EnableCors("http://localhost:8080", "*", "*")]
    public class ProductsController : ApiController
    {
        // GET: api/Products
        [ResponseType(typeof(ProductModel))]
        public IHttpActionResult Get()
        {
            try
            {
                var repo = new ProductRepo();
                return Ok(repo.Retrieve());
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /*
            // prior way to GET
            public IEnumerable<ProductModel> Get()
            {
                var repo = new ProductRepo();
                return repo.Retrieve();
            }
        */

        // GET: api/products?search=foo
        public IEnumerable<ProductModel> Get(string search)
        {
            var productRepo = new ProductRepo();
            var products = productRepo.Retrieve();
            return products.Where<ProductModel>(p => p.ProductCode.Contains(search));
        }

        // GET: api/Products/5
        [ResponseType(typeof(ProductModel))]
        [Authorize()]
        public IHttpActionResult Get(int id)
        {
            try
            {
                // throw new ArgumentNullException("ja: this is a test");
                ProductModel product;
                ProductRepo productRepo = new ProductRepo();
                if (id > 0)
                {
                    // not an efficient query
                    var products = productRepo.Retrieve();
                    product = products.FirstOrDefault<ProductModel>(p => p.ProductId == id);
                    if (product == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    product = productRepo.Create();
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/Products
        [ResponseType(typeof(ProductModel))]
        public IHttpActionResult Post([FromBody]ProductModel product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState); 
                }
                var productRepo = new ProductRepo();
                var newProduct = productRepo.Save(product);
                if (newProduct == null)
                {
                    return Conflict();
                }
                return Created<ProductModel>(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Products/5
        [ResponseType(typeof(ProductModel))]
        public IHttpActionResult Put(int id, [FromBody]ProductModel product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState); 
                }
                // TODO: implement data validations
                var productRepo = new ProductRepo();
                var updatedProduct = productRepo.Save(product, id);
                if (updatedProduct == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
