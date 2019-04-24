using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.IdentityModel.Protocols;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using APIGEO.Models;

namespace APIGEO.Models
{
    public class DataContext: DbContext
    {

        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            :base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");

            //var configuration = builder.Build();

            //optionsBuilder.UseSqlServer(configuration["ConnectionStrings:localDB"]);


        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<GEOElementos>()
            //    .HasOne(i => i.Elemento)
            //    .WithMany(b => b.ele)
            //    .HasForeignKey(p => p.BlogId)
            //    .HasConstraintName("ForeignKey_Post_Blog");
        }

        public DbSet<GEOParques> GEOParques { get; set; }
        public DbSet<GEOInventario> GEOInventario { get; set; }
        public DbSet<GEOElementos> GEOElementos { get; set; }
        public DbSet<GEOCoordenadas> GEOCoordenadas { get; set; }
        public DbSet<APIGEO.Models.GEOUsuarios> GEOUsuarios { get; set; }

       
    }
}
