using Carvery.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDependencyInjection(builder.Configuration);

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCarveryCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
