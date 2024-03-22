// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Emitters } from '../../emitters/emitter';

// @Component({
//   selector: 'app-nav',
//   templateUrl: './nav.component.html',
//   styleUrl: './nav.component.css'
// })
// export class NavComponent implements OnInit {
//   authenticated = false;

//   constructor(private http:HttpClient){}

//   ngOnInit():void {
//     Emitters.authEmitter.subscribe((auth:boolean)=>{
//       this.authenticated = auth;
//     })
//   }
//   logout():void {
//     this.http.post('http://localhost:5000/api/logout',{},{withCredentials:true})
//     .subscribe(()=> this.authenticated = false)
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitters/emitter';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Fix typo in styleUrls
})
export class NavComponent implements OnInit {
  authenticated = false;

  constructor(private http: HttpClient) { }
  url = 'https://mean-cartapp-backend.onrender.com/api/login';
  localurl = 'http://localhost:5000/api/login'
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void {
    this.http.post(this.url, {}, { withCredentials: true })
      .subscribe(() => this.authenticated = false);
  }
}
