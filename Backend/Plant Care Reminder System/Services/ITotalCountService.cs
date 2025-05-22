namespace Plant_Care_Reminder_System.Services
{
    public interface ITotalCountService
    {
        Task<int> GetTotalUsersAsync();
        Task<int> GetTotalPlantsAsync();
    }
}
