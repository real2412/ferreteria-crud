using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ferreteria.Services;
using Ferreteria.Models;

namespace Ferreteria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly FerreteriaService _productoService;
        public ProductoController(FerreteriaService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet]
        [Route("obtener")]
        public IActionResult Obtener()
        {
            var resultado = _productoService.Obtener();
            return Ok(resultado);
        }

        [HttpPost]
        [Route("agregar")]
        public IActionResult Agregar([FromBody] Producto _producto)
        {
            var resultado = _productoService.AgregarProducto(_producto);
            if(resultado)
            {
                return Ok(_producto);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("editar")]
        public IActionResult Editar([FromBody] Producto _producto)
        {
            var resultado = _productoService.EditarProducto(_producto);
            if(resultado)
            {
                return Ok(_producto);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("eliminar/{ProductoID}")]
        public IActionResult Eliminar(int ProductoID)
        {
            var resultado = _productoService.EliminarProducto(ProductoID);
            if(resultado)
            {
                return Ok(ProductoID);
            }
            else
            {
                return BadRequest();
            }           
        }
    }
}