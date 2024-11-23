import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.sass'
})
export class BrandsListComponent {

  @Input()
  public brandsList: string[] = [];

  @Output()
  public onEditBrand: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDeleteBrand: EventEmitter<string> = new EventEmitter<string>();

  constructor(){ }

  public editBrand(brand:string):void{
    this.onEditBrand.emit(brand);
  }

  public deleteBrand(brand:string):void{
    this.onDeleteBrand.emit(brand);
  }

}
