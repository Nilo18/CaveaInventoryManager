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

  constructor(private http: HttpClient) {}

  async getInventory() {
    try {
      const res = await firstValueFrom(this.http.get<InventoryItem[]>(`${this.baseURL}/inventories`))
      console.log(res)
      return res
    } catch (error) {
      console.log(`Couldn't get the inventory items: ${error}`)
      throw error
    }
  }
}
