using Microsoft.AspNetCore.Mvc;
using Plant_Care_Reminder_System.Dtos;
using Plant_Care_Reminder_System.Services;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantController : Controller
    {
        private readonly IAddPlantService _addPlantService;
        private readonly IGetPlantByUserService _getPlantService;
        private readonly ILastWateredService _lastWateredService;
        private readonly ILastFertilizedService _lastFertilizedService;

        public PlantController(IAddPlantService addPlantService, IGetPlantByUserService getPlantService, ILastWateredService lastWateredService, ILastFertilizedService lastFertilizedService)
        {
            _addPlantService = addPlantService;
            _getPlantService = getPlantService;
            _lastWateredService = lastWateredService;
            _lastFertilizedService = lastFertilizedService;
        }


        [HttpPost("AddPlant")]
        public async Task<IActionResult> AddPlant([FromBody] PlantDto plant)
        {
            bool success = await _addPlantService.AddPlantAsync(plant.user_id, plant.plant_name, plant.species, plant.watering_frequency, plant.fertilizing_frequency, plant.care_instructions);
            if (success)
                return Ok("Plant added successfully.");
            return BadRequest("Failed to add plant.");
        }


        [HttpGet("GetPlantById/{userId}")]
        public async Task<IActionResult> GetPlantById(int userId)
        {
            var plants = await _getPlantService.GetPlantsByUserAsync(userId);
            if (plants == null || !plants.Any())
                return NotFound("No plants found for this user.");
            return Ok(plants);
        }


        [HttpPut("UpdateLastWateredDate/{plantId}")]
        public async Task<IActionResult> UpdateLastWateredDate(int plantId, [FromBody] DateTime lastWateredDate)
        {
            bool success = await _lastWateredService.UpdateLastWateredDateAsync(plantId, lastWateredDate);
            if (success)
                return Ok("Last watered date updated successfully.");
            return BadRequest("Failed to update last watered date.");
        }


        [HttpPut("UpdateLastFertilizedDate/{plantId}")]
        public async Task<IActionResult> UpdateLastFertilizedDate(int plantId, [FromBody] DateTime lastFertilizedDate)
        {
            bool success = await _lastFertilizedService.UpdateLastWateredDateAsync(plantId, lastFertilizedDate);
            if (success)
                return Ok("Last fertilized date updated successfully.");
            return BadRequest("Failed to update last fertilized date.");
        }
    }

}
