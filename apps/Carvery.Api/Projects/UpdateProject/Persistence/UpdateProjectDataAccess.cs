using Api.Features.Projects.UpdateProject.Domain;
using Carvery.Database.Context;
using Carvery.Database.Entities;

namespace Api.Features.Projects.UpdateProject.Persistence;

public class UpdateProjectDataAccess(AppDbContext dbContext) : IUpdateProjectPersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<Project?> UpdateAsync(
        UpdateProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        var project = await _dbContext.Projects.FindAsync(new object[] { command.Id }, cancellationToken);
        if (project is null)
        {
            return null;
        }

        project.Name = command.Name;
        project.Wood = command.Wood;
        project.Status = command.Status;
        project.Description = command.Description;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return project;
    }
}
