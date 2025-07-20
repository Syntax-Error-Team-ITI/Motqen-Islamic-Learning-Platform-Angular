import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  imports: [],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements OnInit, AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // This lifecycle hook is called after Angular has fully initialized a component's view.
    // It's the ideal place to interact with DOM elements directly.
    this.setupChatbotInteractions();
  }

  ngOnDestroy(): void {
    // Clean up event listeners here to prevent memory leaks
    this.removeChatbotInteractions();
  }

  private chatbotToggle: HTMLElement | null = null;
  private chatbotContainer: HTMLElement | null = null;
  private closeChatbotBtn: HTMLElement | null = null;
  private messagesEndRef: HTMLElement | null = null;

  private setupChatbotInteractions(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.chatbotToggle = document.getElementById('chatbotToggle');
    this.chatbotContainer = document.getElementById('chatbotContainer');
    this.closeChatbotBtn = document.getElementById('closeChatbot');
    this.messagesEndRef = document.getElementById('messagesEndRef');

    if (this.chatbotToggle) {
      this.chatbotToggle.addEventListener(
        'click',
        this.toggleChatbot.bind(this)
      );
    }
    if (this.closeChatbotBtn) {
      this.closeChatbotBtn.addEventListener(
        'click',
        this.closeChatbot.bind(this)
      );
    }

    // Optional: Initial scroll to bottom if opened by default or on load
    // For static HTML, it starts closed, so this is mainly for dynamic use
    if (
      this.chatbotContainer &&
      this.chatbotContainer.classList.contains('open')
    ) {
      this.messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private removeChatbotInteractions(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.chatbotToggle) {
      this.chatbotToggle.removeEventListener(
        'click',
        this.toggleChatbot.bind(this)
      );
    }
    if (this.closeChatbotBtn) {
      this.closeChatbotBtn.removeEventListener(
        'click',
        this.closeChatbot.bind(this)
      );
    }
  }

  private toggleChatbot(): void {
    if (this.chatbotContainer) {
      this.chatbotContainer.classList.toggle('open');
      if (this.chatbotContainer.classList.contains('open')) {
        // Scroll to bottom when opening
        this.messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  private closeChatbot(): void {
    if (this.chatbotContainer) {
      this.chatbotContainer.classList.remove('open');
    }
  }
}
