import {AgRendererComponent} from 'ag-grid-angular';
import {Component} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {PageCatalogModel} from '../../model/page-catalog.model';
import {UserModel} from '../../model/user.model';
import {LoginService} from '../../service/login.service';
import {CatalogPageService} from "../../service/catalog-page.service";

@Component({
  selector: 'app-ulubione-column',
  template: `
    <button class="btn-primary btn-favorite" [ngClass]="this.favorite ? 'btn-favorite-added' : 'btn-favorite-blank'"
            (click)="addToFavorite(this.params.data)"></button>`,
  styleUrls: ['./dashboard.component.css']
})
export class FavoritePageComponent implements AgRendererComponent {

  params: any;
  favorite = false;
  rowData: UserModel;

  constructor(private loginService: LoginService,
              private catalogPageService: CatalogPageService) {
  }

  // tslint:disable-next-line:no-shadowed-variable
  isEmpty(value): boolean {
    return !value;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.rowData = this.loginService.getUsers();
    if (!this.rowData) {
      this.favorite = true;
    } else {
      this.favorite = this.isEmpty(this.getFavoriteForUser(params.data));
    }
  }

  refresh(params: any): boolean {
    return false;
  }

  //Mamy favorite?
  addToFavorite(data: PageCatalogModel) {
    if (this.rowData) {
      this.favorite = !this.favorite;
      //const index = this.rowData.czasopisma.findIndex(row => row === data.id);
      //this.favorite === false ? this.rowData.czasopisma.push(data.id) : this.rowData.czasopisma.splice(index, 1);
      //this.catalogPageService.updateCustomer(this.rowData)
    }
  }

  getFavoriteForUser(data: PageCatalogModel) {
    //return this.rowData.czasopisma.find(row => row === data.id);
  }

}

