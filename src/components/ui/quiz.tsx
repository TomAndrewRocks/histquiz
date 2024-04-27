import React, { useState } from "react";
import { VStack } from "./vstack";
import { Button } from "./button";
import HStack from "./hstack";
import { useToast } from "./use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Question } from "./question";

type QuizProps = {
  question: string;
  options: string[];
  correctOption: string;
};

const Quiz: React.FC<QuizProps> = ({ question, options, correctOption }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { toast } = useToast();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === correctOption) {
      toast({
        title: "Acertou!🎊🎊🎊🎉🎉🎉",
        description: "Muito bem! Vamos para a próxima pergunta!",
      });
    } else {
      toast({
        title: "Essa não! Resposta incorreta! 😥",
        description: "Ainda não foi dessa vez..",
      });
    }
  };

  return (
    <VStack className="w-full p-6 rounded-lg shadow-md">
      <p className="text-2xl flex text-center justify-center font-bold mb-4">
        {question}
      </p>
      <VStack className="gap-2">
        {options.map((option, index) => (
          <Question
            index={index}
            key={option}
            className={`w-full ${
              selectedOption == option
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Question>
        ))}
      </VStack>
      <HStack className="mt-4">
        <Button
          disabled={!selectedOption}
          className="flex-1"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </HStack>
      <Toaster />
    </VStack>
  );
};

Quiz.displayName = "Quiz";

export { Quiz };
