import { IResponse } from "../../interfaces/IResponse";
import { IRow } from "../../interfaces/IRow";

export const createRowItem = (tree: IRow[], parentId: number | undefined | null, createdItem: IResponse): void => {
  for (const item of tree) {
    if (item.id === parentId) {
      if (!item.child) {
        item.child = [];
      }
      item.child.push(createdItem.current)
    }
    if (item.child) {
      createRowItem(item.child, parentId, createdItem)
    }
  }

  for (const changedItem of createdItem.changed) {
    updateRowItem(tree, changedItem.id, { current: changedItem, changed: [] });
  }
}

export const updateRowItem = (tree: IRow[], rID: number | undefined, updatedItem: IResponse): void => {
  for (const item of tree) {
    if (item.id === rID) {
      Object.assign(item, updatedItem.current)
    }
    if (item.child) {
      updateRowItem(item.child, rID, updatedItem)
    }
  }

  for (const changedItem of updatedItem.changed) {
    updateRowItem(tree, changedItem.id, { current: changedItem, changed: [] });
  }
}

export const deleteRowItem = (tree: IRow[], rID: number, deletedItem: IResponse): void => {
  const index = tree.findIndex(index => index.id === rID)
  if (index !== -1) {
    tree.splice(index, 1)
  }

  for (const item of tree) {
    if (item.child) {
      deleteRowItem(item.child, rID, deletedItem)
    }
  }

  for (const changedItem of deletedItem.changed) {
    updateRowItem(tree, changedItem.id, { current: changedItem, changed: [] })
  }
}