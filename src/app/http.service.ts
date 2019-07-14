import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiKey = '4d457831774edb2d714766002cbfb9d1';
  baseUrl = 'https://developers.zomato.com/api/v2.1/'

  constructor(private http:HttpClient) { }

  getRestaurants(lat,lon){
    let httpOptions = {
      headers: new HttpHeaders({
        'user-key':  this.apiKey
      })
    };   
    return this.http.get(this.baseUrl+'geocode?lat='+lat+'&lon='+lon,httpOptions)
  }
  getRestaurantsByName(locationName){
    let httpOptions = {
      headers: new HttpHeaders({
        'user-key':  this.apiKey
      })
    };  
    return this.http.get(this.baseUrl+'locations?query='+locationName,httpOptions)
  }
  getRestaurantDetails(res_id){
    let httpOptions = {
      headers: new HttpHeaders({
        'user-key':  this.apiKey
      })
    };  
    return this.http.get(this.baseUrl+'restaurant?res_id='+res_id,httpOptions)
  }
  searchnearbyRestaurants(lat,lon,query){
    let httpOptions = {
      headers: new HttpHeaders({
        'user-key':  this.apiKey
      })
    }; 
    return this.http.get(this.baseUrl+'search?q='+query+'&lat='+lat+'&lon='+lon+'&count=15',httpOptions)
  }
}
