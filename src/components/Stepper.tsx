interface Step {
  number: number;
  title: string;
}

interface StepperProps {
  currentStep: number;
  steps: Step[];
}

const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-6 right-0 left-0 h-0.5 bg-[hsl(var(--step-line))] -z-10" />
        
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          
          return (
            <div key={step.number} className="flex flex-col items-center relative flex-1">
              {/* Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mb-3 transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                    ? "bg-primary text-primary-foreground"
                    : "bg-[hsl(var(--step-inactive))] text-white"
                }`}
              >
                {step.number}
              </div>
              
              {/* Title */}
              <div
                className={`text-sm font-medium text-center ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </div>
              
              {/* Connecting line to next step */}
              {index < steps.length - 1 && (
                <div className="absolute top-6 right-0 w-full h-[1px] bg-[#D4C5B9] -z-10" style={{ right: '-50%' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
