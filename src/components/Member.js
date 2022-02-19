import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import EditMember from './EditMember';

function Member() {

    const [members, setMember] = useState([{}])
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState("")
    const [editId, setEditId] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const res = await axios.get("http://localhost:8080/users")
        setMember(await res.data)
    }

    const AddPoint = async(id) => {
        await axios.put(`http://localhost:8080/user/${id}`)
        const clone = [...members]
        const idx = clone.findIndex(e => e.uId == id)
        clone[idx].uPoint++
        setMember(clone)
    }

    const handleShow = () => {
        setShow(true);
    }

    const RenderModal = () => {
        if (mode === "") return <></>
        else if (mode === "edit") return <EditMember paramId={editId} />
    }

    const RemoveMember = async (id) => {
        const isConfirm = window.confirm("Do you want to Delete this Member ?")
        if (!isConfirm) return;
        await axios.delete(`http://localhost:8080/user/${id}`)
        const rest = members.filter(member => member.uId !== id)
        setMember(rest)
    }

    return (
        <div style={{ marginTop: 50 }}>
            <h1>Member</h1>
            <table>
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Name </th>
                        <th> Date </th>
                        <th> Point </th>
                        <th> Add Point </th>
                        <th> Edit Member </th>
                        <th> Remove Member </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members.map((member, i) => (
                            <tr key={i}>
                                <td> {member.uId} </td>
                                <td> {member.uName} </td>
                                <td> {member.uDate} </td>
                                <td> {member.uPoint} </td>
                                <td> <button onClick={() => AddPoint(member.uId)}>+</button> </td>
                                <td> <Button onClick={() => { handleShow(); setMode("edit"); setEditId(member.uId) }}>Edit</Button> </td>
                                <td> <Button onClick={() => { handleShow(); RemoveMember(member.uId) }}>Delete</Button> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <RenderModal />
        </div>
    )
}

export default Member