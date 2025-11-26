import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface Location {
  name: string
}

export interface InventoryItem {
  id: number
  name: string
  price: number
  locationId?: number
  createdAt?: Date
  updatedAt?: Date
  location: Location
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private baseURL = 'http://localhost:3000'
  private pageNumber?: number = 1
  private filterBy?: string = 'ყველა'
  private sortBy?: string = 'სახელით'

  constructor(private http: HttpClient) {}

  async getInventory(page?: number, filter?: string, sort?: string) {
    try {
      if (page) {
        this.pageNumber = page
      }

      if (filter) {
        this.filterBy = filter
      }

      if (sort) {
        this.sortBy = sort
      }

      const queryParts: string[] = []

      const queryMap: Record<string | number, string | number | undefined> = {
        page: this.pageNumber,
        filter: this.filterBy,
        sort: this.sortBy
      }

      for (const [key, value] of Object.entries(queryMap)) {
        if (key) queryParts.push(`${key}=${value}`)
      }

      const query = queryParts.join('&')
      console.log(query)

      const res = await firstValueFrom(this.http.get<InventoryItem[]>(`${this.baseURL}/inventories?${query}`))
      console.log(res)
      return res
    } catch (error) {
      console.log(`Couldn't get the inventory items: ${error}`)
      throw error
    }
  }
}
