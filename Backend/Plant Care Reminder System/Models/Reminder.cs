namespace Plant_Care_Reminder_System.Models
{
    public class Reminder
    {
        public int reminder_id { get; set; }
        public int plant_id { get; set; }
        public int user_id { get; set; }
        public DateTime reminder_date { get; set; }
        public string reminder_type { get; set; }
    }
}
