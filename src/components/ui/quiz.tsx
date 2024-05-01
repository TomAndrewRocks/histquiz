import React, { useState } from "react";
import { VStack } from "./vstack";
import { Button } from "./button";
import HStack from "./hstack";
import { useToast } from "./use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Question } from "./question";
import { Spinner } from "./spinner";
import Dot from "./dots";

type QuizProps = {
  questions:
    | { question: string; options: string[]; correctOption: string }[]
    | undefined
    | null;
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rightAnswers, setRightAnswers] = React.useState(0);
  const { toast, dismiss } = useToast();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!isLoading) {
      setIsLoading(true);
      setSelectedOption(null);
      setTimeout(() => {
        const isThereAnCorrect = questions?.find(
          (obj) => obj.correctOption === selectedOption
        );
        if (
          isThereAnCorrect &&
          selectedOption === isThereAnCorrect.correctOption
        ) {
          setRightAnswers(rightAnswers + 1);
          toast({
            title: "Acertou!🎊🎊🎊🎉🎉🎉",
            description: `Muito bem! Vamos para a ${
              questions && rightAnswers == questions.length - 2
                ? "última"
                : "próxima"
            } pergunta!`,
          });
        } else {
          toast({
            title: "Essa não! Resposta incorreta! 😥",
            description: "Ainda não foi dessa vez..",
          });
        }
        setIsLoading(false);
      }, 750);
    }
  };

  React.useEffect(() => {
    if (rightAnswers == questions?.length) {
      dismiss(); // dismiss toast
    }
  }, [rightAnswers, questions]);

  const sectionQuestions = React.useMemo(() => {
    if (questions) {
      if (rightAnswers > 0) {
        return questions.slice(rightAnswers, rightAnswers + 1);
      }
      return questions.slice(0, 1);
    }
  }, [rightAnswers, questions]);

  return (
    <VStack className="items-center justify-center w-full p-6 gap-4 rounded-lg shadow-md md:h-[335px] md:w-[800px]">
      {rightAnswers == questions?.length
        ? ""
        : sectionQuestions?.map((opt, index) => (
            <React.Fragment key={index}>
              <p className="text-2xl flex text-center justify-center font-medium">
                {opt.question}
              </p>
              <VStack className="gap-2">
                {opt.options.map((option) => (
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
              <HStack className="items-center justify-center">
                <Dot isChecked={rightAnswers == 1} />
                <Dot isChecked={rightAnswers == 2} />
                <Dot isChecked={rightAnswers == 3} />
              </HStack>
              <Button
                disabled={!selectedOption}
                className="flex my-2 w-40 max-sm:w-24 max-md:w-32 items-center justify-center self-center"
                onClick={handleSubmit}
              >
                {isLoading ? <Spinner /> : "Enviar"}
              </Button>
            </React.Fragment>
          ))}
      {rightAnswers == 3 && (
        <VStack className={"items-center justify-center p-10"}>
          <h1>Parabéns! 🥳🥳🥳🥳</h1>
          <img
            loading="eager"
            width={200}
            height={200}
            src={`https://histquiz-main.s3.amazonaws.com/victory.jpg`}
          />
          <Button onClick={() => setRightAnswers(0)}>
            Deseja jogar novamente?
          </Button>
        </VStack>
      )}
      <Toaster />
    </VStack>
  );
};

Quiz.displayName = "Quiz";

export { Quiz };
