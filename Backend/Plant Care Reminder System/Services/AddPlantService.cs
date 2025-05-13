using System.Data;
using Microsoft.Data.SqlClient;

namespace Plant_Care_Reminder_System.Services
{
    public class AddPlantService : IAddPlantService
    {
        private string _connectionString = "Server=localhost\\SQLEXPRESS;Database=PlantCareDB;Trusted_Connection=True;TrustServerCertificate=True;";
        public async Task<bool> AddPlantAsync(int user_id, string plant_name, string species, int watering_frequency, int fertilizing_frequency, string care_instructions)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_AddPlant", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", user_id);
                    cmd.Parameters.AddWithValue("@PlantName", plant_name);
                    cmd.Parameters.AddWithValue("@Species", species);
                    cmd.Parameters.AddWithValue("@WateringFrequency", watering_frequency);
                    cmd.Parameters.AddWithValue("@FertilizingFrequency", fertilizing_frequency);
                    cmd.Parameters.AddWithValue("@CareInstructions", care_instructions);
                    await conn.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
        }
    }
    

}

