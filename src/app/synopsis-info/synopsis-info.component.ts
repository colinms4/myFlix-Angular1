import { Component, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-info',
  templateUrl: './synopsis-info.component.html',
  styleUrls: ['./synopsis-info.component.scss']
})
export class SynopsisInfoComponent {
  movie: any;
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<SynopsisInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movie: any }
  ) { }

  /**
   * closes the dialog 
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * gets data on a singular title
   * @param Title gets more data on the specific title
   */
  getMovies(Title: any): void {
    this.fetchApiData.getMovieByTitle(Title).subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      return this.movie;
    });
  }
}
