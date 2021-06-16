import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CatalogPageService} from '../../service/catalog-page.service';
import {AppUserService} from "../../service/app-user.service";

@Component({
  selector: 'app-users',
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
    {headerName: 'Username', field: 'username', sortable: true, filter: true},
    {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
    {headerName: 'Lastname', field: 'lastname', sortable: true, filter: true},
    {headerName: 'Active', field: 'status', sortable: true, filter: true},
    {headerName: 'Permission', field: 'role', sortable: true, filter: true},
  ];
  rowData = [];

  constructor(private router: Router,
              private userService: AppUserService) {
  }

  ngOnInit() {
    this.loadData();
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  loadData(): void {
    this.userService.getCustomersList().subscribe(data => {
      this.rowData = data;
    });
  }

  addUser(): void {
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
    const id = selectedRows[0].idAppUser;
    const username = selectedRows[0].username;
    this.router.navigate([`/user/profile/${username}`], {state: {userId: id}});
  }

}
