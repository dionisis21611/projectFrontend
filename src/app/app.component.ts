import { Component, OnInit } from '@angular/core';
import {Pet} from './pet';
import {PetService} from './pet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import {DividerModule} from 'primeng/divider';
import {TabViewModule} from 'primeng/tabview';
import {User} from './user';
import {element} from 'protractor';
import {Role} from './role';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public  username: string;
  public password: string;
  public test: User = null;
  public checkedValue: string;
  public checked = false;
  public login = false;
  public pets: Pet[];
  public editPet: Pet;
  public deletePet: Pet;
  public  userLogin: User;
  userform: FormGroup;
  public roles: Role[];
  public showAcceptButton = false;
  public showRecord = false;
  public isAdmin = false;
  public  showAddUser = false;

  constructor(private petService: PetService){
  }

  ngOnInit() {
//     this.petService.findUserByUsernameAndPassword(this.test).subscribe(
//   (response: User) => {
//     this.test = response;
//     alert(this.test.id);
//     console.log(this.test);
//   },
//   (error: HttpErrorResponse) => {
//     alert(error.message);
//   }
// );
//     this.getPets();
  }
  public OnClickAddUserShow(): void {
    this.showAddUser = !this.showAddUser;
  }
  public getPets(): void {
    this.petService.getPet().subscribe(
      (response: Pet[]) => {
        this.pets = response;
        console.log(this.pets);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  public onChangeBoolean(): void{
    if (this.showAcceptButton === true) {
      if (this.checked) {
        this.checked = false;
        this.checkedValue = 'Δεν Έγινε αποδοχή';
      } else {
        this.checked = true;
        this.checkedValue = 'Έγινε αποδοχή';
      }
    }
  }
  public onAddUser(addUserForm: NgForm): void {
    this.test = {
      id: null,
      name: addUserForm.value.name,
      email: addUserForm.value.email,
      username: addUserForm.value.username,
      password: addUserForm.value.password,
      phone: addUserForm.value.phone,
      city: addUserForm.value.city,
    };
    // this.getUserRoles();
    // console.log(this.test);
    this.petService.addUser(this.test).subscribe(
      (response: User) => {
        console.log(response);
        // this.userLogin = response;
        // console.log(this.userLogin);
        // this.login = true;
        // this.getUserRoles();
        addUserForm.reset();
        // this.petService.getRolesByUserId(response.id).subscribe(
        //   (res: Role[]) => {
        //     console.log(res);
        //     this.roles = res;
        //     res.forEach(role => {
        //       if (role.description === 'Κτηνίατρος') {
        //         this.showRecord = true;
        //         // alert('kt');
        //         this.showAcceptButton = true;
        //       } else if (role.description === 'Διαχειριστής') {
        //         this.isAdmin = true;
        //         this.showRecord = true;
        //         // alert('diax');
        //         this.showAcceptButton = true;
        //       }else if (role.description === 'Δημοτικός υπάλληλος') {
        //         this.showRecord = false;
        //         // alert('dy');
        //         this.showAcceptButton = false;
        //       } else if (role.description === 'Πολίτης') {
        //         this.showRecord = false;
        //       }
        //     });
        //     this.getPets();
        //     // alert(this.showAcceptButton);
        //     // console.log(this.roles);
        //   },
        //   (error: HttpErrorResponse) => {
        //     console.log(error);
        //   }
        // );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addUserForm.reset();
      }
    );
  }
  public onAddPet(addForm: NgForm): void {
    document.getElementById('add-pet-form').click();
    addForm.value.accept = false;
    this.petService.addPet(addForm.value).subscribe(
      (response: Pet) => {
        console.log(response);
        this.getPets();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onLogin(): void {
    // alert(document.getElementById('username'));

    this.test = {
      id: null,
      name: null,
      email: null,
      username: this.username,
      password: this.password,
      phone: null,
      city: null,
    };
    this.petService.findUserByUsernameAndPassword(this.test).subscribe(
      (response: User) => {
        console.log(response);
        this.userLogin = response;
        this.login = true;
        this.getPets();
        this.getUserRoles();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert('user does not exist');
      }
    );
  }
  public getUserRoles(): void {
    this.petService.getRolesByUserId(this.userLogin.id).subscribe(
      (res: Role[]) => {
        console.log(res);
        this.roles = res;
        res.forEach(role => {
          if (role.description === 'Κτηνίατρος') {
            this.showRecord = true;
            // alert('kt');
            this.showAcceptButton = true;
          } else if (role.description === 'Διαχειριστής') {
            this.isAdmin = true;
            // alert('diax');
            this.showRecord = true;
            this.showAcceptButton = true;
          }else if (role.description === 'Δημοτικός υπάλληλος') {
            // alert('dy');
            this.showRecord = false;
            this.showAcceptButton = false;
          }
        });
        // alert(this.showAcceptButton);
        // console.log(this.roles);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  public onExitUser(): void {
    this.login = false;
    this.userLogin = null;
    this.showAcceptButton = false;
    this.isAdmin = false;
    this.showRecord = false;
  }
  public onUpdatePet(pet: Pet): void {
    pet.accept = this.checked;
    this.petService.updatePet(pet).subscribe(
      (response: Pet) => {
        console.log(response);
        this.getPets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePet(petId: number): void {
    this.petService.deletePet(petId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPets();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.getPets();
      }
    );
  }

  public searchPets(key: string): void {
    console.log(key);
    const results: Pet[] = [];
    for (const pet of this.pets) {
      if (pet.breed.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pet.gender.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pet.date.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pet.serialn.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(pet);
      }
    }
    this.pets = results;
    if (results.length === 0 || !key) {
      this.getPets();
    }
  }

  public onOpenModal(pet: Pet, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPetModal');
    }
    if (mode === 'edit') {
      this.editPet = pet;
      this.checked = pet.accept;
      if (this.checked){
        this.checkedValue = 'Έγινε αποδοχή';
      }else {
        this.checkedValue = 'Δεν Έγινε αποδοχή';
      }
      button.setAttribute('data-target', '#updatePetModal');
    }
    if (mode === 'delete') {
      this.deletePet = pet;
      button.setAttribute('data-target', '#deletePetModal');
    }
    container.appendChild(button);
    button.click();
  }



}
