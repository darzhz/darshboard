"use client"

// import { X } from "lucide-react"

// import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

export interface WidgetSettingsProps {
  opacity: number
  onClose: () => void
  onOpacityChange: (opacity: number) => void
}
export function WidgetSettings({  opacity, onClose, onOpacityChange }: WidgetSettingsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Widget Settings</DialogTitle>
          {/* <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
        </DialogHeader>
        <div className="p-4">
          <div className="mb-4">
            <h3 className="mb-2 font-medium">Transparency</h3>
            <div className="flex items-center gap-4">
              <Slider
                value={[opacity * 100]}
                min={20}
                max={100}
                step={5}
                onValueChange={(value) => onOpacityChange(value[0] / 100)}
                className="w-full"
              />
              <span className="w-12 text-right">{Math.round(opacity * 100)}%</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
