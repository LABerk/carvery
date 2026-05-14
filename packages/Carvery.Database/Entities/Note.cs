namespace Carvery.Database.Entities;

public class Note
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public string? Content { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}