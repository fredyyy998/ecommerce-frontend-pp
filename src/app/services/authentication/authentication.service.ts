import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { catchError, map, Observable, tap } from 'rxjs';
import { Customer } from '../../models/customer';
import { JwtService } from '../jwt/jwt.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.baseUrlAccountService;

  constructor(private readonly request: RequestService,
              private readonly jwtService: JwtService) { }

  login(email: string, password: string): Observable<boolean> {
    return this.request.post<undefined, { token: string }>(`${this.baseUrl}/api/Authentication/login?email=${email}&password=${password}`).pipe(
      tap(result => this.jwtService.jwt = result.token),
      map(result => true),
    )
  }

  register(email: string, password: string): Observable<Customer> {
    return this.request.post<{ email: string, password: string}, Customer>(`https://localhost:7259/api/Authentication/register`, {
      email,
      password
    });
  }
}
