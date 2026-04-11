import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripData {
  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>('http://localhost:3000/api/trips');
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>('http://localhost:3000/api/trips', trip);
  }

  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>('http://localhost:3000/api/trips/' + id);
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>('http://localhost:3000/api/trips/' + trip.code, trip);
  }
}
