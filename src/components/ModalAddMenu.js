import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";

function ModalAddMenu() {

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
            const res = await axios.get("http://localhost:8080/categorys")
            setCategory(res.data)
        }
        getData()
    }, [])
    const handleSave = async () => {
        const data = {
            mName, mPrice, mDetail, mImage, category: { caId }
        }
        await axios.post("http://localhost:8080/menu", data)
        alert("Saved Data")
        handleClose()
    }

    const [show, setShow] = useState(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Add Menu </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    Name :
                    <input onChange={e => setMName(e.target.value)} type="text" />
                    Price :
                    <input onChange={e => setMPrice(e.target.value)} type="number" />
                    Detail :
                    <input onChange={e => setMDetail(e.target.value)} type="text" />
                    Image :
                    <input onChange={e => setMImage(e.target.value)} type="text" />
                    Category :
                    <DropdownButton id="dropdown-basic-button" title={category.find(e => e.caId === caId)?.caName || "Select it Category"}>
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
                <Button variant="primary" onClick={handleSave}>
                    Save
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddMenu