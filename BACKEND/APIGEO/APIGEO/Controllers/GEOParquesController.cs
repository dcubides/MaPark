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
    [Route("api/GEOParques")]
    public class GEOParquesController : Controller
    {
        private readonly DataContext _context ;
        //private DataContext _context = new DataContext();

        public GEOParquesController(DataContext context)
        {

            _context = context;
        }

        // GET: api/GEOParques
        [HttpGet]
        public IEnumerable<GEOParques> GetGEOParques()
        {
            return _context.GEOParques;
        }


        // GET: api/GEOParques/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGEOParques([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOParques = await _context.GEOParques.SingleOrDefaultAsync(m => m.Id == id);

            if (gEOParques == null)
            {
                return NotFound();
            }

            return Ok(gEOParques);
        }

        // PUT: api/GEOParques/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGEOParques([FromRoute] int id, [FromBody] GEOParques gEOParques)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gEOParques.Id)
            {
                return BadRequest();
            }

            _context.Entry(gEOParques).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GEOParquesExists(id))
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

        // POST: api/GEOParques
        [HttpPost]
        public async Task<IActionResult> PostGEOParques([FromBody] GEOParques gEOParques)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GEOParques.Add(gEOParques);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGEOParques", new { id = gEOParques.Id }, gEOParques);
        }

        // DELETE: api/GEOParques/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGEOParques([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gEOParques = await _context.GEOParques.SingleOrDefaultAsync(m => m.Id == id);
            if (gEOParques == null)
            {
                return NotFound();
            }

            _context.GEOParques.Remove(gEOParques);
            await _context.SaveChangesAsync();

            return Ok(gEOParques);
        }

        private bool GEOParquesExists(int id)
        {
            return _context.GEOParques.Any(e => e.Id == id);
        }
    }
}