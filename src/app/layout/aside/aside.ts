import { Component } from '@angular/core';
import { MainPage } from "../../dashboards/adminDashboard/main-page/main-page";
import { HalaqaList } from "../../dashboards/adminDashboard/halaqa-list/halaqa-list";
import { HalaqaDetails } from "../../dashboards/adminDashboard/halaqa-details/halaqa-details";

@Component({
  selector: 'app-aside',
  imports: [MainPage, HalaqaList, HalaqaDetails],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {}
