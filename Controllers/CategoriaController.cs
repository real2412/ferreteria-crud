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
    public class CategoriaController : ControllerBase
    {
        private readonly FerreteriaService _categoriaService;
        public CategoriaController(FerreteriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        [Route("obtener")]
        public IActionResult Obtener()
        {
            var resultado = _categoriaService.ObtenerCategorias();
            return Ok(resultado);
        }

    }
}