import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

const commonModules = [MatSnackBarModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule, ...commonModules],
  exports: [...commonModules]
})
export class SharedModule {}
