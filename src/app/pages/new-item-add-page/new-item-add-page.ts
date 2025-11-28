import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryItem, InventoryService } from '../../services/inventory-service';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location-service';

@Component({
  selector: 'app-new-item-add-page',
  standalone: false,
  templateUrl: './new-item-add-page.html',
  styleUrl: './new-item-add-page.scss',
})
export class NewItemAddPage {
  addForm!: FormGroup
  gotError: boolean = false
  errMsg: string = ''
  addSuccess: boolean = false
  successMsg: string = ''
  locations: any[] = []

  constructor(private fb: FormBuilder, private inventory: InventoryService, private router: Router, 
    private cd: ChangeDetectorRef, private locationService: LocationService) {}

  async ngOnInit() {
    this.addForm = this.fb.group({
      location: ['მთავარი ოფისი', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })

    const locResponse = await this.locationService.getLocations()
    this.locations = locResponse.locations
    this.cd.detectChanges()

    // Disable backend errors on input field changes
    this.addForm.valueChanges.subscribe(() => {
      this.gotError = false;
      this.errMsg = ''
    })
  }

  get nameErrors() {
    if (this.addForm.get('name')?.hasError('required')) return 'გთხოვთ შეიყვანოთ ნივთის სახელი.'
    return ''
  }

  async addNewItem() {
    // Reset the error handlers on every call to avoid stale error messages
    this.gotError = false
    this.errMsg = ''
    this.addSuccess = false
    this.successMsg = ''

    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched()
      console.log('The form is invalid')
      return;
    }

    try {
      console.log(this.addForm.value)
      const res = await this.inventory.addInventory(this.addForm.value)
      this.addSuccess = true
      this.successMsg = 'დაემატა წარმატებით!'
      // Reset the success message after 2 seconds
      setTimeout(() => {
        this.addSuccess = false
        this.successMsg = ''
        console.log(this.addSuccess, this.successMsg)
        this.cd.detectChanges()
      }, 2000)
      this.cd.detectChanges()
      // this.router.navigate(['/'])
    } catch (error: any) {
      this.gotError = true
      console.log(this.gotError)
      this.errMsg = 'დამატებისას მოხდა შეცდომა.'
      this.addSuccess = false
      this.successMsg = ''
      this.cd.detectChanges()
      console.log(this.errMsg)
    }
  }
}
