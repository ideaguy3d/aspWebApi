using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations; 

namespace WebApp1.Models
{
    public class ProductModel
    {
        public string Description { get; set; }

        public decimal Price { get; set; }

        [Required(ErrorMessage ="ProductCode is required", AllowEmptyStrings =false)]
        [MinLength(6, ErrorMessage = "Product code min length is 6 characters")]
        public string ProductCode { get; set; }

        public int ProductId { get; set; }

        [Required(ErrorMessage ="Product Name is required", AllowEmptyStrings = false)]
        [MinLength(5, ErrorMessage = "Product Name min length is 5 chars")]
        [MaxLength(11, ErrorMessage ="Product Name max length is 11 chars")]
        public string ProductName { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}