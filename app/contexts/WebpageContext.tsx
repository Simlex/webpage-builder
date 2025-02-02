"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { TElement } from "../model/Element";

const WebpageContext = createContext<WebpageContextData | undefined>(undefined);

// Define the type for the context data
export type WebpageContextData = {
    elements: TElement[]
    setElements: React.Dispatch<React.SetStateAction<TElement[]>>
    saveWebpage: () => Promise<void>
    loading: boolean
};

// Create a provider component that takes children as props
type WebpageProviderData = {
    children: ReactNode;
    userId: string;
};

export function WebpageProvider({ children, userId }: WebpageProviderData) {
    const [elements, setElements] = useState<TElement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadWebpage()
    }, []) // Removed userId from dependencies

    const loadWebpage = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/webpage?userId=${userId}`)
            if (response.ok) {
                const data = await response.json()
                setElements(data.elements)
            }
        } catch (error) {
            console.error("Error loading webpage:", error)
        }
        setLoading(false)
    }

    const saveWebpage = async () => {
        try {
            const response = await fetch("/api/webpage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, elements }),
            })
            if (!response.ok) {
                throw new Error("Failed to save webpage")
            }
        } catch (error) {
            console.error("Error saving webpage:", error)
        }
    }

    const sharedData: WebpageContextData = {
        elements,
        setElements,
        saveWebpage,
        loading,
    }

    return (
        <WebpageContext.Provider value={sharedData}>
            {children}
        </WebpageContext.Provider>
    )
}

export function useWebpage() {
    return useContext(WebpageContext) as WebpageContextData
}

