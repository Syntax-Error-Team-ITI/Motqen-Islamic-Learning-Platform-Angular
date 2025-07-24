import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IParentList } from '../../../models/parent/iparent-list';
import { ParentService } from '../../../services/parent-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-parent-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './parent-list.html',
  styleUrl: './parent-list.css',
})
export class ParentList implements OnInit {
  parents: IParentList[] = [];
  constructor(
    private parentService: ParentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.parentService.getParents().subscribe({
      next: (parents) => {
        this.parents = parents;
        console.log(this.parents);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
