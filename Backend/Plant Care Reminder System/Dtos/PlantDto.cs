namespace Plant_Care_Reminder_System.Dtos
{
    public class PlantDto
    {
        public int user_id { get; set; }
        public string plant_name { get; set; }
        public string species { get; set; }
        public int watering_frequency { get; set; }
        public int fertilizing_frequency { get; set; }
        public string care_instructions { get; set; }
    }
}
