using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Plant_Care_Reminder_System.Services;
using Plant_Care_Reminder_System.Dtos;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;
        private readonly IGenerateTokenService _tokenService;
        private readonly ApplicationDbContext _context;

        public AuthController(IUserService userService, IGenerateTokenService tokenService, ApplicationDbContext context)
        {
            _userService = userService;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto request)
        {
            var user = _userService.Authenticate(request.Username, request.Password);
            if (user == null)
                return Unauthorized("Invalid credentials");

            var token = _tokenService.GenerateJwtToken(user);
            user.token = token;
            _context.User.Update(user);
            _context.SaveChanges();

            return Ok(new { token });
        }

        [HttpPost("logout")]
        public IActionResult Logout([FromBody] LogoutRequest request)
        {
            Console.WriteLine("Received logout for user: " + request.user_name); // ✅ Debug

            if (string.IsNullOrEmpty(request.user_name))
                return BadRequest("Username is required");

            var user = _context.User.FirstOrDefault(u => u.user_name == request.user_name);
            if (user == null)
            {
                Console.WriteLine("User not found in DB");
                return NotFound("User not found");
            }

            Console.WriteLine("Found user in DB. Clearing token.");
            user.token = null;
            _context.SaveChanges();

            return Ok(new { message = "Logged out successfully" });

        }
    }
}
