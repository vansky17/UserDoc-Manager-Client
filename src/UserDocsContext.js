import React from 'react'

const UserDocsContext = React.createContext({
    docs: [],
    products: [],
    toggle: false,
    API: 'http://localhost:8000/api',
    deleteDoc: () => {},
    deleteProduct: () => {},
    addProduct: () => {},
    addDoc: () => {},
    uploadFile: () => {},
    toggleErrors: () => {},
    back: () => {}
})

export default UserDocsContext