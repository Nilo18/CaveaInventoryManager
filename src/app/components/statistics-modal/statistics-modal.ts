import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-statistics-modal',
  standalone: false,
  templateUrl: './statistics-modal.html',
  styleUrl: './statistics-modal.scss',
})
export class StatisticsModal {
  @Output() closeModal = new EventEmitter<boolean>()

  closeStatsModal() {
    this.closeModal.emit(false)
    document.body.classList.remove('no-scroll')
  }
}
