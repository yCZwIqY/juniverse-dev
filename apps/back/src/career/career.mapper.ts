import { Career } from './career.entity';
import { CareerDTO } from './dto/CareerDTO';

export function toCareerDTO(career: Career): CareerDTO {
  const dto = new CareerDTO(
    career.id,
    career.name,
    career.position,
    career.startDate,
  );
  dto.endDate = career.endDate;
  dto.inOffice = !career.endDate;
  dto.contents = career.contents;
  dto.techs = (career.techs ?? []).map((tech) => tech.name);
  return dto;
}
