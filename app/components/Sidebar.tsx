import { Draggable, Droppable } from "@hello-pangea/dnd"
import { ElementTypes } from "../model/Content"

const elements = [
    ElementTypes.HEADING,
    "paragraph",
    "image",
    "input",
    "button",
    "card",
    "accordion",
    "tabs",
    "select",
    "checkbox",
    "radio",
    "switch",
    "slider",
    "avatar",
    "badge",
    "alert",
    "progress",
    "separator",
]

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Elements</h2>
            <Droppable droppableId="sidebar" isDropDisabled={true}>
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {elements.map((element, index) => (
                            <Draggable key={`sidebar-${element}`} draggableId={element as ElementTypes} index={index}>
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-white p-2 rounded shadow cursor-move"
                                    >
                                        {element.charAt(0).toUpperCase() + element.slice(1)}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
}

