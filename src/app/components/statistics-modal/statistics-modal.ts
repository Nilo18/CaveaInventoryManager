import { Component, EventEmitter, Output, ChangeDetectorRef, HostListener } from '@angular/core';
import { LocationService, LocationStats, LocationGetResponse } from '../../services/location-service';

@Component({
  selector: 'app-statistics-modal',
  standalone: false,
  templateUrl: './statistics-modal.html',
  styleUrl: './statistics-modal.scss',
})
export class StatisticsModal {
  @Output() closeModal = new EventEmitter<boolean>()
  locationStats: any[] = []
  showAddModal: boolean = false
  newLocationName: string = ''
  nameFlags: boolean[] = []
  updateIndex: number = -1
  updatedLocationName: string = ''

  constructor(private locations: LocationService, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const res = await this.locations.getLocations()
      this.locationStats = res.locations
      this.nameFlags = new Array(this.locationStats.length).fill(false)
      console.log(this.nameFlags)
      this.cd.detectChanges()
      console.log(this.locationStats)
    } catch (error) {
      
    }
  }

  // This method will receive new data for every operation
  async refreshModal() {
    const response = await this.locations.getLocations()
    this.locationStats = response.locations
    this.nameFlags = new Array(this.locationStats.length).fill(false)
    this.cd.detectChanges()
  }

  closeStatsModal() {
    this.closeModal.emit(false)
    document.body.classList.remove('no-scroll')
  }

  toggleAdditionMmodal(val: boolean) {
    this.showAddModal = val
  }


  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement

    if (this.showAddModal && (!target.closest('.location-addition-modal') && !target.closest('.add-button'))) {
      this.toggleAdditionMmodal(false)
    }
  }

 async addNewLocation() {
    this.toggleAdditionMmodal(false)

    if (this.newLocationName === '') {
      console.log("The location name is empty")
      return
    }

    console.log("Adding: ", this.newLocationName)
    try {
      const res = await this.locations.addLocation(this.newLocationName)
      this.refreshModal()
      // const response = await this.locations.getLocations()
      // this.locationStats = response.locations
      // this.nameFlags = new Array(this.locationStats.length).fill(false)
      this.newLocationName = ''
      // this.cd.detectChanges()
    } catch (error) {
      
    }
  }

  async deleteLocation(id: number) {
    try {
      const res = await this.locations.deleteLocation(id)
      this.refreshModal()
      // const response = await this.locations.getLocations()
      // this.locationStats = response.locations
      // this.nameFlags = new Array(this.locationStats.length).fill(false)
      // this.cd.detectChanges()
    } catch (error) {
      
    }
  }

  toggleLocationUpdate(id: number) {
    const locationIndex = this.locationStats.findIndex(location => location.id === id)
    this.updateIndex = locationIndex
    console.log(this.updateIndex)
    this.nameFlags[this.updateIndex] = !this.nameFlags[this.updateIndex]
  }

  async updateLocation(id: number) {
    this.toggleLocationUpdate(id)
    if (this.updatedLocationName.trim() === '') {
      console.log("The new location name is empty.")
      return
    }

    console.log(this.updatedLocationName)
    console.log(this.nameFlags)
    
    try {
      const res = await this.locations.updateLocation(id, this.updatedLocationName)
      this.refreshModal()
      // const response = await this.locations.getLocations()
      // this.locationStats = response.locations
      // this.nameFlags = new Array(this.locationStats.length).fill(false)
      // this.cd.detectChanges()
      this.updatedLocationName = ''
    } catch (error) {
      
    }
  }
}
