import {PageCatalogModel} from '../model/page-catalog.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../model/user.model';
import {CatalogModel} from '../model/catalog.model';

export class FormsHelper {

  getModelCatalogPage(dashboardForm: FormGroup): PageCatalogModel {
    const catalogModel = new PageCatalogModel(0, '', '', '', '', '', new Date());
    catalogModel.idCatalogPage = dashboardForm.get('idCatalogPage').value;
    catalogModel.title = dashboardForm.get('title').value;
    catalogModel.description = dashboardForm.get('description').value;
    catalogModel.companyName = dashboardForm.get('companyName').value;
    catalogModel.owner = dashboardForm.get('owner').value;
    catalogModel.status = dashboardForm.get('status').value;
    catalogModel.creationDate = dashboardForm.get('creationDate').value;
    return catalogModel;
  }

  getModelNewCatalog(dashboardForm: FormGroup, userId: number): CatalogModel {
    const newCatalog = new CatalogModel('', '', '', 0);
    newCatalog.title = dashboardForm.get('title').value;
    newCatalog.description = dashboardForm.get('description').value;
    newCatalog.companyName = dashboardForm.get('companyName').value;
    newCatalog.idAppUser = userId;
    return newCatalog;
  }

  setCatalogPageValues(details: PageCatalogModel, forma: FormGroup): FormGroup {
    forma.get('idCatalogPage').setValue(details.idCatalogPage);
    forma.get('title').setValue(details.title);
    forma.get('description').setValue(details.description);
    forma.get('companyName').setValue(details.companyName);
    forma.get('owner').setValue(details.owner);
    forma.get('status').setValue(details.status);
    forma.get('creationDate').setValue(details.creationDate);
    return forma;
  }

  generateFormsForCatalogPage(viewDetails: boolean): FormGroup {
    return new FormGroup({
      idCatalogPage: new FormControl({value: '', disabled: viewDetails}),
      title: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      description: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      companyName: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      owner: new FormControl({value: '', disabled: true}, Validators.required),
      status: new FormControl({value: '', disabled: true}, Validators.required),
      creationDate: new FormControl({value: '', disabled: true}, Validators.required),
    });
  }

  getUserModel(userForm: FormGroup): UserModel {
    const user = new UserModel();
    user.idAppUser = !!userForm.get('id').value ? userForm.get('id').value : null;
    user.login = userForm.get('login').value;
    user.password = userForm.get('password').value;
    user.username = userForm.get('username').value;
    user.lastname = userForm.get('lastname').value;
    user.firstname = userForm.get('firstname').value;
    user.status = !!userForm.get('status').value ? userForm.get('status').value : 'ACTIVE';
    user.role = !!userForm.get('role').value ? userForm.get('role').value : '';
    user.favorite = null;
    return user;
  }

  setUserValues(details: UserModel, userForm: FormGroup): FormGroup {
    userForm.get('id').setValue(details.idAppUser);
    userForm.get('login').setValue(details.login);
    userForm.get('password').setValue(details.password);
    userForm.get('username').setValue(details.username);
    userForm.get('firstname').setValue(details.firstname);
    userForm.get('lastname').setValue(details.lastname);
    userForm.get('status').setValue(details.status);
    userForm.get('role').setValue(details.role);
    return userForm;
  }

  generateFormForUser(widokDetali: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: widokDetali}),
      login: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      password: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      username: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      firstname: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      lastname: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      status: new FormControl({value: '', disabled: widokDetali}),
      role: new FormControl({value: 1, disabled: widokDetali}),
    });
  }

  translateUser(): string[][] {
    return [
      [
        'Enter login:',
        'User Login:'
      ],
      [
        'Enter Username:',
        'Username:',
      ],
      [
        'Enter Firstname:',
        'User Firstname',
      ],
      [
        'Enter Lastname:',
        'User Lastname',
      ],
      [
        'Choose Permission:',
        'User Permissions:',
      ],
      [
        'Enter Status:',
        'User Status:',
      ]
    ];
  }
}
