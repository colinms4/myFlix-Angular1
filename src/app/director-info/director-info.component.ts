import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying information in a dialog about a director
 * The information is fetched then displayed in a dialog 
 */

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

  /**
   * Angular lifecycle component that initializes the component 
   */
  ngOnInit(): void {
    console.log('Received dialog data:', this.data);

    if (this.data?.directorName?.Name) {
      this.getDirector(this.data.directorName.Name);
    }
  }

  /**
   * Closes the dialog 
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Fetchs the data about the director 
   * @param directorName name of the director being fetched 
   */
  getDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((resp: any) => {
      this.Director = resp;
      console.log(this.Director);
      return this.Director;
    });
  }

}
