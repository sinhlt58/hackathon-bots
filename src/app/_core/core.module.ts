
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from '../_core/components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NotFoundComponent
  ],
  entryComponents: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotFoundComponent
  ]
})
export class CoreModule { }
