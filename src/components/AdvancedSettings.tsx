import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  selectGlobalConstants,
  selectModules,
  updateGlobalConstant,
  updateModuleInput,
  debouncedCalculateResults,
} from "../store/calculatorSlice";
import { InputType } from "../types/moduleTypes";
import InputField from "./InputField";

const AdvancedSettings = () => {
  const globalConstants = useSelector(selectGlobalConstants);
  const modules = useSelector(selectModules);
  const dispatch = useDispatch();

  const handleConstantChange = (index: number, value: string) => {
    dispatch(updateGlobalConstant({ index, value: parseFloat(value) }));
    debouncedCalculateResults(dispatch);
  };

  const handleRareInputChange = (
    moduleIndex: number,
    inputIndex: number,
    value: string
  ) => {
    dispatch(updateModuleInput({ moduleIndex, inputIndex, value }));
    debouncedCalculateResults(dispatch);
  };

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
              <InputField
                key={index}
                label={constant.label.split(" ")[0]}
                value={constant.value}
                unit={constant.unit}
                constantIndex={index}
              />
            ))}
          </div>
        </div>
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">Equipment-Config</h3>
          <Accordion type="single" collapsible className="w-full">
            {modules.map((module, moduleIndex) => {
              const rareInputs = module.inputs.filter(
                (input) => input.type === InputType.RARE
              );
              if (rareInputs.length === 0) return null;

              return (
                <AccordionItem key={moduleIndex} value={`item-${moduleIndex}`}>
                  <AccordionTrigger>{module.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {rareInputs.map((input, inputIndex) => (
                        <InputField
                          key={inputIndex}
                          label={input.label}
                          value={input.value}
                          unit={input.unit}
                          moduleIndex={moduleIndex}
                          inputIndex={module.inputs.findIndex((i) => i.label === input.label)}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};


export default AdvancedSettings;
