namespace Plant_Care_Reminder_System.Services
{
    public interface IUpdatePlantService
    {
        Task<bool> UpdatePlantAsync(int plant_id, string plant_name, string species, int watering_frequency, int fertilizing_frequency, string care_instructions);
    }
}
