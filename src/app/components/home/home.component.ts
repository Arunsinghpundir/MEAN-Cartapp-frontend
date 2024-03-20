import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  message: String = '';
   url:string = 'https://mean-cartapp-backend.onrender.com/api/user';
   localurl = 'http://localhost:5000/api/user'
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
    this.http
      .get(this.localurl, {
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          this.message = `Hi ${response?.name}`;
        },
        (err) => {
          this.message = err;
        }
      );
  }
}
