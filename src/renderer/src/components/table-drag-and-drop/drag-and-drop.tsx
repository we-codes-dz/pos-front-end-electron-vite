import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { addChair, addCircle, addRect, addTriangle, initCanvas } from './helpers';
import dataTable from './data-table.json';

const TableDragAndDrop = () => {
    const canvasRef = useRef(null);
    const canvas = useRef(null);
    //const dataTable = useRef<fabric.Canvas | null>(/* your initial data or null */);

    //? add restaurant furniture number
    const [chairNumber, setChairNumber] = useState<number>(1);

    // useEffect(() => {
    //     canvas.current = new fabric.Canvas(canvasRef.current)
    //     //initCanvas(canvas.current);
    //     // addDefaultObjects(canvas, 2)
    //     // Cleanup fabric.js canvas when the component unmounts
    //     return () => {
    //         (canvas.current as fabric.Canvas).dispose();
    //     };
    // }, []);


    useEffect(() => {
        canvas.current = new fabric.Canvas(canvasRef.current); // Type assertion

        const dataTableObjects = dataTable.objects;
        const wrappedObjects = { "objects": JSON.parse(JSON.stringify(dataTableObjects)) };
        console.log(JSON.stringify(wrappedObjects))

        if (canvas.current)
            (canvas.current as fabric.Canvas).loadFromJSON(wrappedObjects);
        // Cleanup fabric.js canvas when the component unmounts
        return () => {
            (canvas.current as fabric.Canvas).dispose();
        };
    }, []);



    // useEffect(() => {
    //     console.log(JSON.stringify({ objects: JSON.parse(JSON.stringify(dataTable.current.objects)) }))
    //     const initializeCanvas = () => {
    //         canvas.current = new fabric.Canvas(canvasRef.current!);
    //     };

    //     const loadDataTable = () => {
    //         if (!canvas.current || !dataTable.current) return;

    //         const dataTableObjects = dataTable.current.objects;
    //         const wrappedObjects = { objects: JSON.parse(JSON.stringify(dataTableObjects)) };

    //         (canvas.current as fabric.Canvas).loadFromJSON(wrappedObjects, () => {
    //             (canvas.current as fabric.Canvas)!.renderAll();
    //         });
    //     };

    //     initializeCanvas();
    //     loadDataTable();

    //     return () => {
    //         if (canvas.current) {
    //             (canvas.current as fabric.Canvas).dispose();
    //         }
    //     };
    // }, []);

    //? furniture functions

    //? big table
    const addRectTableClickHandler = () => {
        console.log(chairNumber)
        addRect(canvas.current, chairNumber, 30, 90, 60, 90);
        setChairNumber(prev => prev + 1);
    }
    //? circle table
    const addCircleClickHandler = () => {
        addCircle(canvas.current, chairNumber, 0, 0, 30)
        setChairNumber(prev => prev + 1);
    }

    const addTriangleClickHandler = () => {
        addTriangle(canvas.current, chairNumber, 0, 0, 30)
        setChairNumber(prev => prev + 1);
    }

    const addChairClickHandler = () => {
        addChair(canvas.current, 15, 105)
    }

    const handleRemoveClick = () => {
        if (canvas && canvas.current) {
            const o = (canvas.current as fabric.Canvas).getActiveObject()
            if (o) {
                (canvas.current as fabric.Canvas).remove(o)?.discardActiveObject()?.renderAll();
            }
        }
    }
    const saveDataHandler = () => {
        if (canvas.current) {
            const jsonForm = JSON.stringify(canvas.current);
            console.log('JSON Form of the data table \n', jsonForm);
        }
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
                            <button
                                className="btn btn-primary"
                                onClick={saveDataHandler}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="space-x-3">
                        <button
                            className="btn btn-primary rectangle"
                            onClick={addRectTableClickHandler}
                        >+ &#9647; Table
                        </button>
                        <button
                            className="btn btn-primary circle"
                            onClick={addCircleClickHandler}
                        >+ &#9711; Table</button>
                        <button
                            className="btn btn-primary triangle"
                            onClick={addTriangleClickHandler}
                        >+ &#9651; Table</button>
                        <button
                            className="btn btn-primary chair"
                            onClick={addChairClickHandler}
                        >+ Chair</button>
                        <button
                            className="btn btn-error remove"
                            onClick={handleRemoveClick}
                        >Remove</button>
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