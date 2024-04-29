import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

type HintProps = {
    children: React.ReactNode
    description: string
    side?: "left" | "right" | "top" | "bottom"
    sideOffset?: number
}

const Hint = ({children, description, side='bottom', sideOffset=0}: HintProps) => {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger></TooltipTrigger>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Hint