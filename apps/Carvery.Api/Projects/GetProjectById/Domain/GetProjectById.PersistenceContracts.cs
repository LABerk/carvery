using Carvery.Database.Entities;

namespace Api.Features.Projects.GetProjectById.Domain;

public interface IGetProjectByIdPersistence
{
    Task<Project?> ReadAsync(GetProjectByIdCommand command, CancellationToken cancellationToken);
}
