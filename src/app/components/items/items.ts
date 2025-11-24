import { Component, Input } from '@angular/core';
// declare var bootstrap: any;

@Component({
  selector: 'app-items',
  standalone: false,
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class Items {
  items: any[] = [
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
        {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
    {
      name: "Sonic 3",
      location: "Cavea ისთ–ფოინთ",
      price: "33ლ",
    },
  ]

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
