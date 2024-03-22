import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  url = 'https://mean-cartapp-backend.onrender.com/api/login';
   localurl = 'http://localhost:5000/api/login'
  submit(): void {

    const userData = this.form.value;
      console.log(this.validateEmail(userData.email))
      if (userData.password === "" || userData.email === "") {
        console.log(userData.email)
        Swal.fire("Error", "Please enter all required fields");
      } else if (!this.validateEmail(userData.email)) {
        Swal.fire("Error", "Invalid email address");
      } else {
        this.http.post(this.url,userData,{
          withCredentials:true
        })
        .subscribe(
          (res)=> this.router.navigate(['/']),
          (err)=> {
            Swal.fire("Error",err.error.message,"error")
          }
        )
      }
  }
}
