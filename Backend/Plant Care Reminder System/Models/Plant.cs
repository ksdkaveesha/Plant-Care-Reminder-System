namespace Plant_Care_Reminder_System.Models
{
    public class Plant
    {
        public int PlantId { get; set; }
        public int UserId { get; set; }
        public string PlantName { get; set; }
        public string Species { get; set; }
        public int WateringFrequency { get; set; }
        public int FertilizingFrequency { get; set; }
        public string CareInstructions { get; set; }
        public DateTime? LastWatered { get; set; }
        public DateTime? LastFertilized { get; set; }

    }
}
