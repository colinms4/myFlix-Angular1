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

  ngOnInit(): void {
    this.getMovies();
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

  profile(): void {
    this.router.navigate(["profile"])
  }

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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisInfoComponent, {
      data: { movie },
      width: '700px'
    })
  }

  openGenreInfoDialog(movie: any): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Genre: movie.Genre },
      width: '700px'
    })
  }

  openDirectorInfoDialong(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { directorName: movie.Director },
      width: '700px'
    })
  }

}