import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  ticks: number;

  constructor (
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.ticks = 10;

    setInterval(() => {
      this.ticks--;
    }, 1000)
    setTimeout(() => {
      window.location.href = "/";
    }, 10000);
  }
}
