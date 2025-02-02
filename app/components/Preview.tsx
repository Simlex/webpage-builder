import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { ElementTypes, HeadingContent, ImageContent } from "../model/Content"
import { TElement } from "../model/Element"

interface PreviewProps {
    elements: TElement[]
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function Preview({ elements, isOpen, setIsOpen }: PreviewProps) {
    console.log("🚀 ~ Preview ~ elements:", elements)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Webpage Preview</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {elements.map((element) => {
                        switch (element.type) {
                            case ElementTypes.HEADING:
                                return (
                                    <h2 key={element.id} className="text-2xl font-bold my-4">
                                        {(element.content as HeadingContent).text}
                                    </h2>
                                )
                            case ElementTypes.PARAGRAPH:
                                return (
                                    <p key={element.id} className="my-2">
                                        {(element.content as HeadingContent).text}
                                    </p>
                                )
                            case ElementTypes.IMAGE:
                                return (
                                    <img
                                        key={element.id}
                                        src={(element.content as ImageContent).src || "/placeholder.svg"}
                                        alt="User added image"
                                        className="max-w-full h-auto my-4"
                                    />
                                )
                            default:
                                return null
                        }
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}

