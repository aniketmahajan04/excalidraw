
import { initDraw } from "@/draw";
import { useRef, useEffect, useState} from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

type Shape = "circle" | "rect" | "pencil";

export function Canvas({
    roomId,
    socket
} : {
    roomId: string,
    socket: WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Shape>("circle");    

    useEffect(() => {
        if(canvasRef.current) {

            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);

    return <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>
}

function TopBar({selectedTool, setSelectedTool}: {
    selectedTool: Shape,
    setSelectedTool: (s: Shape) => void
}){
    return <div style={{
        position: "fixed",
        top: 10,
        left: 10,
        color: "white"
    }}> 
        <div className="flex gap-2 ">
            <IconButton onClick={() => {
                setSelectedTool("pencil")
            }} activated={selectedTool === "pencil"} icon={ <Pencil /> }/>
            <IconButton onClick={() => {
                setSelectedTool("rect")
            }} activated={selectedTool === "rect"} icon={ <RectangleHorizontalIcon /> }/>
            <IconButton onClick={() => {
                setSelectedTool("circle")
            }} activated={selectedTool === "circle"} icon={ <Circle /> } />
        </div>
    </div>
}