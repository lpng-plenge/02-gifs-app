import { Component, Input } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';


@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {

  constructor( private gifService: GifsService){};

  get tags(){
    return this.gifService.tagsHistory;
  }

  searchTag(tag: string): void{
    this.gifService.searchTag(tag);
  }

}
