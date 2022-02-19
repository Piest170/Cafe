import { useEffect, useState } from "react"
import axios from "axios";

function RankMember() {

    const [members, setMember] = useState([{}])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const res = await axios.get("http://localhost:8080/users")
        setMember(await res.data)
    }

    return (
        <div style={{ marginTop: 50 }}>
            <h1>Member</h1>
            <table>
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Name </th>
                        <th> Point </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members.map((member, i) => (
                            <tr key={i}>
                                <td> {member.uId} </td>
                                <td> {member.uName} </td>
                                <td> {member.uPoint} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RankMember