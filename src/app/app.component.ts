import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrudTableComponent } from './components/crud-table/crud-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrudTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-table';
}
