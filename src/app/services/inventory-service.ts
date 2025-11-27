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

interface InventoryGetResponse {
  items: InventoryItem[]
  pageCount: number
}

interface InventoryDeleteResponse {
  success: boolean,
  deletedAmount: number
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

      const res = await firstValueFrom(this.http.get<InventoryGetResponse>(`${this.baseURL}/inventories?${query}`))
      console.log(res)
      return res
    } catch (error: any) {
      console.log(`Couldn't get the inventory items: ${error}`)
      throw error
    }
  }

  async addInventory(newItem: InventoryItem) {
    try {
      const res = await firstValueFrom(this.http.post<InventoryItem>(`${this.baseURL}/inventories`, newItem))
      console.log("The new item is: " + res)
      return res
    } catch (error: any) {
      console.log("Couldn't add new inventory item: ", error)
      throw error
    }
  }

  async removeInventory(id: number) {
    try {
      const res = await firstValueFrom(this.http.delete<InventoryDeleteResponse>(`${this.baseURL}/inventories/${id}`))
      console.log(res)
      return res
    } catch (error: any) {
      console.log("Couldn't remove inventory item: ", error)
      throw error
    }
  }
}
