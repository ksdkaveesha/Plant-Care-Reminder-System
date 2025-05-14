using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System.Services
{
    public interface IGetPlantByUserService
    {
        Task<List<Plant>> GetPlantsByUserAsync(int userId);
    }
}
