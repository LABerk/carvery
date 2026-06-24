using Carvery.Database.Entities;

namespace Api.Features.Projects.UpdateProject.Domain;

public interface IUpdateProjectPersistence
{
    Task<Project?> UpdateAsync(UpdateProjectCommand command, CancellationToken cancellationToken);
}
