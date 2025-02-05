import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
    const [loading, setloading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmI4ODZhMi0wOTM2LTRmMmMtOGIyOS1jYjgzN2EzNzRjY2YiLCJpYXQiOjE3Mzg0OTY0NzF9.jTY3PQ6-aL_wnxRRdbVB7Z6RGnKCYqprYF-akSi3BVk`);
        ws.onopen = () => {
            setloading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }
}