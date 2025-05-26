using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Plant_Care_Reminder_System.Models;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageGenerationController : ControllerBase // Fix: Ensure the class inherits from ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ImageGenerationController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("generate-image")]
        public async Task<IActionResult> GenerateImage([FromBody] ImageRequest promptModel)
        {
            if (string.IsNullOrWhiteSpace(promptModel.Prompt))
                return BadRequest("Prompt cannot be empty.");

            string prompt = promptModel.Prompt;
            string GEMINI_API_KEY = "AIzaSyAHMlXTpzfZEfHXevb-3XjBKHiQNcATGW8"; 
            string MODEL_ID = "gemini-2.0-flash-preview-image-generation";
            string GENERATE_CONTENT_API = "streamGenerateContent";
            string endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_ID}:{GENERATE_CONTENT_API}?key={GEMINI_API_KEY}";

            var requestPayload = new
            {
                contents = new[]
                {
                    new {
                        role = "user",
                        parts = new[] {
                            new { text = prompt }
                        }
                    }
                },
                generationConfig = new
                {
                    responseModalities = new[] { "IMAGE", "TEXT" },
                    response_mime_type = "text/plain"
                }
            };

            var content = new StringContent(JsonSerializer.Serialize(requestPayload));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _httpClient.PostAsync(endpoint, content);

            if (!response.IsSuccessStatusCode)
            {
                var errorText = await response.Content.ReadAsStringAsync();
                Console.WriteLine("❌ Gemini API error: " + errorText);
                return BadRequest("Failed to generate image");
            }

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);

            string? base64Image = null;

            var parts = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts");

            foreach (var part in parts.EnumerateArray())
            {
                if (part.TryGetProperty("inlineData", out JsonElement inlineData) &&
                    inlineData.TryGetProperty("data", out JsonElement dataElement))
                {
                    base64Image = dataElement.GetString();
                    break;
                }
            }

            if (string.IsNullOrWhiteSpace(base64Image))
                return BadRequest("No image was returned.");

            var imageBytes = Convert.FromBase64String(base64Image);
            return File(imageBytes, "image/png"); // Fix: Ensure the class inherits from ControllerBase to use File() method
        }
    }
}
