import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function EditMember({paramId}) {
    useEffect(() => {
        console.log(paramId);
    }, [])
    const [uId, setUId] = useState("")
    const [uName, setUName] = useState("")
    const [uDate, setUDate] = useState("")

    const handleClose = () => {
        setShow(false);
    }
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("http://localhost:8080/user/" + paramId)
            setUId(res.data.uId)
            setUName(res.data.uName)
            setUDate(res.data.uDetail)
        }
        getData()
    }, [])

    const handlePut = async () => {
        const data = {
           uId, uName, uDate
        }
        await axios.put("http://localhost:8080/user", data)
        alert("Edited Data")
        handleClose()
    }

    const [show, setShow] = useState(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Edit Member {paramId} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    Name :
                    <input onChange={e => setUName(e.target.value)} value={uName} type="text" />
                    Date :
                    <input onChange={e => setUDate(e.target.value)} value={uDate} type="date" />
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

export default EditMember