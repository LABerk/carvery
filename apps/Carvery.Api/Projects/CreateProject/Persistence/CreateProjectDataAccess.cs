using Api.Features.Projects.CreateProject.Domain;
using Carvery.Database.Context;
using Carvery.Database.Entities;

namespace Api.Features.Projects.CreateProject.Persistence;

public class CreateProjectDataAccess(AppDbContext dbContext) : ICreateProjectPersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<Project> CreateAsync(
        CreateProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        var project = new Project
        {
            Name = command.Name,
            Wood = command.Wood,
            Status = command.Status,
            Description = command.Description,
        };

        _dbContext.Projects.Add(project);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return project;
    }
}
