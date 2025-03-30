import { Component, OnInit } from '@angular/core';
import { GetAgenciesService } from '../services/get-agencies.service';
import { IAgency } from '../iagency';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule , MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule], // Import required Angular Material modules here

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  agencyList: IAgency[] = [];  // Array to hold agency data
  wordCount?: number;
  errorMessage?: string;

  constructor(private service: GetAgenciesService) { }

  ngOnInit(): void {
    this.service.getAgencies().subscribe((response: any) => {
      this.agencyList = response.agencies;
    });
  }

  getCorrectionByTitle(title: number) {
    this.service.getCorrections(title).subscribe((response: any) => {
      console.log('corrections', response.ecfr_corrections.length)
    });
  }

  public fetchTitleData(date: string, title?: number): void {
    // let date = '2025-03-27';
    // let title = 1;
    if (date && title) {
      this.service.fetchTitleXML(date, title).subscribe({
        next: count => {
          this.wordCount = count;
          this.errorMessage = '';
        },
        error: error => {
          this.errorMessage = 'Failed to fetch data';
          console.error('There was an error!', error);
        }
      });
    } else {
      this.errorMessage = 'Please provide both date and title.';
    }
  }
}