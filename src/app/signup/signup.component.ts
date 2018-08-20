import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  signupData = { name: '', email: '', password: '', password_confirm: ''  };
  message = '';

  ngOnInit() {
  }

  signup() {
    this.http.post('http://localhost:5000/api/users/register', this.signupData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['signup']);
    }, err => {
      this.message = err.error.msg;
    });
  }

}
