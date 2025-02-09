import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}){
    return <div className={`
       m-2 bg-black pointer rounded-full border p-2 hover:bg-gray ${activated ? "text-red-500" : "text-white"}
    `} onClick={onClick}>{icon}</div>

}