using Api.Features.Health;
using Api.Features.Home;
using Api.Features.Notes;
using Carvery.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCarveryDatabase(builder.Configuration);
builder.Services.AddHomeFeature();
builder.Services.AddHealthFeature();
builder.Services.AddNotesFeature();
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
