import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private myBudget: Budget[] = []
  constructor(private http: HttpClient) {
  }

  getMyBudget(): Observable<Budget[]> {
    if (this.myBudget.length == 0) {
      return this.http.get<any>('http://localhost:3000/budget')
      .pipe(map((res: any) => {
        this.myBudget = res.myMonthlyBudget
        return this.myBudget
      }))
    } else {
      return of(this.myBudget)
    }
  }
}

export interface Budget {
  title: string;
  budget: number;
}

