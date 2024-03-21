import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CoreServiceService } from '../../service/core-service.service';
import { Product } from '../../model/model';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
  @ViewChild('searchInput') searchInput?: ElementRef;
  searchInputSubscription?: Subscription;

  ListProduct: Product[] = [];
  searchListProduct: Product[] = [];

  constructor(private CorService : CoreServiceService,
    private router: Router ){}

  ngOnInit(): void {
      this.initSearch()
      this.getDataProduct();
  }

  initSearch(StringValue?: string) {
    setTimeout(() => {
      if (!this.searchInput) return;
      this.searchInputSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(
          map((event: any) => event.target.value),
          debounceTime(1000)
        )
        .subscribe((text: string) => {
          this.searchListProduct = this.ListProduct.filter((product: any) =>
            product.title.toLowerCase().includes(text.toLowerCase())
          );
          console.log('Filtered Products:', this.searchListProduct);
        });
    });
  }

  getDataProduct(){
    this.CorService.getDataProduct().subscribe((response: any) =>{
      this.ListProduct = response.products;
      console.log('ListProduct',this.ListProduct);
    })
  }

  goToDetails(productID : number){
    console.log('productID',productID);
    this.CorService.setProductID(productID);
    this.router.navigate(['/detail'])
  }

  ngOnDestroy(): void {
      this.searchInputSubscription?.unsubscribe()
  }

}
