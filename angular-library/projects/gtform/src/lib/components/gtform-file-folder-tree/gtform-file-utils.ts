/* eslint-disable @typescript-eslint/no-explicit-any */

import { FileTreeNode } from '../../models';

import { FileMoreActions, FileNode } from './gtform-file-folder-tree.component';

export function buildFileTree(files: FileTreeNode[]): FileNode[] {
  const nodes: FileNode[] = files.map(file => ({
    id: file.id || '', // Default to empty string if id is undefined or null
    name: file.name || '', // Default to empty string if name is undefined or null
    type: file.type as any == 'Folder' ? 'folder' : 'file', // Handle undefined and ensure it's a valid 'file' or 'folder'
    parentId: file.parentId || null, // Convert undefined to null
    isOpen: true,
    extension: file.extension || '', // Default to empty string if extension is undefined or null
    isNewElement: false,
    children: [], // Ensure children is always initialized
    isDeleted: file.payload?.del || false,
    userDel: file.payload?.userDel || '',
    dateDel: file.payload?.dateDel || null,
    fileDate: file.payload?.fileDate || null
  }));

  const idToNodeMap: { [key: string]: FileNode } = {};
  nodes.forEach(node => idToNodeMap[node.id] = node);

  const rootNodes: FileNode[] = [];
  nodes.forEach(node => {
    if (node.parentId) {
      const parent = idToNodeMap[node.parentId];
      if (parent && parent.children) { // Check parent and parent.children are defined
        parent.children.push(node);
      }
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}


export function flattenTree(nodes: FileNode[]): FileNode[] {
  const flatList: FileNode[] = [];

  function processNode(node: FileNode): void  {
    // Push the node copy without children to avoid mutating the original node
    flatList.push({ ...node, children: undefined });

    // If children exist, recursively process each child
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => processNode(child));
    }
  }

  // Process each root node
  nodes.forEach(node => processNode(node));
  return flatList;
}

export function addActionToAllNodes(nodes: FileNode[], action: (node: FileNode) => void,  filesActions?: FileMoreActions[], foldersMoreActions?: FileMoreActions[]): FileNode[] {
  return nodes.map(node => {
    const newNode = {
      ...node,
      moreActions: node.type === 'file' ? filesActions : foldersMoreActions || [],
      action: () => action(node)
    };

    // Recursively add action to children if they exist
    if (node.children) {
      newNode.children = addActionToAllNodes(node.children, action, filesActions);
    }
    return newNode;
  });
}
export function findParentNode(nodes: FileNode[], targetNode: FileNode): FileNode | null {
  // This function searches through each node in the array.
  for (const node of nodes) {
    // Check if this node is the parent of the target node.
    if (node.children && node.children.some(child => child.id === targetNode.id)) {
      return node;
    }

    // If not, recurse into the children of this node if it has any.
    if (node.children) {
      const possibleParent = findParentNode(node.children, targetNode);
      if (possibleParent) {
        return possibleParent;
      }
    }
  }

  // If no parent is found in the entire array, return null.
  return null;
}



export function deleteNode(nodes: FileNode[], targetNodeId: string): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    // Check if this node is the one to be deleted.
    if (node.id === targetNodeId) {
      nodes.splice(i, 1);  // Remove the node from the array
      return true;  // Return true to indicate successful deletion
    }

    // Recursively attempt to delete in children nodes.
    if (node.children && deleteNode(node.children, targetNodeId)) {
      // If the node was found and deleted in children, no further action is needed.
      return true;
    }
  }

  // If the node was not found in the current list or any children lists, return false.
  return false;
}

export function addNode(nodes: FileNode[], parentNodeId: string, newNode: FileNode): boolean {
  for (const node of nodes) {
    if (node.id === parentNodeId) {
      if (!node.children) {
        node.children = [];  // Initialize children array if it doesn't exist
      }
      node.children.push(newNode);  // Add new node as a child
      return true;
    }
    // Recursively attempt to add the node to children nodes
    if (node.children && addNode(node.children, parentNodeId, newNode)) {
      return true;
    }
  }
  return false;  // Parent node not found
}

export function updateNode(nodes: FileNode[], nodeId: string, updates: Partial<FileNode>): boolean {
  for (const node of nodes) {
    if (node.id === nodeId) {
      // Apply updates to the node
      Object.assign(node, updates);
      return true;
    }
    // Recursively update in children
    if (node.children && updateNode(node.children, nodeId, updates)) {
      return true;
    }
  }
  return false;  // Node not found
}

export function findNode(nodes: FileNode[], nodeId: string): FileNode | null {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      const foundNode = findNode(node.children, nodeId);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;  // Node not found
}

export function getAllNodesOfType(nodes: FileNode[], type: 'file' | 'folder'): FileNode[] {
  let result: FileNode[] = [];
  for (const node of nodes) {
    if (node.type === type) {
      result.push(node);
    }
    if (node.children) {
      result = result.concat(getAllNodesOfType(node.children, type));
    }
  }
  return result;
}



