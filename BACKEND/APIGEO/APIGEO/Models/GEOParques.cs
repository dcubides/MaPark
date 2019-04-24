using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIGEO.Models
{
    public class GEOParques
    {
        [Key]
        public int Id { get; set; }

        public string Identificador_parque { get; set; }
        public int Estrato { get; set; }
        public int? UPZ { get; set; }
        public string Localidad { get; set; }
        public string Estado_Certificacion { get; set; }
        public string Clasificacion_Parque { get; set; }
        public string Nombre_Parque { get; set; }
        public string Administración_Parque { get; set; }
        public int? Codigo_Localidad { get; set; }
        public string Codigo_POT { get; set; } 
        public decimal coord_x { get; set; }
        public decimal coord_y { get; set; }

    }
}
