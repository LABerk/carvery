using Carvery.Database.Entities;

namespace Api.Features.Projects.GetProjects.Domain;

public interface IGetProjectsPersistence
{
    Task<IReadOnlyList<Project>> ReadAsync(CancellationToken cancellationToken);
}
