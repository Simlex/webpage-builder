import { Input as ShadcnInput } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"

interface InputProps {
    id: string
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
}

export function Input({ id, label, placeholder, value, onChange }: InputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <ShadcnInput id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}

