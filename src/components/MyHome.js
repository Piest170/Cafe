import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from "react"
import { Button, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import axios from 'axios';
import ModalAddPromotion from './ModalAddPromotion';
import ModalAddMember from "./ModalAddMember";
import ModalAddMenu from "./ModalAddMenu";
import EditPromotion from './EditPromotion';

function MyHome() {

    const [promotions, setPromotions] = useState([{}])
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState("")
    const [editId, setEditId] = useState("")
    const mockup = {
        pDetail: "ตัวอย่าง",
        pId: 99999,
        pImage: "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg",
        pName: "ตัวอย่าง",
    }

    const handleDeleteItem = async (id) => {
        const isConfirm = window.confirm("Do you want to delete this promotion ?")
        if (!isConfirm) return;
        await axios.delete(`http://localhost:8080/promotion/${id}`)
        const rest = promotions.filter(promotion => promotion.pId !== id)
        if (!rest.length) {
            setPromotions([mockup])
        } else {
            setPromotions(rest)
        }
    }

    const RenderModal = () => {
        if (mode === "") return <></>
        else if (mode === "menu") return <ModalAddMenu />
        else if (mode === "promotion") return <ModalAddPromotion />
        else if (mode === "member")  return <ModalAddMember />
        else if (mode === "edit") return <EditPromotion paramId={editId} />
    }

    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {
        PromotionData()
    }, [])

    async function PromotionData() {
        const res = await axios.get("http://localhost:8080/promotions")
        if (res.data.length) {
            setPromotions(res.data)
        } else {
            setPromotions([mockup])
        }
    }

    return (
        <div>
            <Carousel>
                {
                    promotions.map((promotion, i) => (
                        <Carousel.Item style={{ backgroundColor: "pink" }} key={i}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                                <div style={{ width: "60%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <h3>{promotion.pName}</h3>
                                        <p>{promotion.pDetail}</p>
                                        <DropdownButton id="dropdown-basic-button" title="Setting" style={{ cursor: "pointer" }} >
                                            <Dropdown.Item onClick={() => { setMode("edit"); setEditId(promotion.pId) }}> Edit </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteItem(promotion.pId)}> Delete </Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                    <img src={promotion.pImage} style={{ height: "40vh", width: "40vh", objectFit: "cover" }} />
                                </div>
                            </div>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
            <Button onClick={() => { handleShow(); setMode("menu") }} style={{ marginInline: 50, marginTop: 25 }}> Add Menu </Button>
            <Button onClick={() => { handleShow(); setMode("member") }} style={{ marginInline: 50, marginTop: 25 }}> Add Member </Button>
            <Button onClick={() => { handleShow(); setMode("promotion") }} style={{ marginInline: 50, marginTop: 25 }}> Add Promotion </Button>
            <RenderModal />
        </div>
    )
}

export default MyHome