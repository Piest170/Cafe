import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from "react"
import axios from 'axios';

function MainHome() {

    const [promotions, setPromotions] = useState([{}])
    const mockup = {
        pDetail: "ตัวอย่าง",
        pId: 99999,
        pImage: "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg",
        pName: "ตัวอย่าง",
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
                                    </div>
                                    <img src={promotion.pImage} style={{ height: "40vh", width: "40vh", objectFit: "cover" }} />
                                </div>
                            </div>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default MainHome