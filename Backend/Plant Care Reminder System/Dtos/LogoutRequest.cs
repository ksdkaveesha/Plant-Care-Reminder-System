using System.Text.Json.Serialization;


namespace Plant_Care_Reminder_System.Dtos
{
    public class LogoutRequest
    {
        [JsonPropertyName("username")]
        public string user_name { get; set; }
    }
}
