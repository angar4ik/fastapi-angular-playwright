import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="app-header">
      <h1>📦 FastAPI + Angular + Playwright Demo</h1>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .app-header {
      background: #1976d2; color: #fff; padding: 1rem 2rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }
    .app-header h1 { margin: 0; font-size: 1.4rem; }
    main { padding: 2rem; max-width: 800px; margin: 0 auto; }
  `]
})
export class AppComponent {}
