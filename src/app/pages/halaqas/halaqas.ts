import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HalaqaService } from '../../services/halaqa-service';
import { IHalaqaDto } from '../../models/Halaqaa/ihalaqa-dto';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-halaqas',
  imports: [RouterLink],
  templateUrl: './halaqas.html',
  styleUrl: './halaqas.css',
})
export class Halaqas implements OnInit {
  halaqas: IHalaqaDto[] = [];
  constructor(
    private halaqaService: HalaqaService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.halaqaService.getHalaqaList().subscribe({
      next: (halaqas: IHalaqaDto[]) => {
        this.halaqas = halaqas;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error fetching halaqa list:', error);
      },
    });
  }
}
