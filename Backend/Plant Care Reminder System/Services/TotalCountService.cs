using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Plant_Care_Reminder_System.Services;

public class TotalCountService : ITotalCountService
{
    private readonly IConfiguration _configuration;

    public TotalCountService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<int> GetTotalUsersAsync()
    {
        using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        await conn.OpenAsync();

        var cmd = new SqlCommand("SELECT count(*) FROM [PlantCareDB].[dbo].[user]", conn);
        return (int)(await cmd.ExecuteScalarAsync());
    }

    public async Task<int> GetTotalPlantsAsync()
    {
        using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        await conn.OpenAsync();

        var cmd = new SqlCommand("SELECT count(*) FROM [PlantCareDB].[dbo].[plant]", conn);
        return (int)(await cmd.ExecuteScalarAsync());
    }
}
