using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System.Services
{
    public interface IGenerateTokenService
    {
        string GenerateJwtToken(User user_name);
    }
}
