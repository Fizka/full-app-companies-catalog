import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {FormsHelper} from '../../helpers/forms.helper';
import {MatSnackBar} from '@angular/material';
import {LoginService} from '../../service/login.service';
import {CatalogPageService} from '../../service/catalog-page.service';
import {PageCatalogModel} from '../../model/page-catalog.model';
import {AppUserService} from '../../service/app-user.service';

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
  owner: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private loginService: LoginService,
              private catalogPageService: CatalogPageService,
              private appUserService: AppUserService) {
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
      this.catalogPageService.getPage(id).subscribe(data => {
        bodyOfCatalogPage = data;
        this.helper.setCatalogPageValues(bodyOfCatalogPage, this.catalogPageForm);
      });
    } else {
      this.appUserService.getCustomer(this.loginService.getId()).subscribe(data => {
        this.owner = data.firstname + ' ' + data.lastname;
      });
    }
  }

  onSubmit(): void {
    if (this.catalogPageForm.valid) {
      if (this.editMode) {
        this.catalogPageService
          .updatePage(this.helper.getModelCatalogPage(this.catalogPageForm).idCatalogPage,
            this.helper.getModelCatalogPage(this.catalogPageForm)).subscribe(data => {
          this.navigate(data.idCatalogPage);
        });
      } else {
        this.catalogPageService.createPage(this.helper.getModelNewCatalog(this.catalogPageForm, this.loginService.getId()))
          .subscribe(data => {
            this.navigate(data.idCatalogPage);
          });
      }
    } else {
      this.openSnackbar();
    }
  }

  private navigate(pageId: number) {
    this.router.navigate([`/page/${pageId}`]);
  }

  edit(): void {
    const id: string = this.catalogPageForm.get('idCatalogPage').value;
    this.router.navigate([`/page/edit/${id}`]);
  }

  delete(): void {
    this.catalogPageService.deletePage(this.catalogPageForm.get('idCatalogPage').value)
      .subscribe(data => {
        this.router.navigate([`/`]);
      });
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

  get pageOwner() {
    if (!!this.catalogPageForm.get('owner').value) {
      return this.catalogPageForm.get('owner').value.firstname + ' ' + this.catalogPageForm.get('owner').value.lastname;
    } else {
      return this.owner;
    }
  }
}
