import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-separate-line',
  templateUrl: './separate-line.component.html',
  styleUrls: ['./separate-line.component.scss']
})
export class SeparateLineComponent {

  @Input() message: string = null;

  constructor() { }

}
