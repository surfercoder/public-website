"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

export { AccordionTrigger } from "@/components/ui/accordion-trigger"
export { AccordionContent } from "@/components/ui/accordion-content"

const Accordion = AccordionPrimitive.Root

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  ref?: React.Ref<React.ElementRef<typeof AccordionPrimitive.Item>>
}

function AccordionItem({ className, ref, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  )
}
AccordionItem.displayName = "AccordionItem"

export { Accordion, AccordionItem }
