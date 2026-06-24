namespace Api.Features.Projects.DeleteProject.Domain;

public interface IDeleteProjectPersistence
{
    Task<bool> DeleteAsync(DeleteProjectCommand command, CancellationToken cancellationToken);
}
