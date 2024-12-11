import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  /**
   * initialize the component 
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Logs the user out and removes from local storage and navigates back to the welcome page
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

  /**
   * Component that navigates to a user's profile
   */
  profile(): void {
    this.router.navigate(["profile"])
  }

  /**
   * Component adds a movie to a user's favorites 
   * @param movieId MovieId is used to add a movie to a user's favorites 
   */
  addToFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username;
    if (username) {
      this.fetchApiData.addMovieToFavorites(username, movieId).subscribe({
        next: (response) => {
          user.FavoriteMovies.push(movieId);
          this.snackBar.open("Movie added to favorites!", 'OK', {
            duration: 2000
          });
          console.log('Movie added to favorites', response);
        },
        error: (err) => {
          console.error('Error adding movie to favorites:', err);
        }
      });
    } else {
      // Handle case where no user is logged in
      console.error('No user logged in');
      // Optionally show a login prompt or error message
    }
  }

  /**
   * Gets all the movies in the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog for the synopsis component displaying more movie details
   * @param movie 
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisInfoComponent, {
      data: { movie },
      width: '700px'
    })
  }

  /**
   * Opens a dialog for the Genre component displaying Genre data 
   * @param movie 
   */
  openGenreInfoDialog(movie: any): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Genre: movie.Genre },
      width: '700px'
    })
  }

  /**
   * Opens a dialog for the Director component displaying more Director data 
   * @param movie 
   */
  openDirectorInfoDialong(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { directorName: movie.Director },
      width: '700px'
    })
  }

}