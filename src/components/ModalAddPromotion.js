import axios from "axios";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalAddPromotion() {

    const [pName, setPName] = useState("")
    const [pDetail, setPDetail] = useState("")
    const [pImage, setPImage] = useState("")

    const handleClose = () => {
        setShow(false);
    }
    
    const handleSave = async () => {
        const data = {pName, pDetail, pImage}
        await axios.post("http://localhost:8080/promotion", data)
        alert("Saved Data")
        handleClose()
    }

    const [show, setShow] = useState(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Add Promotion </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", flexDirection: "column"}}>
                    Name :
                    <input onChange={e => setPName(e.target.value)} type="text"/>
                    Detail :
                    <input onChange={e => setPDetail(e.target.value)} type="text"/>
                    Image :
                    <input onChange={e => setPImage(e.target.value)} type="text"/>
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

export default ModalAddPromotion