import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../httpservices';

declare var google: any;


@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit {
  constructor(private ms:HttpService){}
  public isNavOpen = true;
  private carMarker: any;
  private map: any;
  private currentIndex = 0; // Keep track of the current index in lat and lon arrays
  private users: any;
  private path: any; // Polyline to represent the path
  
  ngOnInit(): void {
    this.initMap();
    this.moveCar();
  }
  
  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 23.64814, lng: 77.435125 },
      zoom: 8,
      mapTypeControl: false
    });
  
    const carIcon = {
      url: 'data:image/png;base64,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', // Replace with the path to your blue car icon image
      scaledSize: new google.maps.Size(40, 40)
    };
  
    this.carMarker = new google.maps.Marker({
      position: { lat: 66.647298, lng: 77.447505 },
      map: this.map,
      icon: carIcon,
      animation: google.maps.Animation.DROP
    });
  
    // Create a Polyline to represent the path
    this.path = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: '#0000FF', // Blue color
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  
    this.path.setMap(this.map);
  }
  
  moveCar(): void {
    this.ms.onmap().subscribe((data: any) => {
      console.log(data.data);
      
      this.users = data.data;
  
      let lon = this.users.map((obj: any) => obj.location?.lon);
      let lat = this.users.map((obj: any) => obj.location?.lat);
  console.log(lon);
  console.log(lat);
  
      // Move the car marker at a regular interval
      setInterval(() => {
        // Ensure there are coordinates to move to
        if (this.currentIndex < lon.length) {
          const newPosition = { lat: lat[this.currentIndex], lng: lon[this.currentIndex] };
  
          // Add the new position to the Polyline path
          const pathArray = this.path.getPath();
          pathArray.push(new google.maps.LatLng(newPosition.lat, newPosition.lng));
          this.path.setPath(pathArray);
  
          this.carMarker.setPosition(newPosition);
          this.map.setCenter(newPosition);
  
          // Increment the index for the next coordinate
          this.currentIndex++;
        }
      }, 1000); // Adjust the interval as needed (here, it's set to 1 second)
    });
  }
  
  // ... Remaining code ...
  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  
  id: any = "M6WRK1101PA000290";
  selectedCard: string = 'events';
  
  showCard(card: string): void {
    this.selectedCard = card;
  }
  
  showFooter = false;
  
  openFooter() {
    this.showFooter = true;
  }
  
  closeFooter() {
    this.showFooter = false;
  }
}
