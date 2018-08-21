import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any;
  httpOptions = localStorage.getItem('jwtToken');
  productoData = { titulo: '', autor: '' };
  data: any;
  message = '';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/api/users/producto?secret_token=' + this.httpOptions).subscribe(data => {
      this.productos = data;
      console.log(this.productos);
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

  producto() {
    this.http.post('http://localhost:5000/api/users/producto?secret_token=' + this.httpOptions, this.productoData).subscribe(resp => {
      this.data = resp;
      this.router.navigate(['/productos']);
    }, err => {
      this.message = err.error.msg;
    });
  }

}
