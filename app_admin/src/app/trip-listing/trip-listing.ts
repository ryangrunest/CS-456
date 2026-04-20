import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  providers: [TripData],
  imports: [TripCardComponent, CommonModule],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripData: TripData, private router: Router, private authenticationService: Authentication) {
    console.log("TripListing.constructor() called", this.tripData);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          }
          else {
            this.message = 'There were no trips retireved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
