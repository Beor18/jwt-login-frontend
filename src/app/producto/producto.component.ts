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
  page = 1;
  maximumPages = 2;
  urls = `http://localhost:5000/api/productos`;
  httpOptions = localStorage.getItem('jwtToken');
  productoData = { titulo: '', autor: '' };
  data: any;
  message = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getProducto();
  }

  getProducto() {
    this.http.get(this.urls).subscribe(data => {
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
    this.http.post(this.urls, this.productoData).subscribe(resp => {
      this.data = resp;
      this.router.navigate(['/productos']);
    }, err => {
      this.message = err.error.msg;
    });
  }

}