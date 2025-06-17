export class UploadDTO {
  key: string;
  src: string;
  name?: string;

  constructor(key: string, src: string) {
    this.key = key;
    this.src = src;
  }
}
