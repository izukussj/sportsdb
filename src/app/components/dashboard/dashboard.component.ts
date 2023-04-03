import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';
import { APIService } from '../../shared/services/api.service';


import { Match } from '../../shared/interfaces/match';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  matchs?: Match[];
  currentMatch?: Match;
  matchsDuJour?:Match[];
  currentIndex = -1;
  title = '';
  constructor(public authService: AuthService,private dataService: DataService,private apiService:APIService) {}

  ngOnInit(): void {
    this.retrieveMatchs();
    this.apiService.getLatestMatches()
        .subscribe(response => {
          this.matchsDuJour = response;
        });
  }

  refreshList(): void {
    this.currentMatch = undefined;
    this.currentIndex = -1;
    this.retrieveMatchs();
  }

  retrieveMatchs(): void {
    this.dataService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.matchs = data;
    });
  }

  setActiveMatch(match: Match, index: number): void {
    this.currentMatch = match;
    this.currentIndex = index;
  }
  addToFavorites(match: Match): void {
    // Copy the match object
    const favoriteMatch: Match = { ...match };

    // Call the create method from the DataService to add the favorite match to the database
    this.dataService.create(favoriteMatch)
        .then(() => {
          console.log('Favorite match added successfully!');
        })
        .catch((error: any) => {
          console.error(error);
        });
  }

}
