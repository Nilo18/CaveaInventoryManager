import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlHolderService {
    private baseURL = 'http://localhost:3000'

    getBaseURL() {
      return this.baseURL
    }
}
