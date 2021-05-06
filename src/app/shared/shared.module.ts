import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { DeleteConformationComponent } from './components/delete-conformation/delete-conformation.component';
import { MatDialogModule } from '@angular/material/dialog';

const commonModules = [
  MatSnackBarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDialogModule
];

@NgModule({
  declarations: [LoaderComponent, DeleteConformationComponent],
  imports: [CommonModule, HttpClientModule, RouterModule, ...commonModules],
  exports: [...commonModules, LoaderComponent, DeleteConformationComponent]
})
export class SharedModule {}
