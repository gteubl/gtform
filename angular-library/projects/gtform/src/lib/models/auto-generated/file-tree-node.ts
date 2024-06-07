/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { FileTreeNodeType } from './file-tree-node-type';

export interface FileTreeNode {
    id: string;
    order: number;
    name: string;
    type: FileTreeNodeType;
    parentId: string;
    extension: string;
    payload: any;
}
