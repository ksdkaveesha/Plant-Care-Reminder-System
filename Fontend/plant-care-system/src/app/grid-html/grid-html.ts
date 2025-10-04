import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-grid-html',
  imports: [],
  templateUrl: './grid-html.html',
  styleUrl: './grid-html.css'
})
export class GridHtml {
  columns = [
    { name: 'Name' },
    { name: 'Age' },
    { name: 'Email' }
    // ...your column definitions...
  ];

  dragAndDropColumn(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
