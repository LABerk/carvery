using Carvery.Database.Entities;

namespace Api.Features.Projects.UpdateProject.Domain;

public class UpdateProjectService(IUpdateProjectPersistence persistence)
{
    private readonly IUpdateProjectPersistence _persistence = persistence;

    public Task<Project?> ExecuteAsync(
        UpdateProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        return _persistence.UpdateAsync(command, cancellationToken);
    }
}
