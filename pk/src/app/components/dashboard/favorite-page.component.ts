import {AgRendererComponent} from 'ag-grid-angular';
import {Component} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {PageCatalogModel} from '../../model/page-catalog.model';
import {UserModel} from '../../model/user.model';
import {LoginService} from '../../service/login.service';
import {AppUserService} from '../../service/app-user.service';
import {map} from 'rxjs/operators';

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
              private userService: AppUserService) {
  }

  isEmpty(value): boolean {
    return !value;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    const userId = this.loginService.getId();
    let user;
    if (!!userId) {
      this.userService.getCustomer(userId).pipe(map(data => {
        if (!data.favorite) {
          data.favourite = [];
        }
        return data;
      })).subscribe(data => {
        user = data;
        this.rowData = user;
        this.setFavourite(params);
      }, error => console.log(error));
    }
  }

  setFavourite(params: ICellRendererParams): void {
    if (!this.rowData) {
      this.favorite = false;
    } else {
      this.favorite = this.isEmpty(this.getFavoriteForUser(params.data));
    }
  }

  refresh(params: any): boolean {
    return false;
  }

  addToFavorite(data: PageCatalogModel) {
    if (this.rowData) {
      this.favorite = !this.favorite;
      const index = this.rowData.favorite.findIndex(row => row === data.idCatalogPage);
      this.favorite === false ? this.rowData.favorite.push(data.idCatalogPage) : this.rowData.favorite.splice(index, 1);
      this.userService.updateFavouritesCustomer(data.idCatalogPage).subscribe();
    }
    this.preventRowSelection();
  }

  preventRowSelection(): void {
    const previousValue = this.params.node.gridOptionsWrapper.gridOptions.suppressRowClickSelection;
    this.params.node.gridOptionsWrapper.gridOptions.suppressRowClickSelection = true;
    setTimeout(() => {
      this.params.node.gridOptionsWrapper.gridOptions.suppressRowClickSelection = previousValue;
    });
  }

  getFavoriteForUser(data: PageCatalogModel) {
    return this.rowData.favorite.find(row => row === data.idCatalogPage);
  }

}

