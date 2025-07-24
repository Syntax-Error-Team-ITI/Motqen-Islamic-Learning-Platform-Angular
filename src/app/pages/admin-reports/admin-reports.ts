import { Component, OnInit } from '@angular/core';
import { AdminReportsService } from '../../services/admin-reports.service';
import { IAdminDashboardSummary, IHalaqaHealthReport, IStudentPerformanceOverview, ITeacherPerformance, IUserSummary } from '../../models/reports/admin-reports-dtos';

@Component({
  selector: 'app-admin-reports',
  imports: [],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css'
})
export class AdminReports implements OnInit{
  dashboardData! :IAdminDashboardSummary;
  UserSummaryData! :IUserSummary[];
  TeacherPerformanceData! : ITeacherPerformance[];
  StudentPerformanceData! : IStudentPerformanceOverview[];
  HalaqaHealthData! : IHalaqaHealthReport[];
  isloading : boolean = true;
  constructor(private adminReports_service : AdminReportsService){}
  ngOnInit(): void {
    this.loadingDashboardData();
    this.loadingHalaqaHealthData();
    this.loadingStudentPerformanceData();
    this.loadingTeacherPerformanceData();
    this.loadingUserSummaryData();
    this.isloading = false;
  }

  loadingDashboardData(){
    this.adminReports_service.getDashboardSummary().subscribe({
      next : (data)=>{
        this.dashboardData = data;

      },
      error : (err)=>{
        console.error('Failed to load dashboard summary', err);
      }
    });
  }

    loadingUserSummaryData(){
    this.adminReports_service.getUserSummary().subscribe({
      next : (data)=>{
        this.UserSummaryData = data;

      },
      error : (err)=>{
        console.error('Failed to load User summary', err);
      }
    });
  }

    loadingTeacherPerformanceData(){
    this.adminReports_service.getTeacherPerformance().subscribe({
      next : (data)=>{
        this.TeacherPerformanceData = data;

      },
      error : (err)=>{
        console.error('Failed to load Teacher Performance', err);
      }
    });
  }

    loadingStudentPerformanceData(){
    this.adminReports_service.getStudentPerformance().subscribe({
      next : (data)=>{
        this.StudentPerformanceData = data;

      },
      error : (err)=>{
        console.error('Failed to load Student Performance ', err);
      }
    });
  }

    loadingHalaqaHealthData(){
    this.adminReports_service.getHalaqaHealth().subscribe({
      next : (data)=>{
        this.HalaqaHealthData = data;

      },
      error : (err)=>{
        console.error('Failed to load Halaqa Health ', err);
      }
    });
  }
}
