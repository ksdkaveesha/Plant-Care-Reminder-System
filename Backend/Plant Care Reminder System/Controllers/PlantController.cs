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
        private readonly IUpdatePlantService _updatePlantService;

        public PlantController(IAddPlantService addPlantService, IGetPlantByUserService getPlantService, ILastWateredService lastWateredService, ILastFertilizedService lastFertilizedService, IUpdatePlantService updatePlantService)
        {
            _addPlantService = addPlantService;
            _getPlantService = getPlantService;
            _lastWateredService = lastWateredService;
            _lastFertilizedService = lastFertilizedService;
            _updatePlantService = updatePlantService;
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
            if (!success)
                return BadRequest("Update failed");

            return Ok(new { message = "Watered date updated successfully" });

        }


        [HttpPut("UpdateLastFertilizedDate/{plantId}")]
        public async Task<IActionResult> UpdateLastFertilizedDate(int plantId, [FromBody] DateTime lastFertilizedDate)
        {
            bool success = await _lastFertilizedService.UpdateLastWateredDateAsync(plantId, lastFertilizedDate);
            if (success)
                return Ok(new { message = "Fertilized date updated successfully" });
            return BadRequest("Failed to update last fertilized date.");
        }


        [HttpPut("UpdatePlant")]
        public async Task<IActionResult> UpdatePlant(int plant_id,string plant_name,string species,int watering_frequency,int fertilizing_frequency,string care_instructions)
                {
                    Console.WriteLine($"Updating plant {plant_id} with name {plant_name}...");

                    bool success = await _updatePlantService.UpdatePlantAsync(
                        plant_id, plant_name, species, watering_frequency, fertilizing_frequency, care_instructions);

                    if (success)
                        return Ok("Plant Updated successfully.");

                    return NotFound("Failed to update plant. Make sure the plant ID exists.");
                }
    }

}
