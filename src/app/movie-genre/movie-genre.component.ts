import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.sass']
})
export class MovieGenreComponent implements OnInit {
  Genre: any;
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<MovieGenreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Initialize component and check for data
   */
  ngOnInit(): void {
    console.log('Received dialog data:', this.data);

    // Extract genre name directly from the data
    const genreName = this.data.genreName;
    console.log('Genre Name to fetch:', genreName);

    if (genreName) {
      this.getGenreInfo(genreName);
    }
  }

  /**
   * Fetches the Genre info based on a genre name
   * @param genreName 
   */
  getGenreInfo(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe({
      next: (res) => {
        this.Genre = res;
      },
      error: (err) => {
        console.error('Error fetching genre info:', err);
      }
    });
  }

  /**
   * closes the dialog 
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
