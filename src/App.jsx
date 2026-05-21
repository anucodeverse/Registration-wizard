import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import "./index.css";

const registrationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .regex(/@/, "Email must contain @"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  });

const stepFields = {
  1: ["firstName", "lastName", "dateOfBirth"],
  2: ["email", "password", "confirmPassword"],
};

function ProgressBar({ currentStep }) {
  const progressPercent = (currentStep / 3) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-text">Step {currentStep} of 3</div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

function PersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step">
      <h2>Personal Info</h2>

      <label>
        First Name
        <input type="text" {...register("firstName")} />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
      </label>

      <label>
        Last Name
        <input type="text" {...register("lastName")} />
        {errors.lastName && (
          <p className="error">{errors.lastName.message}</p>
        )}
      </label>

      <label>
        Date of Birth
        <input type="date" {...register("dateOfBirth")} />
        {errors.dateOfBirth && (
          <p className="error">{errors.dateOfBirth.message}</p>
        )}
      </label>
    </div>
  );
}

function AccountDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step">
      <h2>Account Details</h2>

      <label>
        Email
        <input type="email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>

      <label>
        Password
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="error">{errors.password.message}</p>
        )}
      </label>

      <label>
        Confirm Password
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => setShowConfirmPassword((current) => !current)}
            aria-label="Toggle confirm password visibility"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}
      </label>
    </div>
  );
}

function Review({ values }) {
  return (
    <div className="step">
      <h2>Review & Submit</h2>

      <div className="review-card">
        <div>
          <strong>First Name:</strong>
          <span>{values.firstName}</span>
        </div>

        <div>
          <strong>Last Name:</strong>
          <span>{values.lastName}</span>
        </div>

        <div>
          <strong>Date of Birth:</strong>
          <span>{values.dateOfBirth}</span>
        </div>

        <div>
          <strong>Email:</strong>
          <span>{values.email}</span>
        </div>

        <div>
          <strong>Password:</strong>
          <span>••••••••</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = methods;

  const values = watch();

  const goNext = async () => {
    const fieldsToValidate = stepFields[currentStep];

    if (!fieldsToValidate) {
      return;
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setCurrentStep((step) => step + 1);
    }
  };

  const goBack = () => {
    setCurrentStep((step) => step - 1);
  };

  const isCurrentStepValid = () => {
    if (currentStep === 1) {
      return (
        values.firstName &&
        values.lastName &&
        values.dateOfBirth &&
        !errors.firstName &&
        !errors.lastName &&
        !errors.dateOfBirth
      );
    }

    if (currentStep === 2) {
      return (
        values.email &&
        values.password &&
        values.confirmPassword &&
        !errors.email &&
        !errors.password &&
        !errors.confirmPassword
      );
    }

    return true;
  };

  const submitRegistration = (data) => {
    console.log("Final Registration Payload:", data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <main className="page">
        <section className="wizard-card success-card">
          <h1>Registration Complete</h1>
          <p>Your registration payload has been submitted successfully.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="wizard-card">
        <h1>Registration Wizard</h1>

        <ProgressBar currentStep={currentStep} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submitRegistration)}>
            {currentStep === 1 && <PersonalInfoStep />}
            {currentStep === 2 && <AccountDetailsStep />}
            {currentStep === 3 && <ReviewStep values={values} />}

            <div className="actions">
              {currentStep > 1 && (
                <button type="button" className="secondary" onClick={goBack}>
                  Back
                </button>
              )}

              {currentStep < 3 && (
                <button
                  type="button"
                  className="primary"
                  onClick={goNext}
                  disabled={!isCurrentStepValid()}
                >
                  Next
                </button>
              )}

              {currentStep === 3 && (
                <button type="submit" className="primary">
                  Submit
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}