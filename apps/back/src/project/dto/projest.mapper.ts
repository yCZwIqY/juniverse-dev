import { Project } from '../project.entity';
import { ProjectDTO } from './ProjectDTO';

export function toProjectDTO(project: Project): ProjectDTO {
  const dto = new ProjectDTO(
    project.id,
    project.title,
    project.thumbnail,
    project.startDate,
  );

  dto.video = project.video;
  dto.images = project.images;
  dto.endDate = project.endDate;
  dto.summary = project.summary;
  dto.description = project.description;
  dto.memberCount = project.memberCount;
  dto.gitHubUrl = project.gitHubUrl;
  dto.demoUrl = project.demoUrl;
  dto.role = project.role;
  dto.techs = (project.techs ?? []).map((tech) => tech.name);
  return dto;
}
