using Carvery.Database.Entities;

namespace Api.Features.Projects.CreateProject.Domain;

public class CreateProjectService(ICreateProjectPersistence persistence)
{
    private readonly ICreateProjectPersistence _persistence = persistence;

    public Task<Project> ExecuteAsync(CreateProjectCommand command, CancellationToken cancellationToken)
    {
        return _persistence.CreateAsync(command, cancellationToken);
    }
}
