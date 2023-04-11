import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/http.service'
import {env} from "../../../../environments/env";

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent {

  private httpClient: HttpClient;
  private activeRoute: ActivatedRoute;
  public item: Item = {
    name: "" ,
    imagePath: File ,
    price: null ,
    condition: undefined ,
    description: "" ,
    available: undefined ,
    vendorName: "" ,
    vendorEmail: "",
    vendorPhone: "" ,
    postingYear: new Date()
  };

  public router: Router;

  constructor(router: Router, http: HttpClient, activeRoute: ActivatedRoute,private service: ApiService) {
    this.router = router;
    this.httpClient = http;
    this.activeRoute = activeRoute;

  }

  addItem() {
    //console.log(this.item.available)
    //console.log(this.item.condition)
    //console.log(Boolean(this.item.available))
    let currentDate = new Date();
    let currentDateString = currentDate.toLocaleString();
    this.item.postingYear = new Date(currentDateString);
    this.item.available = this.item.available =="true" ? true : false;
    this.item.condition = this.item.condition == "true" ? true : false;
    this.onUpload();

    //console.log(this.item);
    //this.service.addData(this.item).addItem.subscribe(result => this.router.navigate([env.rout_url.item]));
  }
  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    this.item.imagePath = element.files?.[0];
    console.log(this.item.imagePath)
  }

  onUpload() {
    if (!this.item.imagePath) {
      console.error('Aucun fichier sélectionné');
      return;
    }

    let formData = new FormData();
    formData.append('imagePath', this.item.imagePath);
    formData.append('name', this.item.name);
    formData.append('price', this.item.price.toString());
    formData.append('description', this.item.description);
    formData.append('condition', this.item.condition);
    formData.append('vendorName', this.item.vendorName);
    formData.append('vendorEmail', this.item.vendorEmail);
    formData.append('vendorPhone', this.item.vendorPhone);
    formData.append('postingYear', this.item.postingYear.toDateString());
    console.log(formData);
    console.log(this.item.imagePath);
  //  this.service.addData(this.item).addItem.subscribe(result => window.location.reload());
      this.httpClient.post('https://localhost:7138/api/item', formData).subscribe(response => {
        //console.log('Image téléchargée avec succès !', response);
        this.router.navigate([env.rout_url.item]);
    }, error => {
      console.error('Erreur lors du téléchargement de l\'image', error);
    });
  }
}
export interface Item {

  name: string ;
  imagePath: File | any;
  price: number | any;
  condition: any ;
  description: string ;
  available: any ;
  vendorName: string ;
  vendorEmail: string;
  vendorPhone: string ;
  postingYear: Date ;

}

