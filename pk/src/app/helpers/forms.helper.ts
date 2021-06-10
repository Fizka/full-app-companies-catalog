import {PageCatalogModel} from '../model/page-catalog.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../model/user.model';

export class FormsHelper {

  getModelCatalogPage(dashboardForm: FormGroup): PageCatalogModel {
    const catalogModel = new PageCatalogModel();
    catalogModel.id = dashboardForm.get('id').value;
    catalogModel.title = dashboardForm.get('title').value;
    catalogModel.description = dashboardForm.get('description').value;
    catalogModel.owner = dashboardForm.get('owner').value;
    catalogModel.status = dashboardForm.get('status').value;
    catalogModel.creationDate = dashboardForm.get('czestotliwosc').value;
    return catalogModel;
  }

  setCatalogPageValues(details: PageCatalogModel, forma: FormGroup): FormGroup {
    forma.get('id').setValue(details.id);
    forma.get('title').setValue(details.title);
    forma.get('description').setValue(details.description);
    forma.get('owner').setValue(details.owner);
    forma.get('status').setValue(details.status);
    forma.get('creationDate').setValue(details.creationDate);
    return forma;
  }

  generateFormsForCatalogPage(viewDetails: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: viewDetails}),
      title: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      description: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      owner: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      status: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      creationDate: new FormControl({value: '', disabled: viewDetails}, Validators.required),
    });
  }

  getUserModel(userForm: FormGroup): UserModel {
    const user = new UserModel();
    user.id = userForm.get('id').value;
    user.login = userForm.get('login').value;
    user.password = userForm.get('password').value;
    user.lastname = userForm.get('lastname').value;
    user.firstname = userForm.get('firstname').value;
    user.status =  userForm.get('status').value;
    return user;
  }

  setUserValues(details: UserModel, userForm: FormGroup): FormGroup {
    userForm.get('id').setValue(details.id);
    userForm.get('login').setValue(details.login);
    userForm.get('password').setValue(details.password);
    userForm.get('username').setValue(details.username);
    userForm.get('firstname').setValue(details.firstname);
    userForm.get('status').setValue(details.status);
    return userForm;
  }

  generateFormForUser(widokDetali: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: widokDetali}),
      login: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      haslo: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      username: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      imie: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      uprawnienia: new FormControl({value: 1, disabled: widokDetali}),
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
        'Choose Permission:',
        'User Permissions:',
      ]
    ];
  }
}
