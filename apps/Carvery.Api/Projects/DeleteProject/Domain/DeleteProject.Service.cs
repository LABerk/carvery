namespace Api.Features.Projects.DeleteProject.Domain;

public class DeleteProjectService(IDeleteProjectPersistence persistence)
{
    private readonly IDeleteProjectPersistence _persistence = persistence;

    public Task<bool> ExecuteAsync(
        DeleteProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        return _persistence.DeleteAsync(command, cancellationToken);
    }
}
