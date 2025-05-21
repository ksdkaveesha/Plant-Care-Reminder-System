using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System.Services
{
    public interface IUserService
    {
        User? Authenticate(string username, string password);
    }
}
