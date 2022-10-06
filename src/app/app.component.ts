import { Component, OnInit } from '@angular/core';
import { Cart } from './interfaces/cart';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  cart: Cart = { items: []};

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.addToTheCart();
  }

  addToTheCart(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
