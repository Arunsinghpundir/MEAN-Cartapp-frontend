import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../emitters/emitter';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  message = '';
   url = 'https://mean-cartapp-backend.onrender.com/api/user';
   localurl = 'http://localhost:5000/api/user'
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
    this.http
      .post(this.url, {
        withCredentials: true
      }).subscribe( 
        async (response: any) => {
         
          this.message = `Hi ${await response.user.name}`;
          console.log("response",response);
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.message = "You are not logged in";
          Emitters.authEmitter.emit(false);
        }
      );
  }
}
