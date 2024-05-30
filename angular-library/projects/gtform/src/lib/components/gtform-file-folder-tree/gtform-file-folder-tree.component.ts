import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../../models/index';


export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | null;
  isOpen?: boolean;
  payload?: unknown;
  children?: FileNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (node: FileNode) => any;
  checked?: boolean;
  extension?: string;
  isNewElement?: boolean;
  moreActions?: FileMoreActions[];
  fileDate?: Date;
  isDeleted?: boolean;
  userDel?: string;
  dateDel?: Date;
}

export interface FileMoreActions {
  icon: string;
  tooltip?: string;
  action: (node: FileNode) => void;
  disabled?: boolean;
}

export interface NodeToUpdate {
  id: string;
  oldParentId: string | null;
  newParentId: string | null;
}

@Component({
  selector: 'gtform-file-folder-tree',
  templateUrl: './gtform-file-folder-tree.component.html',
  styleUrl: './gtform-file-folder-tree.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        overflow: 'visible'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-out', style({
          height: '*',
          opacity: '1'
        }))
      ])
    ])
  ]
})
export class GtformFileFolderTreeComponent implements OnInit, OnChanges {
  @Input() public treeData: FileNode[] = [];
  @Input() public showEmptyFolder = false;
  @Input() public dragAndDrop = true;
  @Input() public showCheckboxes = false;
  @Input() public showActions = false;
  @Input() public allowMoveFolders = false;
  @Output() public filesAdded = new EventEmitter<FileList>();
  @Output() public nodeUpdated = new EventEmitter<NodeToUpdate>();
  public items: MenuItem[] | undefined; //??
  private dataSubject = new BehaviorSubject<FileNode[]>([]);
  public data$ = this.dataSubject.asObservable();
  private draggedNode: FileNode | null = null;
  private showDeleted = false;

  private allNodes: FileNode[] = [];



  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['treeData'] && changes['treeData'].currentValue !== changes['treeData'].previousValue) {
      this.allNodes = this.treeData;
      this.updateFilteredNodes();
    }
  }

  public ngOnInit(): void {

    this.items = [
      {
        label: 'Upload',
        icon: 'pi pi-upload',
        tooltip: 'Carregar arquivos',
        command: () => {
          this.upLoadFiles();
        }
      },
      {
        label: 'Download',
        icon: 'pi pi-download',
        tooltip: 'Baixar arquivos selecionados',
        command: () => {
          console.log('Download');
        }
      },
      {
        label: 'Visualizar Todas as Pastas',
        icon: 'pi pi-folder',
        tooltip: 'Exibe todas as pastas disponíveis',
        command: () => {
          this.showAllFolders();
        }
      },
      {
        label: 'Visualizar Itens Excluídos',
        icon: 'pi pi-trash',
        tooltip: 'Exibe arquivos e pastas excluídos',
        command: () => {
          this.showDeletedFiles();
        }
      }

    ];

  }

  // Actions
  public onClickAction(action: FileMoreActions, node: FileNode): void {
    action.action(node);
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    const element = event.target as HTMLElement;
    if (element) {
      // Remove the class when the drag leaves the element to hide the drop line
      element.closest('.node')?.classList.remove('drag-over');
    }

    // console.log('Drag leave event:', event, 'Node:', node);
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault(); // Allow drop
    event.stopPropagation();
    const element = event.target as HTMLElement;
    if (element) {
      // Add a class to the target element to show the drop line
      element.closest('.node')?.classList.add('drag-over');
    }
  }

  public onDragStart(event: DragEvent, node: FileNode): void {
    this.draggedNode = node;
    event.dataTransfer!.setData('text/plain', node.id);
    event.stopPropagation(); // Prevent the drag from bubbling up
  }

  public onDrop(event: DragEvent, dropTargetNode: FileNode): void {
    event.preventDefault();
    event.stopPropagation();
    // Clean up: remove drag-over class from all nodes
    document.querySelectorAll('.node').forEach(node => {
      node.classList.remove('drag-over');
    });
    // Continue with your existing drop logic...

    // console.log('Drop event:', event,
    //   'Dragged node:', this.draggedNode,
    //   'Drop target:', dropTargetNode);
    this.moveNode(this.draggedNode!, dropTargetNode);

    this.draggedNode = null;
  }

  public onNodeClick(node: FileNode): void {
    if (node.action) {
      node.action(node);
    }
  }

  public getIcon(node: FileNode): { class: string; color: string } {

    if (node.type === 'folder') {
      if (node.isOpen) {
        return { class: 'pi pi-folder-open', color: 'var(--main-content-text-color)' };
      }
      return { class: 'pi pi-folder', color: 'var(--main-content-text-color)' };
    }

    node.extension = node.extension?.toLowerCase().trim();

    if (node.extension === 'pdf') {
      return { class: 'pi pi-file-pdf', color: '#FF0000' };
    }
    if (node.extension === 'docx' || node.extension === 'doc') {
      return { class: 'pi pi-file-word', color: '#2B579A' };
    }
    if (node.extension === 'xlsx' || node.extension === 'xls') {
      return { class: 'pi pi-file-excel', color: '#217346' };
    }
    if (node.extension === 'msg') {
      return { class: 'pi pi-envelope', color: '#FDD835' };
    }

    return { class: 'pi pi-file', color: 'var(--main-content-text-color)' };
  }

  public isDraggable(node: FileNode): boolean {
    if (!this.dragAndDrop) {
      return false;
    }

    if (node.type === 'file') {
      return true;
    }

    if (node.type === 'folder' && this.allowMoveFolders) {
      return true;
    }

    return false;

  }

  public moveNode(draggedNode: FileNode, dropTargetNode: FileNode): void {

    const allNodes = this.dataSubject.value;

    if (draggedNode.type === 'file' && dropTargetNode.type !== 'folder') {
      return;
    }

    // Prevent dropping into the same parent
    if (dropTargetNode.children && dropTargetNode.children.some(child => child.id === draggedNode.id)) {
      return;
    }

   /* //Confirmation to move the node
    const fileModal = this.dialog.open(
      ModalConfirmationComponent,
      {
        header: 'Atenção:',
        data: {
          message: 'Deseja mover esse arquivo?'
        },
        ...ModalDialogSizes.warning
      }
    );

    fileModal.onClose.subscribe((result: boolean) => {
      if (result) {
        deleteNode(allNodes, draggedNode.id);
        addNode(allNodes, dropTargetNode.id, {
          ...draggedNode
          //isNewElement: true
        });
        this.updateTree();
        this.nodeUpdated.emit({ id: draggedNode.id, oldParentId: draggedNode.parentId, newParentId: dropTargetNode.id });
      }
    });*/
  }

  public toggleFolder(node: FileNode): void {
    if (node.type === 'folder') {
      node.isOpen = !node.isOpen;
    }
  }

  private filterBasedOnDeletion(nodes: FileNode[]): FileNode[] {
    return nodes.filter(node => node.isDeleted ? this.showDeleted : true)
      .map(node => ({
        ...node,
        children: node.children ? this.filterBasedOnDeletion(node.children) : []
      }));
  }

  private filterBasedOnEmptyFolders(nodes: FileNode[]): FileNode[] {
    return nodes.filter(node => {
      if (node.type === 'folder') {
        // Recursively check if there are any valid children (files or non-empty folders)
        return this.hasValidChildren(node);
      }
      return true; // Always include files
    }).map(node => ({
      ...node,
      // Recursively apply the filter to children
      children: node.children ? this.filterBasedOnEmptyFolders(node.children) : []
    }));
  }

  private filterNodes(nodes: FileNode[]): FileNode[] {
    // First pass: Filter based on deletion status
    const filteredNodes = this.filterBasedOnDeletion(nodes);

    // Second pass: Filter folders based on whether they should show empty folders
    return this.filterBasedOnEmptyFolders(filteredNodes);
  }

  private hasValidChildren(node: FileNode): boolean {
    if (node.children && node.children.length > 0) {
      // Check if any children are valid (files or folders with valid children)
      return node.children.some(child => child.type === 'file' || this.hasValidChildren(child));
    }
    // Return true if `showEmptyFolder` is true, meaning empty folders are considered valid
    return this.showEmptyFolder;
  }

  private showAllFolders(): void {
    this.showEmptyFolder = !this.showEmptyFolder;
    this.updateFilteredNodes();
  }

  private showDeletedFiles(): void {
    this.showDeleted = !this.showDeleted;
    this.updateFilteredNodes();
  }

  private upLoadFiles(): void {
   /* const fileModal = this.dialog.open(
      FormFileFolderUploaderModalComponent,
      {
        header: 'Carregar arquivos',
        ...ModalDialogSizes.medium
      }
    );

    fileModal.onClose.subscribe((files: FileList) => {
      this.filesAdded.emit(files);
    });*/

  }

  private updateFilteredNodes(): void {
    this.dataSubject.next(this.filterNodes(this.allNodes));
  }

  private updateTree(): void {
    // Notify all subscribers with the new tree state
    this.dataSubject.next([...this.dataSubject.value]);
  }
}
