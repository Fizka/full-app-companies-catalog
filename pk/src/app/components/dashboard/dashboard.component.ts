import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FavoritePageComponent} from './favorite-page.component';
import {LoginService} from '../../service/login.service';
import {CatalogPageService} from '../../service/catalog-page.service';
import {PageCatalogModel} from '../../model/page-catalog.model';

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
    {headerName: 'Title', field: 'title', sortable: true, filter: true},
    {headerName: 'Description', field: 'description', sortable: true, filter: true, resizable: false, width: 350},
    {headerName: 'Owner', field: 'owner', sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Creation date', field: 'creationDate', sortable: true, filter: true}
  ];
  columnDefsUser = [
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
    this.catalogPageService.getPagesList().subscribe(data => {
      data.forEach(data1 => this.rowData = this.mapToCatalogPage(data1));
    }, error => console.log(error));
  }

  mapToCatalogPage(data: any) {
    const pagesList: PageCatalogModel[] = [];
    data.forEach(val => {
      val.owner = this.pageOwner(val.owner);
      pagesList.push(
        new PageCatalogModel(val.idCatalogPage, val.title, val.description, val.companyName, val.owner,  val.status, val.creationDate));
    });
    return pagesList;
  }

  get prepareColumns() {
    if (!!this.loginService.getId()) {
      return this.columnDefsUser;
    }
    return this.columnDefs;
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

  getDetails(): void {
    const selectedRow = this.gridApi.getSelectedRows()[0];
    const id = selectedRow.idCatalogPage;
    this.router.navigate([`/page/${id}`]);
  }

  pageOwner(owner: any) {
    return owner.firstname + ' ' + owner.lastname;
  }
}
