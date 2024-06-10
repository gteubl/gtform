import { FileMoreActions } from '../gtform-file-folder-tree.component';

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
