import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PetService} from './pet.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {AccordionModule} from 'primeng/accordion';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule, TabViewModule, PanelModule, ButtonModule, DividerModule, CheckboxModule, AccordionModule
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
