
export class CatalogModel {
  title: string;
  description: string;
  companyName: string;
  idAppUser: number;

  constructor(title: string, description: string, companyName: string, idAppUser: number) {
    this.title = title;
    this.description = description;
    this.companyName = companyName;
    this.idAppUser = idAppUser;
  }
}
