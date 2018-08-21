import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  urls = 'http://localhost:5000/api/users/login';
  loginData = { email: '', password: '' };
  message = '';
  data: any;

  ngOnInit() {
  }

  login() {
    this.http.post(this.urls, this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['/productos']);
    }, err => {
      this.message = err.error.msg;
    });
  }

}
