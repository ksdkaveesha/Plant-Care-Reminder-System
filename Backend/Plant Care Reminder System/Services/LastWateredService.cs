using System.Data;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;

namespace Plant_Care_Reminder_System.Services
{
    public class LastWateredService : ILastWateredService
    {
        private readonly string _connectionString = "Server=localhost\\SQLEXPRESS;Database=PlantCareDB;Trusted_Connection=True;TrustServerCertificate=True;";

        public async Task<bool> UpdateLastWateredDateAsync(int plantId, DateTime lastWateredDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_UpdateLastWatered", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PlantId", plantId);
                cmd.Parameters.AddWithValue("@LastWatered", lastWateredDate);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();

                return rowsAffected > 0;
            }
        }
    }
}
