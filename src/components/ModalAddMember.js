import axios from "axios";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalAddMember() {

    const [uName, setUName] = useState("")
    const [uDate, setUDate] = useState("")

    const handleClose = () => {
        setShow(false);
    }
    
    const handleSave = async () => {
        const data = {uName, uDate}
        await axios.post("http://localhost:8080/user", data)
        alert("Saved Data")
        handleClose()
    }

    const [show, setShow] = useState(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Add Member </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", flexDirection: "column"}}>
                    Name :
                    <input onChange={e => setUName(e.target.value)} type="text"/>
                    Date :
                    <input onChange={e => setUDate(e.target.value)} type="date"/>
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

export default ModalAddMember