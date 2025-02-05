
export function initDraw(canvas: HTMLCanvasElement) {

        const ctx = canvas.getContext("2d");

            if(!ctx) return;

            ctx.fillStyle = "rgbs(0, 0, 0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let clicked = false;
            let startX = 0;
            let startY = 0;

            canvas.addEventListener("mousedown", (e) => {
                clicked = true;
                startX = e.clientX;
                startY = e.clientY;
            })

            canvas.addEventListener("mousemove", (e) => {
                if(clicked) {
                    const width = e.clientX - startX;
                    const height = e.clientY - startY;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "rgbs(0, 0, 0)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "rgba(255, 255, 255)";
                    ctx.strokeRect(startX, startY, width, height);
                }
            })

            canvas.addEventListener("mouseup", () => {
                clicked = false;
            })

}
