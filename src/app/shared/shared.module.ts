import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';

const commonModules = [MatSnackBarModule, MatButtonModule, MatProgressSpinnerModule];

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, HttpClientModule, RouterModule, ...commonModules],
  exports: [...commonModules, LoaderComponent]
})
export class SharedModule {}
