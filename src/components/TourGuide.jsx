import { useEffect } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import "../styles/TourGuide.css";

function TourGuide() {

  useEffect(() => {
   const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    classes: "shepherd-theme-arrows",
    scrollTo: true,
    modalOverlayOpeningPadding: 12,  // ADD THIS
  }
});


    // ---- STEP DEFINITIONS ----
    const steps = [
      {
        id: "step-1",
        text: "Click here to create your custom workout plan.",
        element: ".WorkoutPlansCard",
        on: "bottom",
        handler: handleStep1Click
      },
      {
        id: "step-2",
        text: "Select your workout days, then click this button.",
        element: ".CustomWorkoutPlanAddWorkoutContainer",
        on: "bottom",
         offset: "0 10" ,
        handler: handleStep2Click
      },
      {
        id: "step-3",
        text: "Choose your muscle groups for this workout plan.",
        element: ".MuscleGroupCard",
        on: "bottom",
        handler: handleStep3Click
      },
      {
        id: "step-4",
        text: "Click here to continue to exercise selection.",
        element: ".GoToExerciseSelectionBtn",
        on: "right",
        handler: handleStep4Click
      },
      {
        id: "step-5",
        text: "Add exercises by clicking this button.",
        element: ".AddExerciseBtn",
        on: "top",
        handler: handleStep5Click
      },
      {
        id: "step-6",
        text: "Finally, click here to save your workout plan.",
        element: ".SaveWorkoutPlanBtn",
        on: "left",
        handler: handleStep6Click
      }
    ];

    // ---- ADD STEPS TO TOUR ----
    steps.forEach((step) => {
      tour.addStep({
        id: step.id,
        text: step.text,
        attachTo: {
          element: step.element,
          on: step.on
        },
        buttons: [] // user must click the UI element
      });
    });

    // ---- EVENT LISTENERS WHEN A STEP SHOWS ----
    tour.on("show", (event) => {
      const currentStep = steps.find((s) => s.id === event.step.id);
      if (!currentStep) return;

      const el = document.querySelector(currentStep.element);
      if (el) {
        el.addEventListener("click", currentStep.handler);
      }
    });

    // ---- HANDLERS ----
    function handleStep1Click() {
      removeListener(".WorkoutPlansCard", handleStep1Click);
      tour.next();
    }
    function handleStep2Click() {
      removeListener(".CustomWorkoutPlanContainer", handleStep2Click);
      tour.next();
    }
    function handleStep3Click() {
      removeListener(".MuscleGroupCard", handleStep3Click);
      tour.next();
    }
    function handleStep4Click() {
      removeListener(".GoToExerciseSelectionBtn", handleStep4Click);
      tour.next();
    }
    function handleStep5Click() {
      removeListener(".AddExerciseBtn", handleStep5Click);
      tour.next();
    }
    function handleStep6Click() {
      removeListener(".SaveWorkoutPlanBtn", handleStep6Click);
      tour.complete();
    }

    // ---- REMOVE EVENT LISTENER HELPER ----
    function removeListener(selector, handler) {
      document.querySelector(selector)
        ?.removeEventListener("click", handler);
    }

    // Expose function to start the tour
    window.startAppTour = () => tour.start();

  }, []);

  return null;
}

export default TourGuide;
