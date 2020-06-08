using Microsoft.EntityFrameworkCore;
using Ferreteria.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ferreteria
{
    public class FerreteriaDBContext : DbContext
    {
        public FerreteriaDBContext(DbContextOptions opciones) : base(opciones)
        {

        }

        public DbSet<Producto> Producto {get; set;}
        public DbSet<Categoria> Categoria {get; set;}


        protected override void OnModelCreating(ModelBuilder modeloCreador)
        {
            new Producto.Mapeo(modeloCreador.Entity<Producto>());
            new Categoria.Mapeo(modeloCreador.Entity<Categoria>());

        }

    }
}