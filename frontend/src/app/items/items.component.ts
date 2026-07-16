import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Items Catalog</h1>
    <div *ngIf="loading" class="loading">Loading items...</div>
    <div *ngIf="error" class="error">Failed to load items: {{ error }}</div>
    <ul *ngIf="!loading && !error" class="item-list">
      <li *ngFor="let item of items" class="item-card" [class.out-of-stock]="!item.in_stock">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">{{ item.price | currency }}</span>
        <span *ngIf="!item.in_stock" class="stock-badge">Out of stock</span>
      </li>
    </ul>
  `,
  styles: [`
    h1 { color: #333; margin-bottom: 1rem; }
    .item-list { list-style: none; padding: 0; }
    .item-card {
      display: flex; align-items: center; gap: 1rem;
      padding: 0.75rem 1rem; margin-bottom: 0.5rem;
      border: 1px solid #ddd; border-radius: 6px;
      background: #fafafa;
    }
    .item-card.out-of-stock { opacity: 0.6; }
    .item-name { font-weight: 600; flex: 1; }
    .item-price { color: #2a7d2a; font-weight: 500; }
    .stock-badge { background: #e74c3c; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
    .loading, .error { padding: 1rem; }
    .error { color: #e74c3c; }
  `]
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  loading = true;
  error = '';

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
