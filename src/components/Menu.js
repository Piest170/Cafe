import React from 'react'
import { useEffect, useState } from "react"
import axios from 'axios'
import { Dropdown, DropdownButton } from "react-bootstrap";
import EditMenu from './EditMenu';


function Menu() {
    const [menus, setMenus] = useState([{}])
    const [mode, setMode] = useState("")
    const [editId, setEditId] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const handleDeleteItem = async (id) => {
        const isConfirm = window.confirm("Do you want to Delete this Menu ?")
        if (!isConfirm) return;
        await axios.delete(`http://localhost:8080/menu/${id}`)
        const rest = menus.filter(menu => menu.mId !== id)
        setMenus(rest)
    }

    async function fetchData() {
        const res = await axios.get("http://localhost:8080/menus")
        setMenus(res.data)
    }

    const ref = React.createRef()

    const RenderModal = () => {
        if (mode === "") return <></>
        else if (mode === "edit") return <EditMenu paramId={editId} />
    }

    return (
        <div style={{ width: "100%", marginTop: 50 }}>
            <RenderModal />
            <h1>Menu</h1>
            <div style={{ display: "flex", width: "97%", height: 360, overflowX: "scroll", padding: 10 }}>
                {
                    menus.map((menu, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", backgroundColor: "pink", position: "relative", padding: 20, borderRadius: 20, marginRight: 20 }}>
                            <DropdownButton id="dropdown-basic-button" title=""style={{ cursor: "pointer", marginLeft: 100, position: "absolute", top: 0, right: 0 }} >
                                <Dropdown.Item onClick={() => {setMode("edit"); setEditId(menu.mId)}}> Edit </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDeleteItem(menu.mId)}> Delete </Dropdown.Item>
                            </DropdownButton>
                            <img src={menu.mImage} className="shadow" style={{ minHeight: 150, minWidth: 150, maxHeight: 150, maxWidth: 150, objectFit: "cover", borderRadius: "50%" }} />
                            <div className="shadow" style={{ display: "flex", flexDirection: "column", maxWidth: 200, maxHeight: 200, padding: 10, backgroundColor: "#fff", borderRadius: 20 }}>
                                <span style={{ fontSize: 20 }}>{menu.mName}</span>
                                <span style={{ color: "rgba(0, 0, 0, 0.5)", margin: "2px", fontSize: 12 }}>{menu.mDetail}</span>
                                <button style={{ backgroundColor: "lightgray", borderRadius: 20, padding: 10, outline: "none", border: "none", cursor: "pointer" }}>Sell ${menu.mPrice}</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Menu