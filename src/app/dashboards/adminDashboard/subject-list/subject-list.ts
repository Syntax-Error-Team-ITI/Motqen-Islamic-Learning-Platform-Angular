import { ChangeDetectorRef, Component } from '@angular/core';
import { ISubject } from '../../../models/Subject/isubject';
import { SubjectService } from '../../../services/subject-service';
import { CommonModule } from '@angular/common';
import { ISubjectForm } from '../../../models/Subject/i-subject-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-list.html',
  styleUrl: './subject-list.css',
})
export class SubjectList {
  subjects: ISubject[] = [];
  newSubject: ISubjectForm = {
    id: 0,
    name: '',
  };
  isSavingSubject = false;
  constructor(
    private subjectService: SubjectService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.loadSubjects();
  }
  loadSubjects() {
    this.subjectService.getAllSubjects(true).subscribe((subjects) => {
      this.subjects = subjects;
      this.cdr.detectChanges();
    });
  }
  deleteSubject(subject: ISubject) {
    this.subjectService.deleteSubject(subject.id).subscribe({
      next: () => {
        subject.isDeleted = true;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error deleting subject:', error);
      },
    });
  }
  restoreSubject(subject: ISubject) {
    this.subjectService.restoreSubject(subject.id).subscribe({
      next: () => {
        subject.isDeleted = false;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error restoring subject:', error);
      },
    });
  }
  saveSubject(subject: ISubjectForm) {
    if (subject.id === 0) {
      this.addSubject();
    } else {
      this.updateSubject(subject);
    }
    this.newSubject = {
      id: 0,
      name: '',
    };
    this.cdr.detectChanges();
    (window as any).bootstrap?.Modal.getOrCreateInstance(
      document.getElementById('addSubjectModal')
    ).hide();
    this.isSavingSubject = false;
  }
  addSubject() {
    this.isSavingSubject = true;
    this.subjectService.addSubject(this.newSubject).subscribe({
      next: () => {
        this.subjectService.getAllSubjects(true).subscribe((subjects) => {
          this.subjects = subjects;
          this.cdr.detectChanges();
        });
      },
      error: (error: unknown) => {
        console.error('Error adding subject:', error);
        this.isSavingSubject = false;
      },
    });
  }
  updateSubject(subject: ISubjectForm) {
    this.isSavingSubject = true;
    this.subjectService.updateSubject(subject.id, subject).subscribe({
      next: () => {
        this.subjectService.getAllSubjects(true).subscribe((subjects) => {
          this.subjects = subjects;
          this.cdr.detectChanges();
        });
      },
      error: (error: unknown) => {
        console.error('Error updating subject:', error);
        this.isSavingSubject = false;
      },
    });
  }
  startEditSubject(subject: ISubject) {
    this.newSubject = {
      id: subject.id,
      name: subject.name,
    };
  }
}
