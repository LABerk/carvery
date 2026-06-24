using Carvery.Database.Entities;

namespace Api.Features.Projects.CreateProject.Domain;

public interface ICreateProjectPersistence
{
    Task<Project> CreateAsync(CreateProjectCommand command, CancellationToken cancellationToken);
}
