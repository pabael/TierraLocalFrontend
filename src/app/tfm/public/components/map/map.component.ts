import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.sass'
})
export class MapComponent implements OnInit{

  @Input()
  provinces: string[] = [];

  @Output()
  public onProvince: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    const provinciasElementos = document.querySelectorAll('path');
    provinciasElementos.forEach(element => {
      const provinceName = element.getAttribute('name');

      if (provinceName && this.provinces.includes(provinceName.toUpperCase())) {
        element.classList.remove('disabled');
      } else {
          element.classList.add('disabled');
      }
  });
}

  clickedProvince(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.classList.contains('disabled')) return;

    const provinciasElementos = document.querySelectorAll('path');
    provinciasElementos.forEach(element => element.classList.remove('active'));
    
    element.classList.toggle('active');
    const locationName = element.getAttribute('name');
    if(locationName) this.onProvince.emit(locationName);
  }
}
