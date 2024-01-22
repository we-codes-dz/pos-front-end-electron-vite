import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { addRect, generateId, initCanvas } from './helpers';
import { tableFill, tableShadow, tableStroke } from './data';


const TableDragAndDrop = () => {
    const canvasRef = useRef(null);
    const canvas = useRef(null);

    //? add restaurant furniture number
    const [chairNumber, setChairNumber] = useState<number>(1);

    useEffect(() => {
        canvas.current = new fabric.Canvas(canvasRef.current)
        initCanvas(canvas.current);
        // addDefaultObjects(canvas, 2)
        // Cleanup fabric.js canvas when the component unmounts
        return () => {
            (canvas.current as fabric.Canvas).dispose();
        };
    }, []);

    //? furniture functions
    const addChairClickHandler = () => {
        console.log(chairNumber)
        addRect(canvas.current, chairNumber, 30, 90, 60, 90);
        setChairNumber(prev => prev + 1);
    }


    return (
        <div className='w-screen '>
            <div className="container-fluid text-center space-y-4">
                <div className="w-full px-4 justify-center space-y-4">
                    <div className="flex gap-2 items-center justify-center">
                        <div className="col-sm-2 col-sm-offset-3 form-group">
                            <label>Width (px)</label>
                            <input type="number" id="width" className="form-control" value="302" />
                        </div>
                        <div className="col-sm-2 form-group">
                            <label>Height (px)</label>
                            <input type="number" id="height" className="form-control" value="812" />
                        </div>
                        <div className="col-sm-2 form-group">
                            <label>&nbsp;</label>
                            <br />
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                    <div className="space-x-3">
                        <button
                            className="btn btn-primary rectangle"
                            onClick={addChairClickHandler}
                        >+ &#9647; Table
                        </button>
                        <button className="btn btn-primary circle"

                        >+ &#9711; Table</button>
                        <button className="btn btn-primary triangle">+ &#9651; Table</button>
                        <button className="btn btn-primary chair"
                        >+ Chair</button>
                        <button className="btn btn-primary bar">+ Bar</button>
                        <button className="btn btn-default wall">+ Wall</button>
                        <button className="btn btn-danger remove">Remove</button>
                        <button className="btn btn-warning customer-mode">Customer mode</button>
                    </div>
                    <div className='w-full flex gap-2'>
                        <canvas ref={canvasRef} id="c" width={700} height={400}></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableDragAndDrop