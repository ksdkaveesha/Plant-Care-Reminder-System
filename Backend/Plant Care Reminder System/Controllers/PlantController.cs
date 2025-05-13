using Microsoft.AspNetCore.Mvc;
using Plant_Care_Reminder_System.Services;

namespace Plant_Care_Reminder_System.Controllers
{
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

        public class PlantDto
        {
            public int user_id { get; set; }
            public string plant_name { get; set; }
            public string species { get; set; }
            public int watering_frequency { get; set; }
            public int fertilizing_frequency { get; set; }
            public string care_instructions { get; set; }
        }
    }

}
