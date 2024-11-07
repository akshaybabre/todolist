import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: Item;
  currentImageIndex: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.item = navigation?.extras.state?.['item'];
  }

  ngOnInit() {
    return;
  }

  // Navigate to the previous image in the array
  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  // Navigate to the next image in the array
  nextImage() {
    if (this.item && this.currentImageIndex < this.item.imageUrls.length - 1) {
      this.currentImageIndex++;
    }
  }
}
