"use client"

import { useState } from "react"
import { useWebpage, WebpageProvider } from "../contexts/WebpageContext"
import Canvas from "../components/Canvas"
import Preview from "../components/Preview"
import { Button } from "../components/ui/button"

type DashboardProps = {
    userId: string
}

function Dashboard({ userId }: DashboardProps) {
    const { elements, setElements, saveWebpage, loading } = useWebpage()
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="flex justify-between mb-4">
                <Button onClick={() => setIsPreviewOpen(true)}>Preview</Button>
                <Button onClick={saveWebpage}>Save Changes</Button>
            </div>
            <Canvas elements={elements} setElements={setElements} />
            <Preview elements={elements} isOpen={isPreviewOpen} setIsOpen={setIsPreviewOpen} />
        </div>
    )
}

export default function DashboardPage() {
    // In a real application, you would get the userId from your authentication system
    const userId = "user-1"

    return (
        <WebpageProvider userId={userId}>
            <Dashboard userId={userId} />
        </WebpageProvider>
    )
}

