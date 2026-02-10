export class CreateProjectDto {
  title!: string;
  description!: string;
  content!: string;
  position!: string;
  contribution!: string;
  startDate!: string;
  endDate!: string;
  tags!: string[];
  gitHubUrl?: string;
  demoUrl?: string;
  images?: Express.Multer.File[];
  imageUrls?: string[];
  isToy!: boolean;
  sourceCode?: Record<string, string>;
}
