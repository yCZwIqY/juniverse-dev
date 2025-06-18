export class CommentDTO {
  id?: number;
  name: string;
  email: string;
  comment: string;

  constructor(name: string, comment: string, email: string) {
    this.name = name;
    this.comment = comment;
    this.email = email;
  }
}
