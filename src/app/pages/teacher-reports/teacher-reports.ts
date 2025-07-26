import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Teacher_Reports } from '../../services/teacher-reports.service';
import {
  QuranProgressChartPointDto,
  MonthlyWeeklyAttendanceChartDto,
  StudentAttendancePieChartDto,
  IslamicSubjectsDetailedProgressReportDto,
} from '../../models/reports/report-dtos';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import {
  HalaqaComparisonDto,
  TeacherDashboardDto,
  TeacherQuranSummaryDto,
} from '../../models/reports/teacher_reports-dtos';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.html',
  styleUrls: ['./teacher-reports.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective, ReactiveFormsModule , DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherReports implements OnInit {
  selectedHalaqas: number[] = [];
  teacherId: number = 2;
  selectedHalaqaId: number | null = null;
  isLoading: boolean = false;

  chartControlForm: FormGroup;

  dashboardData: TeacherDashboardDto | null = null;

  quranProgressData: QuranProgressChartPointDto[] = [];
  quranSummaryData: TeacherQuranSummaryDto | null = null;

  attendanceTrendData: MonthlyWeeklyAttendanceChartDto[] = [];
  attendanceSummaryData: StudentAttendancePieChartDto[] = [];

  islamicProgressData: IslamicSubjectsDetailedProgressReportDto[] = [];

  public comparisonChartData: ChartData<'bar'> = {
    labels: [] as string[],
    datasets: [
      {
        label: 'الحفظ الجديد',
        data: [] as number[],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'المراجعة',
        data: [] as number[],
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        borderWidth: 1,
      },
      {
        label: 'المتوسط لكل طالب',
        data: [] as number[],
        backgroundColor: '#FF9800',
        borderColor: '#F57C00',
        borderWidth: 1,
      },
    ],
  };

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { stacked: false },
      y: {
        stacked: false,
        title: {
          display: true,
          text: 'عدد الآيات',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        rtl: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            label += context.parsed.y.toLocaleString();
            return label;
          },
        },
      },
    },
  };

  public quranProgressChartData: ChartData<'line'> = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        label: 'الحفظ الجديد',
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: false,
        tension: 0.1,
        borderWidth: 2,
      },
      {
        data: [] as number[],
        label: 'المراجعة',
        borderColor: '#2196F3', // أزرق
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: false,
        tension: 0.1,
        borderWidth: 2,
      },
      {
        data: [] as number[],
        label: 'الحفظ التراكمي',
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.1)',
        fill: true,
        tension: 0.1,
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  public attendancePieChartData: ChartData<'pie'> = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
      },
    ],
  };

  public attendanceTrendChartData: ChartData<'bar'> = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        label: 'حضور',
        backgroundColor: '#4CAF50',
      },
      {
        data: [] as number[],
        label: 'غياب',
        backgroundColor: '#F44336',
      },
      {
        data: [] as number[],
        label: 'إعذار',
        backgroundColor: '#FFEB3B',
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: { title: { display: true, text: 'عدد الطلاب' } },
      x: { title: { display: true, text: 'الفترة' } },
    },
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        rtl: true,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y} آيات`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'عدد الآيات',
          font: {
            weight: 'bold',
          },
        },
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: 'التاريخ',
          font: {
            weight: 'bold',
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  constructor(
    private fb: FormBuilder,
    private teacherReportsService: Teacher_Reports,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.chartControlForm = this.fb.group({
      showAttendanceTrend: [true],
      showAttendanceSummary: [true],
      showQuranProgress: [true],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('teacherId');
      if (id) {
        this.teacherId = +id;
      }
      this.loadTeacherData(this.teacherId);
    });
  }

  loadTeacherData(teacherId: number): void {
    this.isLoading = true;
    this.teacherReportsService.getTeacherDashboard(teacherId).subscribe({
      next: (data) => {
        this.dashboardData = data;
        if (data?.halaqasProgress?.length > 0) {
          this.selectedHalaqaId = data.halaqasProgress[0].halaqaId;
          this.loadHalaqaData(this.selectedHalaqaId);
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading teacher dashboard:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadHalaqaData(halaqaId: number): void {
    this.isLoading = true;
    forkJoin([
      this.teacherReportsService.getHalaqaMemorizationProgress(halaqaId),
      this.teacherReportsService.getHalaqaQuranSummary(halaqaId),
      this.teacherReportsService.getHalaqaAttendanceTrend(halaqaId, 'month'),
      this.teacherReportsService.getHalaqaAttendanceSummary(halaqaId),
      this.teacherReportsService.getHalaqaIslamicProgress(halaqaId),
    ]).subscribe({
      next: ([
        quranProgress,
        quranSummary,
        attendanceTrend,
        attendanceSummary,
        islamicProgress,
      ]) => {
        this.quranProgressData = quranProgress;
        this.quranSummaryData = quranSummary;
        this.attendanceTrendData = attendanceTrend;
        this.attendanceSummaryData = attendanceSummary;
        this.islamicProgressData = islamicProgress;

        this.updateChartData();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading halaqa data:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  toggleDatasetVisibility(index: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const hidden = !isChecked;

    this.quranProgressChartData.datasets[index].hidden = hidden;
    this.quranProgressChartData = { ...this.quranProgressChartData };
    this.cdr.detectChanges();
  }
  updateChartData(): void {

    const memorizationData = this.quranProgressData
      .filter((item) => item.type === 'Memorization')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const reviewData = this.quranProgressData
      .filter((item) => item.type === 'Review')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    let cumulativeMemorization = 0;
    const cumulativeData = memorizationData.map((item) => {
      cumulativeMemorization += item.numberOfLines;
      return cumulativeMemorization;
    });

    const dates = memorizationData.map((item) =>
      new Date(item.date).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    );

    this.quranProgressChartData = {
      labels: dates,
      datasets: [
        {
          label: 'الحفظ الجديد',
          data: memorizationData.map((item) => item.numberOfLines),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: false,
          tension: 0.1,
          borderWidth: 2,
        },
        {
          label: 'المراجعة',
          data: reviewData.map((item) => item.numberOfLines),
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          fill: false,
          tension: 0.1,
          borderWidth: 2,
        },
        {
          label: 'الحفظ التراكمي',
          data: cumulativeData,
          borderColor: '#9C27B0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          fill: true,
          tension: 0.1,
          borderWidth: 2,
          borderDash: [5, 5],
        },
      ],
    };

    this.attendancePieChartData = {
      labels: this.attendanceSummaryData.map((item) => item.status),
      datasets: [
        {
          data: this.attendanceSummaryData.map((item) => item.count),
          backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
          hoverOffset: 10,
        },
      ],
    };

    this.attendanceTrendChartData = {
      labels: this.attendanceTrendData.map((item) => item.period),
      datasets: [
        {
          label: 'حضور',
          data: this.attendanceTrendData.map((item) => item.presentCount),
          backgroundColor: '#4CAF50',
          borderColor: '#388E3C',
          borderWidth: 1,
        },
        {
          label: 'غياب',
          data: this.attendanceTrendData.map((item) => item.absentCount),
          backgroundColor: '#F44336',
          borderColor: '#D32F2F',
          borderWidth: 1,
        },
        {
          label: 'إعذار',
          data: this.attendanceTrendData.map((item) => item.excusedCount),
          backgroundColor: '#FFEB3B',
          borderColor: '#FFC107',
          borderWidth: 1,
        },
      ],
    };

    this.cdr.detectChanges();
  }

  updateComparisonChartData(comparisonData: HalaqaComparisonDto[]): void {
    this.comparisonChartData = {
      labels: comparisonData.map((h) => h.halaqaName),
      datasets: [
        {
          label: 'الحفظ الجديد',
          data: comparisonData.map((h) => h.quranProgress.totalLinesMemorized),
          backgroundColor: '#4CAF50',
          borderColor: '#388E3C',
          borderWidth: 1,
        },
        {
          label: 'المراجعة',
          data: comparisonData.map((h) => h.quranProgress.totalLinesReviewed),
          backgroundColor: '#2196F3',
          borderColor: '#1976D2',
          borderWidth: 1,
        },
        {
          label: 'المتوسط لكل طالب',
          data: comparisonData.map((h) => h.averageLinesPerStudent),
          backgroundColor: '#FF9800',
          borderColor: '#F57C00',
          borderWidth: 1,
        },
      ],
    };
  }

  toggleHalaqaSelection(halaqaId: number): void {
    const index = this.selectedHalaqas.indexOf(halaqaId);
    if (index === -1) {
      this.selectedHalaqas.push(halaqaId);
    } else {
      this.selectedHalaqas.splice(index, 1);
    }
  }

  compareHalaqas(): void {
    if (this.selectedHalaqas.length < 2) {
      alert('الرجاء اختيار حلقتين على الأقل للمقارنة');
      return;
    }

    this.isLoading = true;
    this.teacherReportsService
      .getHalaqasComparison(this.selectedHalaqas)
      .subscribe({
        next: (data) => {
          this.updateComparisonChartData(data);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Comparison error:', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  onHalaqaSelect(halaqaId: number): void {
    this.selectedHalaqaId = halaqaId;
    this.loadHalaqaData(halaqaId);
  }
}
