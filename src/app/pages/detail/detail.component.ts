import { Component, OnInit } from '@angular/core';
import { CoreServiceService } from '../../service/core-service.service';
import { Product } from '../../model/model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  productID: number = 0;
  product?:Product;

  constructor(private CorService : CoreServiceService){}

  ngOnInit(): void {
    this.productID = this.CorService.productID;
    console.log('productID',this.productID);
    this.getProductID(this.productID)
  }

  getProductID(id : number){
    this.CorService.getDataProductID(id)
    .subscribe((response) =>{
      this.product = response;
      console.log('.products',this.product);
    })
  }
}
