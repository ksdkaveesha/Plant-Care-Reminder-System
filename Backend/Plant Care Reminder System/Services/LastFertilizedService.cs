
using System.Data;
using Microsoft.Data.SqlClient;

namespace Plant_Care_Reminder_System.Services
{
    public class LastFertilizedService : ILastFertilizedService
    {
        private string _connectionString = "Server=localhost\\SQLEXPRESS;Database=PlantCareDB;Trusted_Connection=True;TrustServerCertificate=True;";
        public Task<bool> UpdateLastWateredDateAsync(int plantId, DateTime lastFertilizedDate)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_UpdateLastFertilized", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PlantId", plantId);
                cmd.Parameters.AddWithValue("@LastFertilized", lastFertilizedDate);
                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                return Task.FromResult(rowsAffected > 0);
            }
        }
    }
}
