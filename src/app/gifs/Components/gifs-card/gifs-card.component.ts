import { Component, OnInit, Input} from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrl: './gifs-card.component.css'
})
export class GifsCardComponent implements OnInit {
  @Input()
  public gifs!: Gif;

  ngOnInit(): void {
    if(!this.gifs) throw new Error("Property is required");
  }
}
