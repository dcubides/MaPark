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
    [Route("api/GEOInventarios")]
    public class GEOInventariosController : Controller
    {
        private readonly DataContext _context;

        public GEOInventariosController(DataContext context)
        {
            _context = context;
        }

        // GET: api/GEOInventarios
        [HttpGet]
        public IEnumerable<GEOInventario> GetGEOInventario()
        {
            return _context.GEOInventario;
        }

        // GET: api/GEOInventarios/idparque/idelemento
        [HttpGet("{idparque}/{idelemento}")]
        public  List<GEOInventario> GetGEOInventarioId([FromRoute] int idparque, [FromRoute] int idelemento)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var gEOInventario = await _context.GEOInventario.FirstOrDefaultAsync(m => m.ParqueId == idparque && m.ElementoID == idelemento);
            //var gEOInventario = await _context.GEOInventario
             //                           .Where(m => m.ParqueId == idparque && m.ElementoID == idelemento)
              //                          .FirstOrDefaultAsync();

            List<GEOInventario> gEOInventario =  null;


             gEOInventario =  _context.GEOInventario.Where(m => m.ParqueId == idparque && m.ElementoID == idelemento).ToList<GEOInventario>();

            return gEOInventario;

            //if (gEOInventario == null)
            //{
            //    return NotFound();
            //}

            //return Ok(gEOInventario);
        }

        // GET: api/GEOInventarios/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetGEOInventario([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var gEOInventario = await _context.GEOInventario.SingleOrDefaultAsync(m => m.Id == id);

        //    if (gEOInventario == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(gEOInventario);
        //}

        // PUT: api/GEOInventarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGEOInventario([FromRoute] int id, [FromBody] GEOInventario gEOInventario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gEOInventario.Id)
            {
                return BadRequest();
            }

            _context.Entry(gEOInventario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GEOInventarioExists(id))
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

        // POST: api/GEOInventarios
        [HttpPost]
        public async Task<IActionResult> PostGEOInventario([FromBody] GEOInventario gEOInventario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GEOInventario.Add(gEOInventario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGEOInventario", new { id = gEOInventario.Id }, gEOInventario);
        }

        // DELETE: api/GEOInventarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGEOInventario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOInventario = await _context.GEOInventario.SingleOrDefaultAsync(m => m.Id == id);
            if (gEOInventario == null)
            {
                return NotFound();
            }

            _context.GEOInventario.Remove(gEOInventario);
            await _context.SaveChangesAsync();

            return Ok(gEOInventario);
        }

        private bool GEOInventarioExists(int id)
        {
            return _context.GEOInventario.Any(e => e.Id == id);
        }
    }
}