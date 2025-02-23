import { TryLoginRequestDTO } from "src/api/Login";


const testAccounts = [
    {
        id: "admin",
        accountType: "Super Admin",
        username: "admin",
        password: "password",
        firstName: "Harsh",
        lastName: "Joshi"
    }
]

export const tryLoginMock = (params: TryLoginRequestDTO) => {
    
    const foundAccount = testAccounts.find(({ username, password }) => {
        console.log("jgsvc gdws",params)
        let resp= params.username === username && params.password === password
        // if(resp){

        // }
        console.log("response:",resp);
        return resp;
    })
    console.log(foundAccount);
    if (foundAccount) {
        return {
            token: "validToken",
            userInfo: foundAccount
        }
        //console.log(test);
    }
    throw new Error("Invalid credentials")
}