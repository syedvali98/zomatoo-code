import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-deatailed-view',
  templateUrl: './deatailed-view.component.html',
  styleUrls: ['./deatailed-view.component.css']
})
export class DeatailedViewComponent implements OnInit {

  res_id;
  restaurantData;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private httpService: HttpService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      params => {
        this.res_id = params.get('res_id');
        this.getRestaurantInfo();
      }
    )
    this.galleryOptions = [
      {
        "image": false,
        "thumbnailsRemainingCount": true,
        "height": "100px"
      },
      {
        "breakpoint": 500,
        "width": "100%",
        "thumbnailsColumns": 2
      }
    ];
    this.galleryImages = [
    ];

  }

  getRestaurantInfo() {
    this.httpService.getRestaurantDetails(this.res_id).subscribe(
      data => {
        this.restaurantData = data;
        for (let x in this.restaurantData.photos) {
          let newImages = {
            small: this.restaurantData.photos[x].photo.thumb_url,
            medium: this.restaurantData.photos[x].photo.thumb_url,
            big: this.restaurantData.photos[x].photo.url
          };
          this.galleryImages.push(newImages);
        }
        console.log(data);
      },
      error => {
        console.log(error)
      }
    )
  }
}
