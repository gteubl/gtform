import { Component } from '@angular/core';

import { FileNode } from 'gtform';

@Component({
  selector: 'app-demo-full-form-tab4',
  templateUrl: './demo-full-form-tab4.component.html',
  styleUrl: './demo-full-form-tab4.component.scss'
})
export class DemoFullFormTab4Component {
  public treeData: FileNode[] = [
    {
      id: '1',
      name: 'Folder 1',
      type: 'folder',
      parentId: null,
      isOpen: true,
      children: [
        {
          id: '2',
          name: 'File 1',
          type: 'file',
          parentId: '1'
        },
        {
          id: '3',
          name: 'File 2',
          type: 'file',
          parentId: '1'
        }
      ]
    },
    {
      id: '4',
      name: 'Folder 2',
      type: 'folder',
      parentId: null,
      isOpen: true,
      children: [
        {
          id: '5',
          name: 'File 3',
          type: 'file',
          parentId: '4'
        },
        {
          id: '6',
          name: 'File 4',
          type: 'file',
          parentId: '4'
        }
      ]
    }
  ];

}
