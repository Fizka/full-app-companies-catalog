import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {FormsHelper} from '../../helpers/forms.helper';
import {MatSnackBar} from '@angular/material';
import {LoginService} from '../../service/login.service';
import {CatalogPageService} from '../../service/catalog-page.service';
import {PageCatalogModel} from '../../model/page-catalog.model';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.css']
})
export class PageDetailsComponent implements OnInit {

  catalogPageForm: FormGroup;
  helper = new FormsHelper();
  editMode = false;
  viewMode: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private loginService: LoginService,
              private catalogPageService: CatalogPageService) {
    this.route.data.subscribe(data => {
      this.viewMode = data.typWidoku;
    });
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params.id;
    this.catalogPageForm = this.helper.generateFormsForCatalogPage(this.viewDetails);
    if (id) {
      this.editMode = true;
      let bodyOfCatalogPage: PageCatalogModel;
      this.catalogPageService.getCustomer(id).subscribe(data => {
        bodyOfCatalogPage = data;
      });
      this.helper.setCatalogPageValues(bodyOfCatalogPage, this.catalogPageForm);
    }
  }

  onSubmit(): void {
    if (this.catalogPageForm.valid) {
      if (this.editMode) {
        this.catalogPageService
          .updateCustomer(this.helper.getModelCatalogPage(this.catalogPageForm).id,
            this.helper.getModelCatalogPage(this.catalogPageForm));
      } else {
        this.catalogPageService.createCustomer(this.helper.getModelCatalogPage(this.catalogPageForm))
          .subscribe(data => console.log(data));
      }
      const id = this.catalogPageForm.get('id').value;
      this.router.navigate([`/page/${id}`]);
    } else {
      this.openSnackbar();
    }
  }

  edit(): void {
    const id: string = this.catalogPageForm.get('id').value;
    this.router.navigate([`/page/edit/${id}`]);
  }

  delete(): void {
    this.catalogPageService.deleteCustomer(this.catalogPageForm.get('id').value)
      .subscribe(data => console.log(data));
    this.router.navigate([`/`]);
  }

  get viewDetails(): boolean {
    return this.viewMode === 'details';
  }

  get isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  get title(): string {
    if (this.viewMode === 'add') {
      return `ADD PAGE`;
    } else if (this.viewMode === 'edit') {
      return `EDIT PAGE  "${this.catalogPageForm.get('title').value}"`;
    }
    return `DETAILS  "${this.catalogPageForm.get('title').value}"`;
  }

  get buttonContent(): string {
    if (this.viewMode === 'edit') {
      return `CONFIRM`;
    }
    return `ADD`;
  }

  openSnackbar() {
    const message = 'You need to fill all inputs.';
    this.snackBar.open(message, 'Close', {
      duration: 10000
    });
  }
}
