// Program.cs (minimal-hosting model)

using Plant_Care_Reminder_System.Services;

var builder = WebApplication.CreateBuilder(args);

// ---------- Services ----------
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("Dev", b =>
        b.WithOrigins("http://localhost:4200")
         .AllowAnyHeader()
         .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

// your scoped services …
builder.Services.AddScoped<IUserAddService, UserAddService>();
builder.Services.AddScoped<IAddPlantService, AddPlantService>();
builder.Services.AddScoped<IGetPlantByUserService, GetPlantByUserService>();
builder.Services.AddScoped<IGetRemainderService, GetRemainderService>();
builder.Services.AddScoped<ILastWateredService, LastWateredService>();
builder.Services.AddScoped<ILastFertilizedService, LastFertilizedService>();

var app = builder.Build();

// ---------- Middleware ----------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ✱ enable the CORS policy
app.UseCors("Dev");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
