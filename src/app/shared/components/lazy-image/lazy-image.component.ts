import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',

})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string= '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
      if(!this.url) throw new Error('Property is required');
  }

  onLoad(){
    setTimeout(() =>{
      this.hasLoaded = true
    }, 750);
  }

}
