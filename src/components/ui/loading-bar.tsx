"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface LoadingBarProps {
    message?: string
    className?: string
    progress?: number
}

export function LoadingBar({ message = "Please wait...", className, progress }: LoadingBarProps) {
    const [value, setValue] = React.useState(0)

    React.useEffect(() => {
        if (progress !== undefined) {
            setValue(progress)
            return
        }

        const timer = setInterval(() => {
            setValue((v) => {
                if (v >= 95) return 95
                const diff = Math.random() * 10
                return Math.min(v + diff, 95)
            })
        }, 500)

        return () => clearInterval(timer)
    }, [progress])

    return (
        <div className={cn("w-full space-y-2 animate-in fade-in duration-500", className)}>
            <div className="flex justify-between items-center text-sm font-medium text-primary animate-pulse">
                <span>{message}</span>
                <span>{Math.round(value)}%</span>
            </div>
            <Progress value={value} className="h-2" />
        </div>
    )
}
