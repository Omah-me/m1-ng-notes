export class Tag {
  private static lastId = 0;

  id: number;
  name: string;
  color: string;

  constructor(name: string, color: string = '#000000', id?: number) {
    this.name = name;
    this.color = color;
    if (id !== undefined) {
      this.id = id;
      if (id > Tag.lastId) {
        Tag.lastId = id;
      }
    } else {
      Tag.lastId++;
      this.id = Tag.lastId;
    }
  }
   
}