import { Routes } from '@angular/router';
import { CrudTableComponent } from './components/crud-table/crud-table.component';

export const routes: Routes = [
    { path: '', redirectTo: 'crud-table', pathMatch: 'full'},
    { path : 'crud-table', component : CrudTableComponent}
];
