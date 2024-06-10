import { FileNode } from './file-node';

export interface FileMoreActions {
  icon: string;
  tooltip?: string;
  action: (node: FileNode) => void;
  disabled?: boolean;
}
