import { Component } from '@angular/core';
import { GetAgenciesService } from '../services/get-agencies.service';

@Component({
  selector: 'app-wordcount',
  imports: [],
  templateUrl: './wordcount.component.html',
  styleUrl: './wordcount.component.css'
})
export class WordcountComponent {
    wordCount?: number;
    errorMessage?: string;
    constructor(private service: GetAgenciesService) { }
  
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
