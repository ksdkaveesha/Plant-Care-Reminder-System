using Microsoft.AspNetCore.Mvc;
using Plant_Care_Reminder_System.Dtos;
using Plant_Care_Reminder_System.Services;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantController : Controller
    {
        private readonly IAddPlantService _plantService;

        public PlantController(IAddPlantService plantService)
        {
            _plantService = plantService;
        }

        [HttpPost("AddPlant")]
        public async Task<IActionResult> AddPlant([FromBody] PlantDto plant)
        {
            bool success = await _plantService.AddPlantAsync(plant.user_id, plant.plant_name, plant.species, plant.watering_frequency, plant.fertilizing_frequency, plant.care_instructions);
            if (success)
                return Ok("Plant added successfully.");
            return BadRequest("Failed to add plant.");
        }        
    }

}
