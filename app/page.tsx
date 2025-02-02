"use client"

import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Canvas from "./components/Canvas"
import Preview from "./components/Preview"
import { WebpageProvider, useWebpage } from "./contexts/WebpageContext"
import { Button } from "@/app/components/ui/button"
import { ElementContentMap, ElementTypes, TDefaultContent } from "./model/Content"

type WebpageBuilderProps = {
    userId: string
}

function WebpageBuilder({ userId }: WebpageBuilderProps) {
    const { elements, setElements, saveWebpage, loading } = useWebpage()
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        if (result.source.droppableId === "sidebar" && result.destination.droppableId === "canvas") {
            const newElement = {
                id: `element-${Date.now()}`,
                type: result.draggableId as ElementTypes,
                content: getDefaultContent(result.draggableId as ElementTypes),
            }
            setElements([...elements, newElement])
        } else if (result.source.droppableId === "canvas" && result.destination.droppableId === "canvas") {
            const newElements = Array.from(elements)
            const [reorderedItem] = newElements.splice(result.source.index, 1)
            newElements.splice(result.destination.index, 0, reorderedItem)
            setElements(newElements)
        }
    }

    const getDefaultContent = (type: ElementTypes): ElementContentMap[ElementTypes] => {
        switch (type) {
            case "heading":
                return { type: ElementTypes.HEADING, text: "New Heading" };
            case "paragraph":
                return { type: ElementTypes.PARAGRAPH, text: "New Paragraph" };
            case "image":
                return { type: ElementTypes.IMAGE, src: "https://via.placeholder.com/150" };
            case "input":
                return { type: ElementTypes.INPUT, label: "New Input", placeholder: "Enter text", value: "" };
            case "button":
                return { type: ElementTypes.BUTTON, label: "New Button" };
            case "card":
                return { type: ElementTypes.CARD, title: "Card Title", description: "Card Description", content: "Card Content", footer: "Card Footer" };
            case "accordion":
                return { type: ElementTypes.ACCORDION, items: [{ trigger: "Accordion Item 1", content: "Accordion Content 1" }] };
            case "tabs":
                return { type: ElementTypes.TABS, items: [{ label: "Tab 1", value: "tab1", content: "Tab 1 Content" }] };
            case "select":
                return { type: ElementTypes.SELECT, options: [{ label: "Option 1", value: "option1" }], placeholder: "Select an option" };
            case "checkbox":
                return { type: ElementTypes.CHECKBOX, label: "Checkbox Label" };
            case "radio":
                return { type: ElementTypes.RADIO, options: [{ label: "Option 1", value: "option1" }] };
            case "switch":
                return { type: ElementTypes.SWITCH, label: "Switch Label" };
            case "avatar":
                return { type: ElementTypes.AVATAR, src: "https://github.com/shadcn.png", fallback: "CN" };
            case "badge":
                return { type: ElementTypes.BADGE, text: "Badge" };
            case "alert":
                return { type: ElementTypes.ALERT, title: "Alert Title", description: "Alert Description" };
            case "progress":
                return { type: ElementTypes.PROGRESS, value: 50 };
            default:
                return { type: ElementTypes.HEADING, text: "New Heading" };
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex h-screen flex-col">
            <div className="flex flex-1">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Sidebar />
                    <Canvas elements={elements} setElements={setElements} />
                </DragDropContext>
            </div>
            <div className="p-4 border-t flex justify-between">
                <Button onClick={() => setIsPreviewOpen(true)}>Preview</Button>
                <Button onClick={saveWebpage}>Save Webpage</Button>
            </div>
            <Preview elements={elements} isOpen={isPreviewOpen} setIsOpen={setIsPreviewOpen} />
        </div>
    )
}

export default function Home() {
    // In a real application, you would get the userId from your authentication system
    const userId = "user-1"

    return (
        <WebpageProvider userId={userId}>
            <WebpageBuilder userId={userId} />
        </WebpageProvider>
    )
}

