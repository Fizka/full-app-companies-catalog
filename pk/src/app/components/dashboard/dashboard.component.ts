import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FavoritePageComponent} from './favorite-page.component';
import {LoginService} from '../../service/login.service';
import {CatalogPageService} from '../../service/catalog-page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gridApi;
  title = 'Companies Catalog';
  searchText: string;

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true
  };

  columnDefs = [
    {
      headerName: '', width: 105, cellRendererFramework: FavoritePageComponent,
      sortable: false, filter: false, singleClickEdit: false, editable: false, suppressSizeToFit: true
    },
    {headerName: 'Title', field: 'title', sortable: true, filter: true},
    {headerName: 'Description', field: 'description', sortable: true, filter: true, resizable: false, width: 350},
    {headerName: 'Owner', field: 'owner', sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Creation date', field: 'creationDate', sortable: true, filter: true}
  ];
  rowData = [];

  constructor(private router: Router,
              private loginService: LoginService,
              private catalogPageService: CatalogPageService) {
  }

  ngOnInit() {
    this.loadData();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  loadData(): void {
    this.catalogPageService.getCustomersList().subscribe(data => this.rowData, error => console.log(error));
  }

  goToTemplateUser(): void {
    this.router.navigate([`/user/profile/username1`], {state: {userId: 1}});
  }

  addNewCatalogPage(): void {
    this.router.navigateByUrl('/page/add');
  }

  searchCatalogPages(): void {
    if (this.searchText) {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.gridApi.setQuickFilter(this.searchText);
    }
  }

  isAdmin(): boolean {
    return this.loginService.isAdmin();
  }
}
