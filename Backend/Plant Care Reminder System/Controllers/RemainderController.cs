using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Plant_Care_Reminder_System.Services;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]    
    public class RemainderController : Controller
    {
        private readonly IGetRemainderService _addRemainderService;

        public RemainderController(IGetRemainderService addRemainderService)
        {
            _addRemainderService = addRemainderService;
        }

        [HttpGet]
        [Route("GetRemainder/{userId}/{reminderDate}")]
        public async Task<IActionResult> GetRemainder(int userId, DateTime reminderDate)
        {
            var reminders = await _addRemainderService.GetRemindersAsync(userId, reminderDate);
            if (reminders == null || !reminders.Any())
                return NotFound("No reminders found for this user.");
            return Ok(reminders);
        }
    }
}
