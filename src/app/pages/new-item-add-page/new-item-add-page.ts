import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryItem, InventoryService } from '../../services/inventory-service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private inventory: InventoryService, private router: Router) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      location: ['მთავარი ოფისი', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required]]
    })

    // Disable backend errors on input field changes
    this.addForm.valueChanges.subscribe(() => {
      this.gotError = false;
      this.errMsg = ''
    })
  }

  get nameErrors() {
    if (this.addForm.get('name')?.hasError('required')) return 'გთხოვთ შეიყვანოთ ნივთის სახელი.'
    if (this.addForm.get('name')?.hasError('minlength')) return 'ნივთის სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან.'
    return ''
  }

  async addNewItem() {
    // Reset the error handlers on every call to avoid stale error messages
    this.gotError = false
    this.errMsg = ''

    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched()
      console.log('The form is invalid')
      return;
    }

    try {
      console.log(this.addForm.value)
      // Disable the button for sometime to prevent spamming
      const res = await this.inventory.addInventory(this.addForm.value)
      // this.router.navigate(['/'])
    } catch (error: any) {
      console.log(error.error)
      this.gotError = true
      this.errMsg = 'დამატებისას მოხდა შეცდომა, გთხოვთ სცადეთ ახლიდან.'
    }
  }
}
