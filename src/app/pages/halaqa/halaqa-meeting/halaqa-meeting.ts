import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-halaqa-meeting',
  templateUrl: './halaqa-meeting.html',
  imports: [CommonModule],
  styleUrl: './halaqa-meeting.css',
})
export class HalaqaMeeting implements OnInit {
  micGranted = false;
  camGranted = false;
  liveLink: string = '';
  safeLiveLink: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.liveLink = `${environment.meetingBaseUrl}${params['liveLink']}`;
      this.safeLiveLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.liveLink
      );
      this.cdr.detectChanges();
    });
  }
}
