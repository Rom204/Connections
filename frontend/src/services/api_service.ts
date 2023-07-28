import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export class ApiService {

    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:3001/"
        });

        this.instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('JWT');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    public async isJwtValid(): Promise<AxiosResponse> {
        if (!this.instance) {
            return Promise.reject('Instance is not initialized.');
        }
        try {
            const result = await this.instance.get('auth/check-jwt');
            console.log(result)
            return result
        } catch (error: any) {
            this.handleErrors(error)
            throw error
        }
    }

    private async handleErrors(error: AxiosError) {
        if (error.response) {
            // The client received an error response
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The client never received a response, and the request was never fired
            console.log(error.request);
        } else {
            // Something we unaware of came up and fucked up
            console.log("Something went wrong", error.message);
        }
    }
}