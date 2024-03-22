

// 

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Emitters } from '../../emitters/emitter';

import Swal from 'sweetalert2';
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
  })
  export class ProductsComponent implements OnInit {
  products: any[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  url:string = 'https://mean-cartapp-backend.onrender.com/api/products';
  localurl = 'http://localhost:5000/api/products';
  authenticated = false;
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    this.http
    .get(this.url, {
      withCredentials: true
    })
    .subscribe(
      async (response: any) => {
       
        this.products = response;
        console.log(response);
        Emitters.authEmitter.emit(true);
      },
      (err) => {
     
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
