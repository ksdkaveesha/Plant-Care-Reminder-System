using Microsoft.EntityFrameworkCore;
using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
    }
}
