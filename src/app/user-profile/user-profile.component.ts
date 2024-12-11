import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userData: any = {};
  Username: string = "";
  FavoriteMovies: any[] = [];
  movie: any;
  favoriteMovieTitles: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router
  ) { }

  /**
   * Initializes the component and checks to see if data is being received 
   */
  ngOnInit(): void {
    // Parse the stored user and extract just the username
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      this.Username = userObject.Username;
    }

    console.log('Extracted Username:', this.Username);

    this.getUserProfile();
  }

  /**
   * navigates to profile
   */
  profile(): void {
    this.router.navigate(["profile"])
  }

  /**
   * logout function
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

  /**
   * navigates to home screen "movies"
   */
  home(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * Updates a user's information
   * @param req.body
   * @returns {string} Profile updated successfully 
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res: any) => {
      alert('Profile updated successfully!');
      this.getUserProfile(); // Refresh the profile data
    }, (error: any) => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    })
  }

  /**
   * gets the user's profile data 
   */
  getUserProfile(): void {
    if (this.Username) {
      this.fetchApiData.getUser(this.Username).subscribe({
        next: (res: any) => {
          this.userData = res;
          this.FavoriteMovies = res.FavoriteMovies || [];

          if (this.FavoriteMovies && this.FavoriteMovies.length > 0) {
            this.getFavoriteMovieTitles();
          }
        },
        error: (error: any) => {
          console.error('Error fetching user profile:', error);
        }
      });
    } else {
      console.error('No username found');
    }
  }

  /**
   * get's a users favorite movies 
   */
  getFavoriteMovieTitles(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies: any[]) => {
        console.log('All Movies:', movies);

        this.favoriteMovieTitles = this.FavoriteMovies.map(movieId => {
          const movie = movies.find(m => m._id === movieId);
          console.log(`Looking for movie with ID ${movieId}:`, movie);
          return movie ? movie.Title : 'Unknown Movie';
        });

        console.log('Favorite Movie Titles:', this.favoriteMovieTitles);
      },
      error: (error: any) => {
        console.error('Error fetching movie titles:', error);
      }
    });
  }

  /**
   * delets a user's favorite movie from favorite movies
   * @param movieId movieID used to delete from user's FavoriteMovies
   */
  deleteFavoriteMovie(movieId: string): void {
    // Use the current username from the component
    const Username = this.Username;

    // Swap the order of parameters to match the service method
    this.fetchApiData.removeFavoriteMovie(Username, movieId).subscribe({
      next: (res: any) => {
        // Remove the movie from the local arrays
        this.FavoriteMovies = this.FavoriteMovies.filter(id => id !== movieId);
        this.getFavoriteMovieTitles(); // Refresh the movie titles

        alert('Movie removed from favorites!');
      },
      error: (error: any) => {
        console.error('Error removing movie:', error);
        alert('Failed to remove movie.');
      }
    });
  }


}

