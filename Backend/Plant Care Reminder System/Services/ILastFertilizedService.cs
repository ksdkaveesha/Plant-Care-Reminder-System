namespace Plant_Care_Reminder_System.Services
{
    public interface ILastFertilizedService
    {
        Task<bool> UpdateLastWateredDateAsync(int plantId, DateTime lastFertilizedDate);
    }
}
