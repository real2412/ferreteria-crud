using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ferreteria.Models
{
    public class Producto
    {
        public int ProductoID {get; set;}     
        public string Descripcion {get; set;}          
        public float Precio {get; set;}     
        public int Stock {get; set;}     
        public int CategoriaID {get; set;}
        public Categoria Categoria {get; set;}

        public class Mapeo
        {
            public Mapeo(EntityTypeBuilder<Producto> mapeoProducto)
            {
                mapeoProducto.HasKey(x => x.ProductoID);
                mapeoProducto.ToTable("Producto");
                mapeoProducto.HasOne( x => x.Categoria);
            }
        }

    }
}