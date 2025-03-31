import { Component, OnInit } from '@angular/core';
import { GetAgenciesService } from '../services/get-agencies.service';
import { IAgency } from '../iagency';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule], // Import required Angular Material modules here

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  agencyList: IAgency[] = [];  // Array to hold agency data
  wordCount?: number;
  corrections?: number;
  errorMessage?: string;
  totalCorrections?: number;

  constructor(private service: GetAgenciesService) { }

  ngOnInit(): void {
    this.service.getAgencies().subscribe((response: any) => {
      this.agencyList = response.agencies;
    });
    this.service.getCorrections().subscribe((response: any) => {
      this.totalCorrections = response.ecfr_corrections.length;
    });
  }

  getCorrectionByTitle(title: number) {
    this.service.getCorrectionsByTitle(title).subscribe((response: any) => {
      this.corrections = response.ecfr_corrections.length;
    });
  }

  public fetchTitleData(date: string, title?: number): void {
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