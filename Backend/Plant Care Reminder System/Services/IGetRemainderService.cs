using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System.Services
{
    public interface IGetRemainderService
    {
        Task<List<Reminder>> GetRemindersAsync(int user_id, DateTime reminder_date);
    }
}
