import axios from "axios";

export default class AuthServices {


    // methods

    public async checkRegistration(data: any): Promise<object> {
        const result = await axios.create({
            baseURL: "http://localhost:3001/user"
        })
            .post("/create-user", {
                username: data.username,
                password: data.password,
                email: data.email
            })

        return result
    }

    //  TODO: change type: any 
    public async checkLogin(data: any): Promise<object> {
        let userData = {};

        await axios.create({
            baseURL: "http://localhost:3001/auth"
        })
            .post("/check-login", {
                username: data.username,
                password: data.password
            })
            .then(response => {
                // userData = response;
                const token: string = response.headers.authorization?.split(" ")[1];
                localStorage.setItem("JWT", token);
            })
        return userData
    }


    public async checkJWT(token: string): Promise<object> {
        let isJWTValid = {};
        axios.create({
            baseURL: "http://localhost:3001/auth",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .post("/check-jwt")
            .then(response => {
                isJWTValid = response;
                console.log(isJWTValid)
            })
        return isJWTValid
    }
}