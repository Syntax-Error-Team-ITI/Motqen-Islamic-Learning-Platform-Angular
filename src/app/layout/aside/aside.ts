import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HalaqaList } from "../../dashboards/adminDashboard/halaqa-list/halaqa-list";

@Component({
  selector: 'app-aside',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HalaqaList],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {}
