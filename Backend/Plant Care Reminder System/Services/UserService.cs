using Plant_Care_Reminder_System;
using Plant_Care_Reminder_System.Models;
using Plant_Care_Reminder_System.Services; // Adjust namespace if needed

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public User? Authenticate(string username, string password)
    {
        // Get user from database by username
        var user = _context.User.FirstOrDefault(u => u.user_name == username);

        if (user == null)
            return null; // User not found

        // Verify the plain password against the stored hashed password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.password);

        if (!isPasswordValid)
            return null; // Password doesn't match

        return user; // Authentication successful
    }
}
