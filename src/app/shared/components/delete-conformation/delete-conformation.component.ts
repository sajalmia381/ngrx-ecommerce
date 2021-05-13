import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-conformation',
  templateUrl: './delete-conformation.component.html',
  styleUrls: ['./delete-conformation.component.scss']
})
export class DeleteConformationComponent implements OnInit {
  message: string = 'are you sure! you want to delete it?';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteConformationComponent>
  ) {
    if (data?.message) {
      this.message = this.data?.message;
    }
  }

  ngOnInit(): void {}
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
