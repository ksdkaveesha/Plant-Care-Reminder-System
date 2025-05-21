using System.ComponentModel.DataAnnotations;

namespace Plant_Care_Reminder_System.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }

        public string user_name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string? token { get; set; }

    }
}
