import { Droppable, Draggable } from "@hello-pangea/dnd"
import Element from "./Element"
import { TElement } from "../model/Element"

type CanvasProps = {
    elements: TElement[]
    setElements: React.Dispatch<React.SetStateAction<TElement[]>>
}

export default function Canvas({ elements, setElements }: CanvasProps) {
    console.log("Current elements:", elements);
    return (
        <div className="flex-1 p-4">
            <h2 className="text-lg font-semibold mb-4">Canvas</h2>
            <Droppable droppableId="canvas">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[500px] border-2 border-dashed border-gray-300 p-4"
                    >
                        {elements.map((element, index) => {
                            console.log("🚀 ~ {elements.map ~ element:", element)
                            return (
                                <Draggable key={element.id} draggableId={element.id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Element element={element} elements={elements} setElements={setElements} />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

