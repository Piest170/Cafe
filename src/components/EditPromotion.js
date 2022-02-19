import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function EditPromotion({paramId}) {
    useEffect(() => {
        console.log(paramId);
    }, [])
    const [pId, setPId] = useState("")
    const [pName, setPName] = useState("")
    const [pDetail, setPDetail] = useState("")
    const [pImage, setPImage] = useState("")

    const handleClose = () => {
        setShow(false);
    }
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("http://localhost:8080/promotion/" + paramId)
            setPId(res.data.pId)
            setPName(res.data.pName)
            setPDetail(res.data.pDetail)
            setPImage(res.data.pImage)
        }
        getData()
    }, [])

    const handlePut = async () => {
        const data = {
           pId, pName, pDetail, pImage
        }
        await axios.put("http://localhost:8080/promotion", data)
        alert("Edited Data")
        handleClose()
    }

    const [show, setShow] = useState(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Edit Promotion {paramId} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    Name :
                    <input onChange={e => setPName(e.target.value)} value={pName} type="text" />
                    Detail :
                    <input onChange={e => setPDetail(e.target.value)} value={pDetail} type="text" />
                    Image :
                    <input onChange={e => setPImage(e.target.value)} value={pImage} type="text" />
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

export default EditPromotion