import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chat/${roomId}`);
    const message = res.data.message;

    const shapes = message.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape;
    })
    return shapes;
}