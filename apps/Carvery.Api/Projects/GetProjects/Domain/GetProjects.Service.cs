using Carvery.Database.Entities;

namespace Api.Features.Projects.GetProjects.Domain;

public class GetProjectsService(IGetProjectsPersistence persistence)
{
    private readonly IGetProjectsPersistence _persistence = persistence;

    public Task<IReadOnlyList<Project>> ExecuteAsync(CancellationToken cancellationToken)
    {
        return _persistence.ReadAsync(cancellationToken);
    }
}
