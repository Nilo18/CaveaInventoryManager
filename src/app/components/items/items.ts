import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { InventoryItem, InventoryService } from '../../services/inventory-service';
// declare var bootstrap: any;

@Component({
  selector: 'app-items',
  standalone: false,
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class Items {
  items: InventoryItem[] = []

  constructor(private inventory: InventoryService, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    const res = await this.inventory.getInventory()
    this.items = res
    console.log(this.items)
    this.cd.detectChanges()
  }

  showStatisticsModal: boolean = false;

  showModal() {
    this.showStatisticsModal = true
    document.body.classList.add('no-scroll')
    console.log(this.showStatisticsModal)
  }

  closeModal(event: boolean) {
    this.showStatisticsModal = event
  }
}
