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
  guestLiveLink: string = '';
  safeGuestLiveLink: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.guestLiveLink = `${environment.meetingBaseUrl}${params['guestLiveLink']}`;
      this.safeGuestLiveLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.guestLiveLink
      );
      this.cdr.detectChanges();
    });
  }

  async joinHalaqa(link: string) {
    // طلب إذن مشاركة الشاشة
    try {
      // منطق مشاركة الشاشة إذا أردت
    } catch {}
  }
}
