using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json; 
using System.Web.Hosting; 

namespace WebApp1.Models
{
    /// <summary>
    /// This class will store data in a local json file.
    /// </summary>
    public class ProductRepo
    {
        /// <summary>
        /// Creates a new Product w/default vals.  
        /// </summary>
        /// <returns></returns>
        internal ProductModel Create()
        {
            var product = new ProductModel { ReleaseDate = DateTime.Now };
            return product; 
        }

        /// <summary>
        /// Returns all the data from the local json file.  
        /// </summary>
        /// <returns></returns>
        internal List<ProductModel> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/product.json");
            var json = System.IO.File.ReadAllText(filePath);
            var products = JsonConvert.DeserializeObject<List<ProductModel>>(json);
            return products; 
        }

        /// <summary>
        /// POSTS a product to the local json file.  
        /// </summary>
        /// <params name="product"></params>
        /// <returns></returns>
        internal ProductModel Save(ProductModel product)
        {
            var products = this.Retrieve();
            var maxId = products.Max(p => p.ProductId);
            product.ProductId = maxId + 1;
            products.Add(product);
            WriteData(products);
            return product; 
        }

        /// <summary>
        /// PUTS a product to the local json file.  
        /// </summary>
        /// <params name="product"></params>
        /// <params name="productId"></params>
        /// <returns></returns>
        internal ProductModel Save(ProductModel product, int productId)
        {
            var products = this.Retrieve();
            var itemIndex = products.FindIndex(p => p.ProductId == product.ProductId);
            if (itemIndex > 0) products[itemIndex] = product;
            else return null;

            WriteData(products);
            return product; 
        }

        private bool WriteData(List<ProductModel> products)
        {
            // write out the json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/product.json");

            var json = JsonConvert.SerializeObject(products, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true; 
        }
    }
}