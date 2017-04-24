import {EditorState,genKey,Modifier,RichUtils,ContentBlock} from 'draft-js'

export function setBlockData(editorState,data) {
    const newContentState = Modifier.setBlockData(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        data)
    return EditorState.push(editorState, newContentState, 'change-block-data')
}

export function getSelectedBlocksMap (editorState) {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const startKey = selectionState.getStartKey()
  const endKey = selectionState.getEndKey()
  const blockMap = contentState.getBlockMap()
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]])
}

export function getSelectionText (editorState) {
  let selectedText = '';
  const currentSelection = editorState.getSelection()
  let start = currentSelection.getAnchorOffset()
  let end = currentSelection.getFocusOffset()
  const selectedBlocks = getSelectedBlocksMap(editorState).toList()
  if (selectedBlocks.size > 0) {
    if (currentSelection.getIsBackward()) {
      const temp = start;
      start = end;
      end = temp;
    }
    for (let i = 0; i < selectedBlocks.size; i += 1) {
      const blockStart = i === 0 ? start : 0;
      const blockEnd =
        i === (selectedBlocks.size - 1) ? end : selectedBlocks.get(i).getText().length;
      selectedText += selectedBlocks.get(i).getText().slice(blockStart, blockEnd);
    }
  }
  return selectedText;
}


export function getSelectionEntity (editorState) {
  let entity
  const selection = editorState.getSelection()
  let start = selection.getStartOffset()
  let end = selection.getEndOffset()
  if (start === end && start === 0) {
    end = 1
  } else if (start === end) {
    start -= 1
  }
  const block = getSelectedBlocksMap(editorState).toList().get(0)

  for (let i = start; i < end; i += 1) {
    const currentEntity = block.getEntityAt(i)
    if (!currentEntity) {
      entity = undefined
      break
    }
    if (i === start) {
      entity = currentEntity
    } else if (entity !== currentEntity) {
      entity = undefined
      break
    }
  }
  return entity
}