import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

export const CardComponent = ({ title, description, content, footer }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>{footer}</CardFooter>
    </Card>
)

export const AccordionComponent = ({ items }) => (
    <Accordion type="single" collapsible>
        {items.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)

export const TabsComponent = ({ tabs }) => (
    <Tabs defaultValue={tabs[0].value}>
        <TabsList>
            {tabs.map((tab, index) => (
                <TabsTrigger value={tab.value} key={index}>
                    {tab.label}
                </TabsTrigger>
            ))}
        </TabsList>
        {tabs.map((tab, index) => (
            <TabsContent value={tab.value} key={index}>
                {tab.content}
            </TabsContent>
        ))}
    </Tabs>
)

export const SelectComponent = ({ options, placeholder }) => (
    <Select>
        <SelectTrigger>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {options.map((option, index) => (
                <SelectItem value={option.value} key={index}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
)

export const CheckboxComponent = ({ label }) => (
    <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">{label}</Label>
    </div>
)

export const RadioGroupComponent = ({ options }) => (
    <RadioGroup>
        {options.map((option, index) => (
            <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
            </div>
        ))}
    </RadioGroup>
)

export const SwitchComponent = ({ label }) => (
    <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">{label}</Label>
    </div>
)

export const SliderComponent = () => {
    const [value, setValue] = useState([33])
    return <Slider defaultValue={[33]} max={100} step={1} onValueChange={setValue} />
}

export const AvatarComponent = ({ src, fallback }) => (
    <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
)

export const BadgeComponent = ({ text }) => <Badge>{text}</Badge>

export const AlertComponent = ({ title, description }) => (
    <Alert>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
    </Alert>
)

export const ProgressComponent = ({ value }) => <Progress value={value} />

export const SeparatorComponent = () => <Separator className="my-4" />

