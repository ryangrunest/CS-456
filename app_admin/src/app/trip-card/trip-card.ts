import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})

export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);

    this.router.navigate(['/edit-trip', trip.code]);
  }
}
