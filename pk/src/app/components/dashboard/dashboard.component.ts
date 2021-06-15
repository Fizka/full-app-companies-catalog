import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FavoritePageComponent} from './favorite-page.component';
import {LoginService} from '../../service/login.service';
import {CatalogPageService} from '../../service/catalog-page.service';
import {PageCatalogModel} from "../../model/page-catalog.model";

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
    this.catalogPageService.getCustomersList().subscribe(data => {
      data.forEach(data => this.rowData = this.mapToCatalogPage(data))
      console.log(this.rowData)
      console.log("loading...")
      console.log(data);
    }, error => console.log(error));
  }

  mapToCatalogPage(data: any) {
    let dat2: PageCatalogModel[] = [];
    data.forEach(val=>{
      console.log(val)
      dat2.push(new PageCatalogModel(val.idCatalogPage, val.title, val.description, val.companyName,  val.status, val.creationDate))
    })
    console.log(dat2)
    return dat2
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
