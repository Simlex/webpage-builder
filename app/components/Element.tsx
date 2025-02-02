import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { TElement } from "../model/Element"
import { AvatarContent, ButtonContent, ElementTypes, HeadingContent, ImageContent, InputContent, ParagraphContent } from "../model/Content"
import { DialogDescription } from "@radix-ui/react-dialog"

type ElementProps = {
    element: TElement
    elements: TElement[]
    setElements: (elements: any[]) => void
}

export default function Element({ element, elements, setElements }: ElementProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [content, setContent] = useState(element.content)

    const updateElement = () => {
        const updatedElements = elements.map((el) => {
            // console.log("🚀 ~ updatedElements ~ el:", el)
            if (el.id !== element.id) return el; // Skip elements that don't match

            return { ...el, content };

            // switch (el.type) {
            //     case ElementTypes.INPUT:
            //         return { ...el, content: { ...el.content, value: content } };

            //     case ElementTypes.IMAGE:
            //         return { ...el, content: { ...el.content, src: content } };

            //     case ElementTypes.HEADING:
            //         return { ...el, content };
            //     case ElementTypes.PARAGRAPH:
            //         return { ...el, content };

            //     default:
            //         return el; // Return element unchanged if type is not handled
            // }
        });
        setElements(updatedElements)
        setIsOpen(false)
    }

    const getContentValue = () => {
        switch (element.type) {
            case ElementTypes.HEADING:
            case ElementTypes.PARAGRAPH:
                return (content as HeadingContent | ParagraphContent).text || "";

            case ElementTypes.IMAGE:
                return (content as ImageContent).src || "";

            case ElementTypes.INPUT:
                return (content as InputContent).value || "";

            case ElementTypes.AVATAR:
                return (content as AvatarContent).src || "";

            default:
                return "";
        }
    };

    const updateContent = (newValue: string) => {
        switch (element.type) {
            case ElementTypes.HEADING:
            case ElementTypes.PARAGRAPH:
                setContent({ ...(content as HeadingContent | ParagraphContent), text: newValue });
                break;
            case ElementTypes.IMAGE:
                setContent({ ...(content as ImageContent), src: newValue });
                break;
            case ElementTypes.INPUT:
                setContent({ ...(content as InputContent), value: newValue });
                break;
            case ElementTypes.BUTTON:
                setContent({ ...(content as ButtonContent), label: newValue });
                break;

            default:
                break;
        }
    };

    const renderElement = () => {
        const { type, content } = element;

        switch (type) {
            case ElementTypes.HEADING:
                return <h2 className="text-2xl font-bold">{(content as HeadingContent).text}</h2>
            case ElementTypes.PARAGRAPH:
                return <p>{(content as ParagraphContent).text}</p>
            case ElementTypes.IMAGE:
                return <img src={(content as ImageContent).src || "/placeholder.svg"} alt="User added image" className="max-w-full h-auto" />
            case ElementTypes.INPUT:
                return <Input type={content.type} placeholder={(content as InputContent).placeholder} value={(content as InputContent).value} />
            case ElementTypes.BUTTON:
                return <Button type={(content as ButtonContent).type} />
            default:
                return null
        }
    }

    return (
        <div className="relative group">
            {renderElement()}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="absolute top-0 right-0 opacity-0 group-hover:opacity-100" variant="outline" size="sm">
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit {element.type}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            value={getContentValue()}
                            onChange={(e) => updateContent(e.target.value)}
                            placeholder={`Enter ${element.type} content`}
                        />
                    </div>
                    <Button onClick={updateElement}>Save</Button>
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                    <Button className="absolute top-0 right-10 opacity-0 group-hover:opacity-100" variant="outline" size="sm">
                        Delete
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete {element.type}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete this element?
                    </DialogDescription>
                    <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button onClick={() => {
                            const updatedElements = elements.filter((el) => el.id !== element.id);
                            setElements(updatedElements);
                            setIsDeleteOpen(false);
                        }}>Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

