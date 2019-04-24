using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGEO.Models
{
    public class GEOCoordenadas
    {
        public int Id { get; set; }
        public int InventarioId { get; set; }
        public decimal Coord_x { get; set; }
        public decimal Coord_y { get; set; }

    }
}
