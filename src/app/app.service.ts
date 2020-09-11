import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user = {
    name: 'Jrr'
  };

  constructor() { }
}
