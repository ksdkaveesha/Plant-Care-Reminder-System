namespace Plant_Care_Reminder_System.Services
{
    public interface IUserAddService
    {
        Task<bool> AddUserAsync(string username, string email, string password);
    }
}
