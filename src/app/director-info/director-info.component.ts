import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent implements OnInit {
  Director: any;
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('Received dialog data:', this.data);

    if (this.data?.directorName?.Name) {
      this.getDirector(this.data.directorName.Name);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  getDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((resp: any) => {
      this.Director = resp;
      console.log(this.Director);
      return this.Director;
    });
  }

}
