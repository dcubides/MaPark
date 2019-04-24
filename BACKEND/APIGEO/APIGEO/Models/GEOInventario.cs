using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGEO.Models
{
    public class GEOInventario
    {
        public int Id { get; set; }
        public int ParqueId { get; set; }
        public int ElementoID { get; set; }
        public string Estado { get; set; }
        public string Observaciones { get; set; }


        //   public List<GEOElementos> Elementos { get; set; }


    }
}
