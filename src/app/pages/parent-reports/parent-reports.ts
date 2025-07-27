import { HalaqaService } from './../../services/halaqa-service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentReportsService } from '../../services/reports.service';
import {
  StudentAttendanceReportDto,
  StudentAttendancePieChartDto,
  StudentHalaqaComparisonReportDto,
  QuranProgressChartPointDto,
  WeeklyMonthlyQuranProgressDto,
  QuranSummaryCountersDto,
  QuranDetailedProgressReportDto,
  IslamicSubjectProgressChartDto,
  IslamicSubjectProgressOverTimeChartDto,
  IslamicSubjectsDetailedProgressReportDto,
  StudentAttendanceDetailsDto,
  MonthlyWeeklyAttendanceChartDto
} from '../../models/reports/report-dtos';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { StudentService } from '../../services/student-service';
import { StudentSubjectServise } from '../../services/student-subject-servise';
import { IStudentSubject } from '../../models/student/Istudent-subject';
import { IHalaqaStudentDisplayHalaqa } from '../../models/student/ihalaqa-student-display-halaqa';

@Component({
  selector: 'app-parent-reports',
  templateUrl: './parent-reports.html',
  styleUrls: ['./parent-reports.css'],
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    ReactiveFormsModule,
    FormsModule,

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentReports implements OnInit {

  studentAttendanceDetails: StudentAttendanceDetailsDto[] = [];
  islamicSubjectProgressOverTimeData: IslamicSubjectProgressOverTimeChartDto[] = [];
  studentId: number = 1;
  filterHalaqaId: number = 1;
  filterSubjectName: string = "";
  chartControlForm: FormGroup;
  reportData: StudentAttendanceReportDto[] = [];
  chartData: StudentAttendancePieChartDto[] = [];

  public attendanceBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'حضور',
        data: [],
        backgroundColor: '#4CAF50'
      },
      {
        label: 'غياب',
        data: [],
        backgroundColor: '#F44336'
      },
      {
        label: 'معذور',
        data: [],
        backgroundColor: '#FFC107'
      }
    ]
  };

  public attendanceBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'الفترة'
        }
      },
      y: {
        stacked: false,
        title: {
          display: true,
          text: 'عدد الحضور/الغياب'
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        rtl: true
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            return `${label}: ${context.raw}`;
          }
        }
      }
    }
  };

  public quranProgressChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'حفظ القرآن',
        borderColor: '#4CAF50',
        fill: false,
        tension: 0.1,
        hidden: false
      },
      {
        data: [],
        label: 'مراجعة القرآن',
        borderColor: '#2196F3',
        fill: false,
        tension: 0.1,
        hidden: false
      },
      {
        data: [],
        label: 'الحفظ التراكمي',
        borderColor: '#FF9800',
        fill: false,
        tension: 0.1,
        hidden: true
      }
    ]
  };

  public islamicSubjectPagesChart: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'إجمالي الصفحات المكتملة',
      backgroundColor: '#3cba9f'
    }]
  };

  public islamicSubjectPagesChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y} صفحات`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'عدد الصفحات'
        }
      },
      x: {
        title: {
          display: true,
          text: 'المادة الإسلامية'
        }
      }
    }
  };

  public quranProgressChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} آيات`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: { title: { display: true, text: 'عدد الآيات' } },
      x: { title: { display: true, text: 'التاريخ' } }
    }
  };

  quranSummaryCounters: QuranSummaryCountersDto | null = null;
  quranDetailedProgressReport: QuranDetailedProgressReportDto[] = [];
  islamicSubjectPagesChartData: IslamicSubjectProgressChartDto[] = [];
  islamicSubjectsDetailedProgressReport: IslamicSubjectsDetailedProgressReportDto[] = [];
  studentHalaqaComparisonReport: StudentHalaqaComparisonReportDto[] = [];
  halaqatList:IHalaqaStudentDisplayHalaqa [] = [];

  constructor(
    private fb: FormBuilder,
    private reportsService: ParentReportsService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private studentService :StudentService,
    private HalaqaService : HalaqaService
  ) {
    this.chartControlForm = this.fb.group({
      showMemorization: [true],
      showReview: [true],
      showCumulative: [false]
    });

    this.chartControlForm.valueChanges.subscribe(() => {
      this.updateChartVisibility();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('studentId');
      if (id) {
        this.studentId = +id;
        this.loadAllReports(this.studentId);
        this.loadhalaqasforStudent(this.studentId);
      } else {
        this.loadAllReports(this.studentId);
      }
      this.cdr.detectChanges();
    });
  }
  filterAttendance(){

  }
  loadhalaqasforStudent(studentId: number): void {
    this.studentService.getAllHalaqaForStudent(studentId).subscribe({
      next: (data) => {
        this.halaqatList = data;
        this.filterHalaqaId = this.halaqatList.length > 0 ? this.halaqatList[0].id : 0;
        this.filterSubjectName = this.halaqatList.length > 0 ? this.halaqatList[0].subjectName :"";
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching halaqas for student:', err)
    });
  }

  prepareAttendanceBarChartData(data: MonthlyWeeklyAttendanceChartDto[]): void {
    const labels = data.map(item => item.period);
    const presentData = data.map(item => item.presentCount);
    const absentData = data.map(item => item.absentCount);
    const excusedData = data.map(item => item.excusedCount);

    this.attendanceBarChartData = {
      labels: labels,
      datasets: [
        {
          label: 'حضور',
          data: presentData,
          backgroundColor: '#4CAF50'
        },
        {
          label: 'غياب',
          data: absentData,
          backgroundColor: '#F44336'
        },
        {
          label: 'معذور',
          data: excusedData,
          backgroundColor: '#FFC107'
        }
      ]
    };
  }

  getAttendancePercentage(): number {

    if (!this.chartData || this.chartData.length === 0) return 0;
    const present = this.chartData.find(item => item.status === 'Present');
    return present ? present.percentage : 0;
  }

  getAttendanceStatusClass(status: string): string {
    switch(status) {
      case 'حضور': return 'present';
      case 'غياب': return 'absent';
      case 'معذور': return 'excused';
      default: return '';
    }
  }

  updateChartVisibility(): void {
    const formValues = this.chartControlForm.value;

    this.quranProgressChartData.datasets[0].hidden = !formValues.showMemorization;
    this.quranProgressChartData.datasets[1].hidden = !formValues.showReview;
    this.quranProgressChartData.datasets[2].hidden = !formValues.showCumulative;

    this.quranProgressChartData = {...this.quranProgressChartData};
  }

  loadAllReports(studentId: number): void {
    this.loadStudentAttendanceDetails(studentId);
    this.loadChartData(studentId); // Pie Chart
    this.loadQuranProgressData(studentId);
    this.loadQuranSummaryCounters(studentId);
    this.loadQuranDetailedProgressReport(studentId);
    this.loadAttendanceData(studentId); // Bar Chart (monthly breakdown)
    this.loadIslamicSubjectPagesChart(studentId);
    this.loadIslamicSubjectProgressOverTimeChart(studentId, this.filterSubjectName);
    this.loadIslamicSubjectsDetailedProgressReport(studentId);
    this.loadStudentHalaqaComparisonReport(studentId, this.filterHalaqaId);
  }

  loadStudentAttendanceDetails(studentId: number): void {
    this.reportsService.getStudentAttendanceDetails(studentId).subscribe({
      next: (data) => {
        this.studentAttendanceDetails = (data && data.length > 0) ? data : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching student attendance details:', err)
    });
  }

  loadAttendanceData(studentId: number): void {
    // جلب بيانات الحضور الشهرية فقط لهذا المخطط
    this.reportsService.getStudentMonthlyWeeklyAttendanceChart(studentId, 'month').subscribe({
      next: (monthlyData) => {
        if (monthlyData && monthlyData.length > 0) {
          this.prepareAttendanceBarChartData(monthlyData);
        } else {
          this.attendanceBarChartData = { labels: [], datasets: [] };
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching monthly attendance chart data:', err)
    });
  }

  loadChartData(studentId: number): void {
    this.reportsService.getStudentAttendanceSummaryPieChart(studentId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.chartData = data;
        } else {
          this.chartData = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching pie chart data:', err)
    });
  }

  loadQuranProgressData(studentId: number): void {
    forkJoin([
      this.reportsService.getStudentMemorizationProgressChart(studentId),
      this.reportsService.getStudentReviewProgressChart(studentId),
      this.reportsService.getStudentWeeklyMonthlyQuranProgress(studentId, 'month')
    ]).subscribe({
      next: ([memData, revData, weeklyData]) => {
        const dates = memData.map(item => new Date(item.date).toLocaleDateString());
        let cumulative = 0;
        const cumulativeData = memData.map(item => {
          cumulative += item.numberOfLines;
          return cumulative;
        });

        this.quranProgressChartData = {
          labels: dates,
          datasets: [
            {
              ...this.quranProgressChartData.datasets[0],
              data: memData.map(item => item.numberOfLines)
            },
            {
              ...this.quranProgressChartData.datasets[1],
              data: revData.map(item => item.numberOfLines)
            },
            {
              ...this.quranProgressChartData.datasets[2],
              data: cumulativeData
            }
          ]
        };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading Quran data:', err)
    });
  }

  loadQuranSummaryCounters(studentId: number): void {
    this.reportsService.getStudentQuranSummaryCounters(studentId).subscribe({
      next: (data) => {
        this.quranSummaryCounters = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching Quran summary:', err)
    });
  }

  loadQuranDetailedProgressReport(studentId: number): void {
    this.reportsService.getStudentQuranDetailedProgressReport(studentId).subscribe({
      next: (data) => {
        this.quranDetailedProgressReport = data && data.length > 0 ? data : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching Quran details:', err)
    });
  }

  loadIslamicSubjectPagesChart(studentId: number): void {
    this.reportsService.getStudentIslamicSubjectPagesChart(studentId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.islamicSubjectPagesChartData = data;
          this.islamicSubjectPagesChart = {
            labels: data.map(item => item.subjectName),
            datasets: [{
              data: data.map(item => item.totalPagesCompleted),
              label: 'إجمالي الصفحات المكتملة',
              backgroundColor: data.map((_, index) =>
                this.getColorForIslamicSubject(index)
              )
            }]
          };
        } else {
          this.islamicSubjectPagesChartData = [];
          this.islamicSubjectPagesChart = { labels: [], datasets: [] };
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching Islamic subject pages:', err)
    });
  }

  private getColorForIslamicSubject(index: number): string {
    const colors = ['#3cba9f', '#e8c3b9', '#c45850', '#8e5ea2', '#3e95cd'];
    return colors[index % colors.length];
  }

  loadIslamicSubjectProgressOverTimeChart(studentId: number, subjectName: string): void {
    this.reportsService.getStudentIslamicSubjectProgressOverTimeChart(studentId, subjectName).subscribe({
      next: (data) => {
        this.islamicSubjectProgressOverTimeData = data && data.length > 0 ? data : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching Islamic progress:', err)
    });
  }

  loadIslamicSubjectsDetailedProgressReport(studentId: number): void {
    this.reportsService.getStudentIslamicSubjectsDetailedProgressReport(studentId).subscribe({
      next: (data) => {
        this.islamicSubjectsDetailedProgressReport = data && data.length > 0 ? data : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching Islamic details:', err)
    });
  }

  loadStudentHalaqaComparisonReport(studentId: number, halaqaId: number): void {
    this.reportsService.getStudentPerformanceComparisonReport(studentId, halaqaId).subscribe({
      next: (data) => {
        this.studentHalaqaComparisonReport = data && data.length > 0 ? data : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching comparison data:', err)
    });
  }

calculateAttendancePercentage(halaqaIndex: number): number {
  // 1. التحقق من وجود البيانات الأساسية
  if (!this.attendanceBarChartData?.datasets?.length) {
    return 0;
  }

  // 2. دالة مساعدة لتحويل القيم إلى أرقام آمنة
  const getSafeNumber = (value: number | [number, number] | null | undefined): number => {
    if (value === null || value === undefined) {
      return 0;
    }
    return Array.isArray(value) ? value[0] : value;
  };

  const present = getSafeNumber(this.attendanceBarChartData.datasets[0]?.data[halaqaIndex]);
  const absent = getSafeNumber(this.attendanceBarChartData.datasets[1]?.data[halaqaIndex]);
  const excused = getSafeNumber(this.attendanceBarChartData.datasets[2]?.data[halaqaIndex]);

  const total = present + absent + excused;
  return total > 0 ? (present / total) * 100 : 0;
}
}
