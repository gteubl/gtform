import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtform-bookmark',
  templateUrl: './gtform-bookmark.component.svg',
  styleUrls: ['./gtform-bookmark.component.scss'],
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformBookmarkComponent {
  @Input() public width: string = '20';
  @Input() public height: string = '40';
  @Input() public color: string = 'currentColor';

}
