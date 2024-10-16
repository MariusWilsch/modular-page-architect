import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { globalConstants } from '../constants/dummyData';

const AdvancedSettings = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Advanced Config</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Advanced Settings</SheetTitle>
          <SheetDescription>
            Configure global constants and equipment-specific settings.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">Global Constants</h3>
          <div className="space-y-4">
            {globalConstants.map((constant, index) => (
              <div key={index} className="grid w-full max-w-sm items-center gap-1.5 relative">
                <Label htmlFor={`constant-${index}`}>{constant.label.split(' ')[0]}</Label>
                <Input
                  type="number"
                  id={`constant-${index}`}
                  defaultValue={constant.value}
                  className="pr-16"
                />
                <span className="absolute right-3 top-9 text-sm text-gray-400">
                  {constant.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">Equipment-Config</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Feed Pump</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5 relative">
                    <Label htmlFor="efficiency">Pump Efficiency</Label>
                    <Input
                      type="number"
                      id="efficiency"
                      defaultValue={0.7}
                      step={0.01}
                      min={0}
                      max={1}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-9 text-sm text-gray-400">
                      η
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* Add more AccordionItems for other equipment as needed */}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedSettings;