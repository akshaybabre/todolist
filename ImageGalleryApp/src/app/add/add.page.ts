import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, Item } from '../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  addItemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private navCtrl: NavController
  ) {
    this.addItemForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      imageUrls: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addItemForm.valid) {
      const newItem: Item = {
        ...this.addItemForm.value,
        imageUrls: this.addItemForm.value.imageUrls.split(',')
      };

      this.dataService.addItem(newItem).subscribe(() => {
        this.navCtrl.navigateBack('/home');
      });
    }
  }
}
