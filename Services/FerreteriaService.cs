using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ferreteria.Models;
using Microsoft.EntityFrameworkCore;

namespace Ferreteria.Services
{
    public class FerreteriaService
    {
        private readonly FerreteriaDBContext _productoDBContext;
        public FerreteriaService(FerreteriaDBContext productoDBContext)
        {
            _productoDBContext = productoDBContext;
        }

        public List<Producto> Obtener()
        {
            var resultado = _productoDBContext.Producto.Include(x=>x.Categoria).ToList();
            return resultado;
        }

        public List<Categoria> ObtenerCategorias()
        {
            var resultado = _productoDBContext.Categoria.ToList();
            return resultado;
        }

        public Boolean AgregarProducto(Producto _producto)
        {
            try
            {
                _productoDBContext.Producto.Add(_producto);
                _productoDBContext.SaveChanges();
                return true;
            }
            catch(Exception error)
            {
                return false;
            }
        }

        public Boolean EditarProducto(Producto _producto)
        {
            try
            {
                var productoBaseDatos = _productoDBContext.Producto.Where(busqueda=>busqueda.ProductoID ==_producto.ProductoID).FirstOrDefault();
                productoBaseDatos.Descripcion = _producto.Descripcion;
                productoBaseDatos.CategoriaID = _producto.CategoriaID;
                productoBaseDatos.Precio = _producto.Precio;
                productoBaseDatos.Stock = _producto.Stock;

                _productoDBContext.SaveChanges();

                return true;
            }
            catch(Exception error)
            {
                return false;
            }
        }

        public Boolean EliminarProducto(int ProductoID)
        {
            try
            {
                var productoBaseDatos = _productoDBContext.Producto.Where(busqueda=>busqueda.ProductoID == ProductoID).FirstOrDefault();
                _productoDBContext.Producto.Remove(productoBaseDatos);
                _productoDBContext.SaveChanges();

                return true;
            }
            catch(Exception error)
            {
                return false;
            }
        }

    }
}