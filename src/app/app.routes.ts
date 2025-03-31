import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WordcountComponent } from './wordcount/wordcount.component';
import { CorrectionsComponent } from './corrections/corrections.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full' },
    // { path: 'wordCount', component: WordcountComponent },
    // { path: 'corrections', component: CorrectionsComponent },
];
