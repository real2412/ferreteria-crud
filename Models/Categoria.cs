using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ferreteria.Models
{
    public class Categoria
    {
        public int CategoriaID {get; set;}     
        public string Nombre {get; set;}     

        public class Mapeo
        {
            public Mapeo(EntityTypeBuilder<Categoria> mapeoCategoria)
            {
                mapeoCategoria.HasKey(x => x.CategoriaID);
                mapeoCategoria.ToTable("Categoria");
            }
        }

    }
}