import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";

function EditMenu({paramId}) {
    useEffect(() => {
        console.log(paramId);
    }, [])
    const [mId, setMId] = useState("")
    const [mName, setMName] = useState("")
    const [mPrice, setMPrice] = useState("")
    const [mDetail, setMDetail] = useState("")
    const [mImage, setMImage] = useState("")
    const [category, setCategory] = useState([{}])
    const [caId, setCaId] = useState("")

    const handleClose = () => {
        setShow(false);
    }
    
    useEffect(() => {
        const getData = async () => {
            const cas = await axios.get("http://localhost:8080/categorys")
            setCategory(cas.data)
            const res = await axios.get("http://localhost:8080/menu/" + paramId)
            setMId(res.data.mId)
            setMName(res.data.mName)
            setMPrice(res.data.mPrice)
            setMDetail(res.data.mDetail)
            setMImage(res.data.mImage)
        }
        getData()
    }, [])

    const handlePut = async () => {
        const data = {
           mId, mName, mPrice, mDetail, mImage, category: { caId }
        }
        await axios.put("http://localhost:8080/menu", data)
        alert("Edited Data")
        handleClose()
    }

    const [show, setShow] = useState(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Edit Menu {paramId} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    Name :
                    <input onChange={e => setMName(e.target.value)} value={mName} type="text" />
                    Price :
                    <input onChange={e => setMPrice(e.target.value)} value={mPrice} type="number" />
                    Detail :
                    <input onChange={e => setMDetail(e.target.value)} value={mDetail} type="text" />
                    Image :
                    <input onChange={e => setMImage(e.target.value)} value={mImage} type="text" />
                    Category :
                    <DropdownButton id="dropdown-basic-button" title={category.find(e => e.caId === caId)?.caName || "Select Category"}>
                        {
                            category.map((c, i) => (
                                <Dropdown.Item key={i} onClick={e => setCaId(c.caId)}> {c.caName} </Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                <Button variant="primary" onClick={handlePut}>
                    Edit
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditMenu