using System.Data;
using Microsoft.Data.SqlClient;
using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System.Services
{
    public class GetRemainderService : IGetRemainderService
    {
        private string _configuration = "Server=localhost\\SQLEXPRESS;Database=PlantCareDB;Trusted_Connection=True;TrustServerCertificate=True;";
        
        public Task<List<Reminder>> GetRemindersAsync(int user_id, DateTime reminder_date)
        {
            var reminder = new List<Reminder>();

            using (SqlConnection conn = new SqlConnection(_configuration))
            using (SqlCommand cmd = new SqlCommand("sp_GetRemindersByDate", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@UserId", SqlDbType.Int).Value = user_id;
                cmd.Parameters.Add("@Date", SqlDbType.Date).Value = reminder_date.Date;
                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        reminder.Add(new Reminder
                        {
                            reminder_id = reader.GetInt32(reader.GetOrdinal("reminder_id")),
                            plant_id = reader.GetInt32(reader.GetOrdinal("plant_id")),
                            user_id = reader.GetInt32(reader.GetOrdinal("user_id")),
                            reminder_date = reader.GetDateTime(reader.GetOrdinal("reminder_date")),
                            reminder_type = reader.GetString(reader.GetOrdinal("reminder_type"))
                        });
                    }
                }
            }
            return Task.FromResult(reminder);
        }
    }
}
