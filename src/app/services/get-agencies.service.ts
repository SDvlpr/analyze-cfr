import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAgency } from "../iagency";
import { IEcfrcorrections } from "../iecfrcorrections";
import { map } from 'rxjs/operators';
import { XMLParser } from 'fast-xml-parser';


@Injectable({
    providedIn: "root"
})
export class GetAgenciesService {
    constructor(public http: HttpClient) {}

    public getAgencies(): Observable<IAgency[]>{
        return this.http.get<IAgency[]>(`https://www.ecfr.gov/api/admin/v1/agencies.json`);
    }
    public getCorrections(title: number): Observable<IEcfrcorrections[]>{
        const params = new HttpParams().set('title', title);

        return this.http.get<IEcfrcorrections[]>(`https://www.ecfr.gov/api/admin/v1/corrections.json`, {params});
    }

    public fetchTitleXML(date: string, title: number): Observable<number> {
        const url = `https://www.ecfr.gov/api/versioner/v1/full/${date}/title-${title}.xml`;
        return this.http.get(url, { responseType: 'text' }).pipe(
          map(xmlData => this.countWordsInXML(xmlData))
        );
      }
    private countWordsInXML(xml: string): number {
        const parser = new XMLParser();
        const jsonObj = parser.parse(xml);
        const textContent = this.extractTextContent(jsonObj);
        return textContent.split(/\s+/).filter(Boolean).length;
      }
    
      private extractTextContent(jsonObj: any): string {
        // You should customize this method based on the structure of the XML
        // Here's a simple recursive approach to extract text from an XML object
        let text = '';
        for (const key in jsonObj) {
          if (typeof jsonObj[key] === 'string') {
            text += jsonObj[key] + ' ';
          } else if (typeof jsonObj[key] === 'object') {
            text += this.extractTextContent(jsonObj[key]);
          }
        }
        return text;
      }
}