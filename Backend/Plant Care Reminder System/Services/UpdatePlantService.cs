using Microsoft.Data.SqlClient;
using Plant_Care_Reminder_System.Services;
using System.Data;
using System.Threading.Tasks;

public class UpdatePlantService : IUpdatePlantService
{
    private string _connectionString = "Server=localhost\\SQLEXPRESS;Database=PlantCareDB;Trusted_Connection=True;TrustServerCertificate=True;";

    public async Task<bool> UpdatePlantAsync(int plant_id, string plant_name, string species, int watering_frequency, int fertilizing_frequency, string care_instructions)
    {
        using (SqlConnection connection = new SqlConnection(_connectionString))
        {
            using (SqlCommand command = new SqlCommand("sp_UpdatePlant", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@PlantId", plant_id);
                command.Parameters.AddWithValue("@PlantName", plant_name);
                command.Parameters.AddWithValue("@Species", species);
                command.Parameters.AddWithValue("@WateringFrequency", watering_frequency);
                command.Parameters.AddWithValue("@FertilizingFrequency", fertilizing_frequency);
                command.Parameters.AddWithValue("@CareInstructions", care_instructions);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();

                Console.WriteLine($"Update result: {rowsAffected} rows affected."); // Add this for debugging

                return rowsAffected > 0;
            }
        }
    }
}
