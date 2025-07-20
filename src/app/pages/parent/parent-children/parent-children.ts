import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParentService } from '../../../services/parent-service';
import { IParentChildren } from '../../../models/parent/iparent-children';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent-children',
  imports: [CommonModule],
  templateUrl: './parent-children.html',
  styleUrl: './parent-children.css',
})
export class ParentChildren implements OnInit {
  children: IParentChildren[] = [];
  parentId: number = 2;

  constructor(
    private parentService: ParentService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.parentId = id;
      }
    });
    console.log(this.parentId);
    this.parentService.getParentChildren(this.parentId).subscribe({
      next: (children) => {
        this.children = children;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching children:', error);
      },
    });
  }
}
