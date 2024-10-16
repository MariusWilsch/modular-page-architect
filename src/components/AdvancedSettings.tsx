import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <h3 className="text-lg font-medium">Global Constants</h3>
          <div className="space-y-4 mt-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="density">Water Density (ρ)</Label>
              <Input type="number" id="density" placeholder="1000" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="gravity">Gravity (g)</Label>
              <Input type="number" id="gravity" placeholder="9.81" />
            </div>
          </div>
        </div>
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">Equipment-Config</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Feed Pump</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="flow-rate">Flow Rate (Q)</Label>
                    <Input type="number" id="flow-rate" placeholder="50" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="head">Head (H)</Label>
                    <Input type="number" id="head" placeholder="8" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="efficiency">Pump Efficiency (η)</Label>
                    <Input type="number" id="efficiency" placeholder="0.7" />
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