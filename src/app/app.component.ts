import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<header class="brand-mame">
      <img
        class="brand-logo"
        src="/assets/logo.svg"
        alt="logo"
        aria-hidden="true"
        routerLink="/"
      />
      <h1>Holis</h1>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>Esto es cualquiera</footer>`,
  styleUrl: './app.component.css',
})
export class AppComponent {}
