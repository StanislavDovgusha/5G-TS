import { Component, Input } from '@angular/core';
import { UserItem } from 'src/app/shared/apis/github/models/user-item';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {

  @Input() user: UserItem;
  constructor() { }

}
