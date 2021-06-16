
export class PageCatalogModel {
  idCatalogPage: number;
  title: string;
  description: string;
  companyName: string;
  owner: string;
  status: string;
  creationDate: Date;

  constructor(id: number, title: string, description: string, companyName: string, owner: string, status: string, creationDate: Date) {
    this.idCatalogPage = id;
    this.title = title;
    this.description = description;
    this.companyName = companyName;
    this.owner = owner;
    this.status = status;
    this.creationDate = creationDate;
  }
}
