namespace Carvery.Database.Entities;

public class Project
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Wood { get; set; }

    public required string Status { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}
