import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Login } from './pages/login/login';
import { Halaqas } from './pages/halaqas/halaqas';
import { Chatbot } from './layout/chatbot/chatbot';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, AboutUs, Login, Halaqas, Chatbot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Motqen-Islamic-Learning-Platform-Angular';
}
