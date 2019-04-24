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
    [Route("api/GEOElementos")]
    public class GEOElementosController : Controller
    {
        private readonly DataContext _context;

        public GEOElementosController(DataContext context)
        {
            _context = context;
        }

        // GET: api/GEOElementos
        [HttpGet]
        public IEnumerable<GEOElementos> GetGEOElementos()
        {
            return _context.GEOElementos;
        }

        // GET: api/GEOElementos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGEOElementos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOElementos = await _context.GEOElementos.SingleOrDefaultAsync(m => m.Id == id);

            if (gEOElementos == null)
            {
                return NotFound();
            }

            return Ok(gEOElementos);
        }

        // PUT: api/GEOElementos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGEOElementos([FromRoute] int id, [FromBody] GEOElementos gEOElementos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gEOElementos.Id)
            {
                return BadRequest();
            }

            _context.Entry(gEOElementos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GEOElementosExists(id))
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

        // POST: api/GEOElementos
        [HttpPost]
        public async Task<IActionResult> PostGEOElementos([FromBody] GEOElementos gEOElementos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GEOElementos.Add(gEOElementos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGEOElementos", new { id = gEOElementos.Id }, gEOElementos);
        }

        // DELETE: api/GEOElementos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGEOElementos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOElementos = await _context.GEOElementos.SingleOrDefaultAsync(m => m.Id == id);
            if (gEOElementos == null)
            {
                return NotFound();
            }

            _context.GEOElementos.Remove(gEOElementos);
            await _context.SaveChangesAsync();

            return Ok(gEOElementos);
        }

        private bool GEOElementosExists(int id)
        {
            return _context.GEOElementos.Any(e => e.Id == id);
        }
    }
}