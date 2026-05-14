using Carvery.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Carvery.Database.Context;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Note> Notes => Set<Note>();
}