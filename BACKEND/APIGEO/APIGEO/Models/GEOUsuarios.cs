using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIGEO.Models
{
    public class GEOUsuarios
    {
        [Key]
        public int Id_Usuario { get; set; }

        public string Nombre_completo { get; set; }
        public string Correo { get; set; }
        public int Documento { get; set; }
        public string Clave { get; set; }
    }
}
