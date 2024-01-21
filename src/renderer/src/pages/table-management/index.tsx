import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const TablesPage = () => {
    const canvasRef = useRef(null);
    const canvasRef2 = useRef(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current);
        const canvas2 = new fabric.Canvas(canvasRef2.current);
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });
        const rect2 = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'blue',
            width: 20,
            height: 20
        });
        const circle = new fabric.Circle({
            radius: 20,
            fill: 'green',
            left: 100,
            top: 100
        });
        canvas.add(rect);
        canvas.add(circle);

        canvas2.add(rect2);

        // Cleanup fabric.js canvas when the component unmounts
        console.log(canvas)
        return () => {
            canvas.dispose();
        };
    }, []);

    return (
        <div className='w-screen '>
            <div className='w-full flex gap-2'>
                <div className='w-3/4 bg-slate-600'>
                    <canvas ref={canvasRef} id="c" width={700} height={400}></canvas>
                </div>
                <div className='w-1/4 bg-slate-600'>
                    <canvas ref={canvasRef2} id="c1" height={400}></canvas>
                </div>
            </div>
        </div>
    );

}

export default TablesPage