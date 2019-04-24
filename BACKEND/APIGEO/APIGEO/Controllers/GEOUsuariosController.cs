using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIGEO.Models;

namespace APIGEO.Controllers
{
    [Produces("application/json")]
    [Route("api/GEOUsuarios")]
    public class GEOUsuariosController : Controller
    {
        private readonly DataContext _context;

        public GEOUsuariosController(DataContext context)
        {
            _context = context;
        }

        // GET: api/GEOUsuario s
        [HttpGet]
        public IEnumerable<GEOUsuarios> GetGEOUsuarios()
        {
            return _context.GEOUsuarios;
        }

        ////GET: api/GEOUsuarios/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetGEOUsuarios([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var gEOUsuarios = await _context.GEOUsuarios.SingleOrDefaultAsync(m => m.Id_Usuario == id);

        //    if (gEOUsuarios == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(gEOUsuarios);
        //}

        // GET: api/GEOUsuarios/correo/contrasena
        [HttpGet("{correo}/{clave}")]
        public async Task<IActionResult> GetGEOUsuariosLogin([FromRoute] string correo, [FromRoute] string clave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOUsuarios = await _context.GEOUsuarios.SingleOrDefaultAsync(m => m.Correo == correo && m.Clave == clave);

            if (gEOUsuarios == null)
            {
                return NotFound();
            }

            return Ok(gEOUsuarios);
        }

        // PUT: api/GEOUsuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGEOUsuarios([FromRoute] int id, [FromBody] GEOUsuarios gEOUsuarios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gEOUsuarios.Id_Usuario)
            {
                return BadRequest();
            }

            _context.Entry(gEOUsuarios).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GEOUsuariosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GEOUsuarios
        [HttpPost]
        public async Task<IActionResult> PostGEOUsuarios([FromBody] GEOUsuarios gEOUsuarios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GEOUsuarios.Add(gEOUsuarios);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGEOUsuarios", new { id = gEOUsuarios.Id_Usuario }, gEOUsuarios);
        }

        // DELETE: api/GEOUsuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGEOUsuarios([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOUsuarios = await _context.GEOUsuarios.SingleOrDefaultAsync(m => m.Id_Usuario == id);
            if (gEOUsuarios == null)
            {
                return NotFound();
            }

            _context.GEOUsuarios.Remove(gEOUsuarios);
            await _context.SaveChangesAsync();

            return Ok(gEOUsuarios);
        }

        private bool GEOUsuariosExists(int id)
        {
            return _context.GEOUsuarios.Any(e => e.Id_Usuario == id);
        }
    }
}