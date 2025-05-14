namespace Plant_Care_Reminder_System.Services
{
    public interface ILastWateredService
    {
        Task<bool> UpdateLastWateredDateAsync(int plantId, DateTime lastWateredDate);
    }
}
