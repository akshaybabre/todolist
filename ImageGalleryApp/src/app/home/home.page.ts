import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService, Item } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: Item[] = [];

  constructor(
    private navCtrl: NavController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.dataService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  openDetails(item: Item) {
    this.navCtrl.navigateForward('/details', { state: { item } });
  }

  openAddPage() {
    this.navCtrl.navigateForward('/add');
  }
}
