import React, { useState } from "react"
import { Radio, RadioGroup, Stack, Heading, Select } from "@chakra-ui/react";
import UserSelection from "src/pages/AdminPages/Communication/Widgets/UserSelection";
import FieldList from "../FieldList";
interface RecipientProps {
    users: any[],
    setUsers: (users: any) => void
    action:string
}
const Recipient:React.FC<RecipientProps> = ({
    users,
    setUsers
}) =>{
    const [selectionType,setSelectionType]=useState<string>("all");
    
    return(
        <>
        <h2 style={{marginBottom:"8px",fontWeight:"bold"}} >Recipient</h2>
        <RadioGroup onChange={setSelectionType} value={selectionType}>
                <Stack direction="row">
                    <Radio value="all">All Users</Radio>
                    <Radio value="specific">Select Users</Radio>
                </Stack>
        </RadioGroup>
         
            {selectionType ==="all" && <div>
                
                </div>}
            {selectionType === "specific" && < UserSelection users={users} setUsers={setUsers}/>}
        </>
    )
}
export default Recipient