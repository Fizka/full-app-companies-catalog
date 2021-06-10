import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CatalogPageService} from '../../service/catalog-page.service';

@Component({
  selector: 'app-uzytkownicy',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
    {headerName: 'Login', field: 'login', sortable: true, filter: true},
    {headerName: 'Username', field: 'username', sortable: true, filter: true, resizable: false, width: 350},
    {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
    {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
    {headerName: 'Active', field: 'status', sortable: true, filter: true},
    {headerName: 'Permission', field: 'role', sortable: true, filter: true},
  ];
  rowData = [];

  constructor(private router: Router,
              private catalogpageService: CatalogPageService) {
  }

  ngOnInit() {
    this.loadData();
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  loadData(): void {
    this.catalogpageService.getCustomersList().subscribe(data => this.rowData = data);
  }

  dodaj(): void {
    this.router.navigateByUrl('user/add');
  }

  searchFilter(): void {
    if (this.searchText) {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.gridApi.setQuickFilter(this.searchText);
    }
  }

  getDetails(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    const id = selectedRows[0].id;
    const username = selectedRows[0].username;
    this.router.navigate([`/user/add${username}`], {state: {userId: id}});
  }

}
