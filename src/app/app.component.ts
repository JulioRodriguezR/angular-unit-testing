import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: { name: string };
  isLoggedIn = false;
  data: string;

  constructor(private appService: AppService, private dataService: DataService) { }

  ngOnInit(): void {
    this.user = this.appService.user;
    this.dataService.getDetails().then((data: string) => this.data = data);
  }
}
