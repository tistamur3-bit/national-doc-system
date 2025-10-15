interface Step {
  number: number;
  title: string;
}
interface StepperProps {
  currentStep: number;
  steps: Step[];
}
const Stepper = ({
  currentStep,
  steps
}: StepperProps) => {
  return <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-6 right-0 left-0 h-0.5 bg-[hsl(var(--step-line))] -z-10" />
        
        {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        return;
      })}
      </div>
    </div>;
};
export default Stepper;