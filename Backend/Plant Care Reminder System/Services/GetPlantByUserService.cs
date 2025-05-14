using Microsoft.Data.SqlClient;
using System.Data;
using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System.Services
{
    public class GetPlantByUserService : IGetPlantByUserService
    {
        private string _configuration = "Server=localhost\\SQLEXPRESS;Database=PlantCareDB;Trusted_Connection=True;TrustServerCertificate=True;";

        public async Task<List<Plant>> GetPlantsByUserAsync(int userId)
        {
            var plants = new List<Plant>();

            using (SqlConnection conn = new SqlConnection(_configuration))
            using (SqlCommand cmd = new SqlCommand("sp_GetPlantsByUser", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", userId);

                await conn.OpenAsync();
                using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        plants.Add(new Plant
                        {
                            PlantId = reader.GetInt32(reader.GetOrdinal("plant_id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                            PlantName = reader.GetString(reader.GetOrdinal("plant_name")),
                            Species = reader.GetString(reader.GetOrdinal("species")),
                            WateringFrequency = reader.GetInt32(reader.GetOrdinal("watering_frequency")),
                            FertilizingFrequency = reader.GetInt32(reader.GetOrdinal("fertilizing_frequency")),
                            CareInstructions = reader.GetString(reader.GetOrdinal("core_instructions")),
                            LastWatered = reader.IsDBNull(reader.GetOrdinal("last_watered")) ? null : reader.GetDateTime(reader.GetOrdinal("last_watered")),
                            LastFertilized = reader.IsDBNull(reader.GetOrdinal("last_fertilized")) ? null : reader.GetDateTime(reader.GetOrdinal("last_fertilized")),
                        });
                    }
                }
            }

            return plants;
        }
    }    

 }

