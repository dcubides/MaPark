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
    [Route("api/GEOCoordenadas")]
    public class GEOCoordenadasController : Controller
    {
        private readonly DataContext _context;

        public GEOCoordenadasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/GEOCoordenadas
        [HttpGet]
        public IEnumerable<GEOCoordenadas> GetGEOCoordenadas()
        {
            return _context.GEOCoordenadas;
        }

        // GET: api/GEOCoordenadas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGEOCoordenadas([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           // var gEOCoordenadas = await _context.GEOCoordenadas.SingleOrDefaultAsync(m => m.Id == id);

            List<GEOCoordenadas> gEOCoordenadas = null;


            gEOCoordenadas = _context.GEOCoordenadas.Where(m => m.InventarioId == id).ToList<GEOCoordenadas>();


            if (gEOCoordenadas == null)
            {
                return NotFound();
            }

            return Ok(gEOCoordenadas);
        }


        //// GET: api/GEOCoordenadas/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetGEOCoordenadas([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var gEOCoordenadas = await _context.GEOCoordenadas.SingleOrDefaultAsync(m => m.Id == id);

        //    if (gEOCoordenadas == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(gEOCoordenadas);
        //}

        // PUT: api/GEOCoordenadas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGEOCoordenadas([FromRoute] int id, [FromBody] GEOCoordenadas gEOCoordenadas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gEOCoordenadas.Id)
            {
                return BadRequest();
            }

            _context.Entry(gEOCoordenadas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GEOCoordenadasExists(id))
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

        // POST: api/GEOCoordenadas
        [HttpPost]
        public async Task<IActionResult> PostGEOCoordenadas([FromBody] GEOCoordenadas gEOCoordenadas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GEOCoordenadas.Add(gEOCoordenadas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGEOCoordenadas", new { id = gEOCoordenadas.Id }, gEOCoordenadas);
        }

        // DELETE: api/GEOCoordenadas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGEOCoordenadas([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOCoordenadas = await _context.GEOCoordenadas.SingleOrDefaultAsync(m => m.Id == id);
            if (gEOCoordenadas == null)
            {
                return NotFound();
            }

            _context.GEOCoordenadas.Remove(gEOCoordenadas);
            await _context.SaveChangesAsync();

            return Ok(gEOCoordenadas);
        }

        private bool GEOCoordenadasExists(int id)
        {
            return _context.GEOCoordenadas.Any(e => e.Id == id);
        }
    }
}