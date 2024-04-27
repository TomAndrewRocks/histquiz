import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const QuestionVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/100 hover:text-primary-foreground/100",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/100",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:border-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        variant: "default",
        className: "text-black hover:text-white",
      },
      {
        variant: "ghost",
        className: "text-black hover:text-white",
      },
    ],
  }
);

export interface QuestionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof QuestionVariants> {
  asChild?: boolean;
  index: number;
}

const Question = React.forwardRef<HTMLButtonElement, QuestionProps>(
  (
    { className, variant, size, asChild = false, index, onClick, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const letter = index ? String.fromCharCode(65 + index) : "";
    return (
      <Comp
        className={cn(QuestionVariants({ variant, size, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {letter} {props.children}
      </Comp>
    );
  }
);
Question.displayName = "Question";

export { Question, QuestionVariants };
