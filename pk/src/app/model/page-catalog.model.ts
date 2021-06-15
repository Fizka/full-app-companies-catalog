import {UserModel} from "./user.model";

export class PageCatalogModel {
  id: number;
  title: string;
  description: string;
  owner: string;
  status: string;
  creationDate: Date;


  constructor(id: number, title: string, description: string, owner: string, status: string, creationDate: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.status = status;
    this.creationDate = creationDate;
  }
}
