using Api.Features.Projects.GetProjectById.Domain;
using Carvery.Database.Context;
using Carvery.Database.Entities;

namespace Api.Features.Projects.GetProjectById.Persistence;

public class GetProjectByIdDataAccess(AppDbContext dbContext) : IGetProjectByIdPersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<Project?> ReadAsync(
        GetProjectByIdCommand command,
        CancellationToken cancellationToken
    )
    {
        return await _dbContext.Projects.FindAsync(new object[] { command.Id }, cancellationToken);
    }
}
