
export const findFolder = (folders=[], folderid) =>
  folders.find(folder => folder.id.toString() === folderid)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id.toString() === noteId)

export const getDocsForProduct = (docs=[], productid) => ( 
  (!productid)
    ? docs
    : docs.filter(doc => doc.productid.toString() === productid)
)

export const countNotesForFolder = (notes=[], folderid) =>
  notes.filter(note => note.folderid === folderid).length
