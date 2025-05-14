using Plant_Care_Reminder_System.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();


builder.Services.AddScoped<IUserAddService, UserAddService>();
builder.Services.AddScoped<IAddPlantService, AddPlantService>();
builder.Services.AddScoped<IGetPlantByUserService, GetPlantByUserService>();
builder.Services.AddScoped<IGetRemainderService, GetRemainderService>();
builder.Services.AddScoped<ILastWateredService, LastWateredService>();
builder.Services.AddScoped<ILastFertilizedService, LastFertilizedService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))
        };
    });

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
