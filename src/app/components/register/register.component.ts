// // import { HttpClient } from '@angular/common/http';
// // import { Component ,OnInit} from '@angular/core';
// // import { FormGroup,FormBuilder } from '@angular/forms';
// // import { Router } from 'express';
// // @Component({
// //   selector: 'app-register',
// //   templateUrl: './register.component.html',
// //   styleUrl: './register.component.css'
// // })
// // export class RegisterComponentimplements implements OnInit {
// //   form: FormGroup;
// //   constructor(private formBuilder: FormBuilder,
// //     private http:HttpClient,
// //     private router:Router) {
// //   }
// //   ngOnInit():void{
// //     this.form = this.formBuilder.group({
// //       name: "",
// //       email: "",
// //       password: "",
// //     });
// //   }
// //   submit():void{
// //     let user = this.form.getRawValue()
// //     console.log(user)
// //   }
// // }
// import { HttpClient } from '@angular/common/http';
// import { Component ,OnInit} from '@angular/core';
// import { FormGroup,FormBuilder } from '@angular/forms';
// import { Router } from 'express';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//  form: FormGroup 
//  constructor(private formBuilder: FormBuilder,
//    private http:HttpClient,
//    private router:Router) {
//  }
//   ngOnInit():void{
//     this.form = this.formBuilder.group({
//       name: "",
//       email: "",
//       password: "",
//     });
//   }
//   submit():void{
//     let user = this.form.getRawValue()
//     console.log(user)
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  url:string = 'https://mean-cartapp-backend.onrender.com/api/register';
  localurl = 'http://localhost:5000/api/register'
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }
               
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  submit(): void {
      const userData = this.form.value;
      console.log(this.validateEmail(userData.email))
      if (userData.password === "" || userData.email === "" || userData.name === "") {
        Swal.fire("Error", "Please enter all required fields");
      } else if (!this.validateEmail(userData.email)) {
        Swal.fire("Error", "Invalid email address");
      } else {
       this.http.post(this.url,userData,{
        withCredentials:true
       })
       .subscribe(()=>this.router.navigate(['/']),(err)=>{
        Swal.fire("Error",err.error.message,"error")
       })
      }
    }
  
}
