import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage'

@Injectable({
  providedIn: 'root',
})
export class TripData {
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

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

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('http://localhost:3000/api/login', user, passwd);
  }
  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('http://localhost:3000/api/register', user, passwd);
  }

  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string):
    Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(endpoint,
      formData);
  }
}
