using Carvery.Database.Entities;

namespace Api.Features.Projects.GetProjectById.Domain;

public class GetProjectByIdService(IGetProjectByIdPersistence persistence)
{
    private readonly IGetProjectByIdPersistence _persistence = persistence;

    public Task<Project?> ExecuteAsync(
        GetProjectByIdCommand command,
        CancellationToken cancellationToken
    )
    {
        return _persistence.ReadAsync(command, cancellationToken);
    }
}
