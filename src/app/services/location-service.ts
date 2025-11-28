import { Injectable } from '@angular/core';
import { BaseUrlHolderService } from './base-url-holder-service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


export interface LocationStats {
  id: number
  name: string,
  totalItems: number,
  totalPrice: number
}

export interface LocationGetResponse {
  locations: LocationStats[]
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseURL: string

  constructor (private http: HttpClient, private urlHolder: BaseUrlHolderService) {
    this.baseURL = urlHolder.getBaseURL()
  }

  async getLocations() {
    try {
      const res = await firstValueFrom(this.http.get<LocationGetResponse>(`${this.baseURL}/locations`))
      console.log(res)
      return res
    } catch (error) {
      console.log("Couldn't get locations: ", error)
      throw error
    }
  }

  async addLocation(name: string) {
    try {
      console.log('Received: ', name)
      const res = await firstValueFrom(this.http.post(`${this.baseURL}/locations`, {name}))
      console.log(res)
      return res; 
    } catch (error) {
      console.log("Couldn't add the location: ", error)
      throw error
    }
  }

  async deleteLocation(id: number) {
    try {
      const res = await firstValueFrom(this.http.delete(`${this.baseURL}/locations/${id}`))
      console.log(res)
      return res
    } catch (error) {
      console.log("Couldn't delete the location: ", error)
      throw error
    }
  }

  async updateLocation(id: number, newName: string) {
    try {
      console.log({id, newName})
      const res = await firstValueFrom(this.http.put(`${this.baseURL}/locations`, {id, newName}))
      console.log(res)
      return res
    } catch (error) {
      console.log("Couldn't delete the location: ", error)
      throw error
    }
  }

}
