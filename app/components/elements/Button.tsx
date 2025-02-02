import { Button as ShadcnButton } from "@/app/components/ui/button"

interface ButtonProps {
    label: string
    onClick: () => void
}

export function Button({ label, onClick }: ButtonProps) {
    return <ShadcnButton onClick={onClick}>{label}</ShadcnButton>
}

