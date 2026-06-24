using Api.Features.Projects.DeleteProject.Domain;
using Carvery.Database.Context;

namespace Api.Features.Projects.DeleteProject.Persistence;

public class DeleteProjectDataAccess(AppDbContext dbContext) : IDeleteProjectPersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<bool> DeleteAsync(
        DeleteProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        var project = await _dbContext.Projects.FindAsync(new object[] { command.Id }, cancellationToken);
        if (project is null)
        {
            return false;
        }

        _dbContext.Projects.Remove(project);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }
}
