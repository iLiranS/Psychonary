
import React, { useState,useRef, useEffect, useCallback } from 'react'

const Canvas = props => {
    const [gameWidth,setGameWidth] = useState(400);
    const [velocity,setVeloicty] = useState(2); //  1= up , -1= down | 2= right , -2= left 
    const [head,setHead] = useState({x:10,y:10});
    let tileCount=19;
    let tileSize=20;
    console.log(head);

    const clearScreen = ctx =>{
        ctx.fillStyle= 'black'// make screen black
        ctx.fillRect(0,0,gameWidth,gameWidth)
     }
    const drawSnake = useCallback((ctx) =>{
        ctx.fillStyle="lime";
        ctx.fillRect(head.x* tileCount,head.y* tileCount, tileSize,tileSize)
    },[head,tileCount,tileSize])
    const changeHeadPosition = () =>{
        switch(velocity){
            case 1:
                setHead(prev =>{return({x:prev.x,y:prev.y-1})})
                break;
            case -1:
                setHead(prev =>{return({x:prev.x,y:prev.y+1})})
                break;
            case 2:
                setHead(prev =>{return({x:prev.x+1,y:prev.y})})
                break;
            case -2:
                setHead(prev =>{return({x:prev.x-1,y:prev.y})})

                break;

                default:
                    break;
        }
    }

    const draw = useCallback((ctx)=>{
        console.log('game loop')
        clearScreen(ctx);
        drawSnake(ctx);
        changeHeadPosition();
    },[velocity,changeHeadPosition])

 
  const canvasRef = useRef(null);

  const handleUserKeyPress = useCallback(event => {
      const { key, keyCode } = event;
    if      (keyCode===38 || key==='W') setVeloicty(1);
    else if (keyCode===40 || key==='S') setVeloicty(-1);
    else if (keyCode===37 || event.key==='A') setVeloicty(-2);
    else if (keyCode===39 || event.key==='D') setVeloicty(2)
}, []);



  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
    };
}, [handleUserKeyPress]);
  
  useEffect(() => {
    let timeout ;
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    const render = () => {
      draw(context)
      
      timeout = setTimeout(() => {
        render();
      }, 1000);
    }
    render();
    return(()=>clearTimeout(timeout));
  }, [draw])
  
  return <canvas width={400} height={400} ref={canvasRef}/>
}

export default React.memo(Canvas);