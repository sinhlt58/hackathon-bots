import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chatbot';

  constructor(
    private facebookService: FacebookService
  ) { }

  ngOnInit(): void {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.3' };
    this.facebookService.init(initParams);
  }

}
