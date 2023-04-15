import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from '../../models/shopping-cart';
import { RequestService } from '../request/request.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private baseUrl = environment.baseUrlShoppingCartService;

  shoppingCart$: BehaviorSubject<ShoppingCart | null> = new BehaviorSubject<ShoppingCart | null>(null);

  constructor(private readonly request: RequestService) { }

  getShoppingCart() {
    return this.request.get<ShoppingCart>(`${this.baseUrl}/api/ShoppingBasket`)
  }

  addProduct(productId: string, quantity: number): Observable<undefined> {
    return this.request.put<{productId: string, quantity: number }, undefined>(`${this.baseUrl}/api/ShoppingBasket`, { productId, quantity });
  }
}