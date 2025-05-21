using Microsoft.IdentityModel.Tokens;
using Plant_Care_Reminder_System.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Plant_Care_Reminder_System.Services
{
    public class GenerateTokenService : IGenerateTokenService
    {
        private readonly IConfiguration _config;

        public GenerateTokenService(IConfiguration config)
        {
            _config = config;
        }

        // Fix: Update the method signature to match the interface
        public string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.user_name),
                new Claim("userId", user.user_id.ToString()) // ← include this
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:ExpiresInMinutes"]));

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
