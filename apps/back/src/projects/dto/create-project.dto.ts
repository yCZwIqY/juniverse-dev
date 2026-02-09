export class CreateProjectDto {
  title!: string;
  description!: string;
  content!: string;
  sourceCode?: string;
  tags!: string[];
  gitHubUrl?: string;
  demoUrl?: string;
  images?: Express.Multer.File[];
  isToy!: boolean;
}
