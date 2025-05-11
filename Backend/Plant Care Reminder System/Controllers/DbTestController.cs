using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PlantCareAPI.Data;
using System.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly DbHelper _db;

    public TestController(IConfiguration config)
    {
        _db = new DbHelper(config.GetConnectionString("DefaultConnection"));
    }

    [HttpGet("check")]
    public IActionResult CheckConnection()
    {
        try
        {
            using (SqlConnection conn = _db.GetConnection())
            {
                conn.Open();
                return Ok("✅ Connected to SQL Server successfully.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"❌ Connection failed: {ex.Message}");
        }
    }
}
