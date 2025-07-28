import { JwtService } from './../../services/jwt-service';
import { Component, OnInit } from '@angular/core';
import { SmartBot } from '../../services/smart-bot';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SmartQueryRequest,
  SmartQueryResponse,
} from '../../models/smart-query';
import { AuthService } from '../../services/auth-service';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class DashboardChatbot implements OnInit {
  userId!: string;
  userRole!: string;

  messages: ChatMessage[] = [
    {
      sender: 'bot',
      text: 'السلام عليكم ورحمة الله وبركاته! مرحباً بكم في منصة متقن للعلوم الشرعية',
      time: ' ',
    },
    {
      sender: 'bot',
      text: 'كيف يمكنني مساعدتكم في رحلتكم التعليمية اليوم؟',
      time: ' ',
    },
  ];
  userInput: string = '';
  loading: boolean = false;

  constructor(
    private smartBot: SmartBot,
    private authService: AuthService,
    private JwtService: JwtService
  ) {}
  ngOnInit(): void {
    this.userId = this.JwtService.getDecodedAccessToken().userId;
    this.userRole = this.JwtService.getDecodedAccessToken().role;
    console.log(this.userId);
    console.log(this.userRole);
  }

  sendMessage() {
    const trimmed = this.userInput.trim();
    if (!trimmed || this.loading) return;
    const now = new Date();
    const userMsg: ChatMessage = {
      sender: 'user',
      text: trimmed,
      time: now.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    this.messages.push(userMsg);
    this.userInput = '';
    this.loading = true;

    // Create smart query request
    const request: SmartQueryRequest = {
      question: trimmed,
      Id: this.userId,
      role: this.userRole,
    };

    console.log(request);

    this.smartBot.ask(request).subscribe({
      next: (response: SmartQueryResponse) => {
        console.log(response);
        const botMsg: ChatMessage = {
          sender: 'bot',
          text:
            response.answer || 'عذراً، لم أتمكن من فهم سؤالك. حاول مرة أخرى.',
          time: new Date().toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        this.messages.push(botMsg);
        this.loading = false;
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (error) => {
        console.error('SmartBot error:', error);
        this.messages.push({
          sender: 'bot',
          text: 'حدث خطأ أثناء الاتصال بالمساعد الذكي. حاول مرة أخرى.',
          time: new Date().toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
        this.loading = false;
        setTimeout(() => this.scrollToBottom(), 100);
      },
    });
    setTimeout(() => this.scrollToBottom(), 100);
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  scrollToBottom() {
    const el = document.getElementById('messagesEndRef');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
