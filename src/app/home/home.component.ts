import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currLat;
  currLng;
  restaurantData;
  search;
  loading;
  searchResult;
  locationName;
  locationNameResult;
  locationObtained = false;
  constructor(private httpService: HttpService, private cookieService: CookieService) { }

  ngOnInit() {
    this.loading = true;
    if(this.cookieService.get('latitude') === null || this.cookieService.get('latitude') === '' || this.cookieService.get('latitude') === undefined){
      this.locationObtained = false;
      this.loading = false;
    }
    else{
      this.locationObtained = true;
      this.currLat = this.cookieService.get('latitude');
      this.currLng = this.cookieService.get('longitude');
      this.getNearbyRestaurants();
    }
  }

  submitLocation() {
    this.httpService.getRestaurantsByName(this.locationName).subscribe(
      data => {
        this.locationNameResult = data["location_suggestions"];
        for (let x in this.locationNameResult) {
          this.currLat = this.locationNameResult[x].latitude;
          this.currLng = this.locationNameResult[x].longitude;
          this.cookieService.set('latitude', this.currLat);
          this.cookieService.set('longitude', this.currLng);
        }
        this.getNearbyRestaurants();
      },
      error => {
        console.log(error);
      }
    )
  }
  getNearbyRestaurants() {
    this.httpService.getRestaurants(this.currLat, this.currLng).subscribe(
      data => {
        this.restaurantData = data;
        this.locationObtained = true;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.locationObtained = false;
        this.loading = false;
      }
    )
  }
  searchRestaurants(event: Event) {
    this.loading = true;
    this.search = (<HTMLInputElement>event.target).value;
    if (this.search.length < 2) {
      this.searchResult = undefined;
    }

    if (this.search.length > 2) {
      this.httpService.searchnearbyRestaurants(this.currLat, this.currLng, this.search).subscribe(
        data => {
          this.searchResult = data;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        }

      )
    }
  }
  changeLocation(){
    this.locationObtained = false;
  }
  getCurrentLocation() {
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        this.cookieService.set('latitude', this.currLat);
        this.cookieService.set('longitude', this.currLng);
        this.getNearbyRestaurants();
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
