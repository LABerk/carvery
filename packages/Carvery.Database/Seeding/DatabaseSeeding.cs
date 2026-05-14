using Carvery.Database.Context;

namespace Carvery.Database.Seeding;

public static class DatabaseSeeding
{
    public static Task SeedAsync(AppDbContext _dbContext, CancellationToken _cancellationToken = default)
    {
        return Task.CompletedTask;
    }
}