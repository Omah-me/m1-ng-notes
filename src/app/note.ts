import { Tag } from './tag';

export class Note {
  private static lastId = 0;

  id: number;
  title: string;
  tags: Tag[];
  content: string;

  constructor(title: string, content: string = '', tags: Tag[] = [], id?: number) {
    this.title = title;
    this.content = content;
    this.tags = tags;

    if (id !== undefined) {
      this.id = id;
      if (id > Note.lastId) {
        Note.lastId = id;
      }
    } else {
      Note.lastId++;
      this.id = Note.lastId;
    }
  }
}
