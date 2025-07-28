import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HalaqaService } from '../../../services/halaqa-service';
import { IHalaqaDto } from '../../../models/Halaqaa/ihalaqa-dto';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IHalaqaForm } from '../../../models/Halaqaa/ihalaqa-form';
import { FormsModule } from '@angular/forms';
import { SubjectService } from '../../../services/subject-service';
import { ISubject } from '../../../models/Subject/isubject';
import { ISubjectForm } from '../../../models/Subject/i-subject-form';
import { JwtService } from '../../../services/jwt-service';
@Component({
  selector: 'app-halaqa-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './halaqa-list.html',
  styleUrl: './halaqa-list.css',
})
export class HalaqaList implements OnInit {
  userRole: string = '';
  halaqas: IHalaqaDto[] = [];
  newHalaqa: IHalaqaForm = {
    name: '',
    description: '',
    genderGroup: 0,
    subjectId: 0,
  };
  editHalaqa: IHalaqaForm = {
    name: '',
    description: '',
    genderGroup: 0,
    subjectId: 0,
  };
  editingHalaqaId: number | null = null;
  subjects: ISubject[] = [];
  isAddingHalaqa = false;
  newSubject: ISubjectForm = {
    id: 0,
    name: '',
  };
  isAddingSubject = false;
  constructor(
    private halaqaService: HalaqaService,
    private cdr: ChangeDetectorRef,
    private subjectService: SubjectService,
    private jwtService: JwtService
  ) {}
  ngOnInit() {
    this.userRole = this.jwtService.getDecodedAccessToken().role;
    this.loadHalaqas();
    this.subjectService.getAllSubjects().subscribe((subjects) => {
      this.subjects = subjects;
      console.log(this.subjects);
      this.cdr.detectChanges();
    });
  }

  loadHalaqas() {
    this.halaqaService.getHalaqaList(true).subscribe({
      next: (halaqas: IHalaqaDto[]) => {
        this.halaqas = halaqas;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error fetching halaqa list:', error);
      },
    });
  }

  addHalaqa() {
    this.isAddingHalaqa = true;
    this.halaqaService.addHalaqa(this.newHalaqa).subscribe({
      next: () => {
        this.loadHalaqas();
        this.newHalaqa = {
          name: '',
          description: '',
          genderGroup: 0,
          subjectId: 0,
        };
        (window as any).bootstrap?.Modal.getOrCreateInstance(
          document.getElementById('addHalaqaModal')
        ).hide();
        this.isAddingHalaqa = false;
      },
      error: (error: unknown) => {
        console.error('Error adding halaqa:', error);
        this.isAddingHalaqa = false;
      },
    });
  }

  deleteHalaqa(halaqa: IHalaqaDto) {
    this.halaqaService.deleteHalaqa(halaqa.id).subscribe({
      next: () => {
        halaqa.isDeleted = true;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error deleting halaqa:', error);
      },
    });
  }

  restoreHalaqa(halaqa: IHalaqaDto) {
    this.halaqaService.restoreHalaqa(halaqa.id).subscribe({
      next: () => {
        halaqa.isDeleted = false;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error restoring halaqa:', error);
      },
    });
  }

  startEditHalaqa(halaqa: IHalaqaDto) {
    this.editingHalaqaId = halaqa.id;
    this.editHalaqa = {
      name: halaqa.name,
      description: halaqa.description,
      genderGroup: halaqa.genderGroup,
      subjectId: 0, // You may want to map subjectName to subjectId if available
    };
  }

  updateHalaqa() {
    if (this.editingHalaqaId !== null) {
      this.halaqaService
        .updateHalaqa(this.editingHalaqaId, this.editHalaqa)
        .subscribe({
          next: () => {
            this.loadHalaqas();
            this.editingHalaqaId = null;
            (window as any).bootstrap?.Modal.getOrCreateInstance(
              document.getElementById('editHalaqaModal')
            ).hide();
          },
          error: (error: unknown) => {
            console.error('Error updating halaqa:', error);
          },
        });
    }
  }
  addSubject() {
    this.isAddingSubject = true;
    this.subjectService.addSubject(this.newSubject).subscribe({
      next: () => {
        this.loadSubjects();
        this.newSubject = {
          id: 0,
          name: '',
        };
        (window as any).bootstrap?.Modal.getOrCreateInstance(
          document.getElementById('addSubjectModal')
        ).hide();
        this.isAddingSubject = false;
      },
      error: (error: unknown) => {
        console.error('Error adding subject:', error);
        this.isAddingSubject = false;
      },
    });
  }
  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe((subjects) => {
      this.subjects = subjects;
      this.cdr.detectChanges();
    });
  }
}
