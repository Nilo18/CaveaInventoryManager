import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { InventoryItem, InventoryService } from '../../services/inventory-service';

@Component({
  selector: 'app-items',
  standalone: false,
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class Items {
  items: InventoryItem[] = []
  showStatisticsModal: boolean = false;
  filterOption: string = 'ყველა'
  sortOption: string = 'სახელით'
  page: number = 1
  pageCount!: number

  constructor(private inventory: InventoryService, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    const res = await this.inventory.getInventory()
    this.items = res.items
    this.pageCount = res.pageCount
    console.log(this.items)
    this.cd.detectChanges()
  }

  async applySortsAndFilters() {
    const res = await this.inventory.getInventory(this.page, this.filterOption, this.sortOption)
    console.log(this.filterOption)
    console.log(this.sortOption)
    this.items = res.items
    this.pageCount = res.pageCount
    this.cd.detectChanges()
  }

  calculateNextPage() {
    this.page = this.page < this.pageCount ? this.page + 1 : 1
    return this.page
    // return currPage + 1
    // return this.page + 1
  }

  async getNextPage() {
    const nextPage = this.calculateNextPage()
    console.log(nextPage)
    const res = await this.inventory.getInventory(nextPage, this.filterOption, this.sortOption)
    this.items = res.items
    this.pageCount = res.pageCount
    this.cd.detectChanges()
  }

  calculatePreviousPage() {
    this.page = this.page > 0 ? this.page - 1 : 1
    return this.page
  }

  async getPageByNumber(pageNumber: number) {
    console.log(pageNumber)
    this.page = pageNumber
    const res = await this.inventory.getInventory(this.page, this.filterOption, this.sortOption)
    this.items = res.items
    this.pageCount = res.pageCount
    this.cd.detectChanges()
  }

  async getPrevPage() {
    const prevPage = this.calculatePreviousPage()
    console.log(prevPage)
    const res = await this.inventory.getInventory(prevPage, this.filterOption, this.sortOption)
    this.items = res.items
    this.pageCount = res.pageCount
    this.cd.detectChanges()
  }

  // This is a wrapper for the pagination template in HTML
  // It is necessary because ngFor can not directly loop over a number
  // This way we return an array of indeces and ngFor will be able to loop over the length of the array
  getPageCount() {
    return Array.from({length: this.pageCount}, (_, i) => i)
  }

  showModal() {
    this.showStatisticsModal = true
    document.body.classList.add('no-scroll')
    console.log(this.showStatisticsModal)
  }

  closeModal(event: boolean) {
    this.showStatisticsModal = event
  }
}
