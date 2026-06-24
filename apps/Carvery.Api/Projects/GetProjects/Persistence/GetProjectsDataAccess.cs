using Api.Features.Projects.GetProjects.Domain;
using Carvery.Database.Context;
using Carvery.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Projects.GetProjects.Persistence;

public class GetProjectsDataAccess(AppDbContext dbContext) : IGetProjectsPersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<IReadOnlyList<Project>> ReadAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Projects
            .OrderByDescending(project => project.CreatedOn)
            .ToListAsync(cancellationToken);
    }
}
