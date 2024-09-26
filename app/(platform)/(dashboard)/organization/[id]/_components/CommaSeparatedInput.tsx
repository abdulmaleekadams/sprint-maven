"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";

// Regular expression to validate email addresses
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CommaSeparatedInput = ({
  selectedEmails,
  setSelectedEmails,
}: {
  setSelectedEmails: Dispatch<SetStateAction<string[]>>;
  selectedEmails: string[];
}) => {
  const [emailsInput, setEmailsInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Helper function to add valid emails and prevent duplicates
  const addEmail = (email: string) => {
    if (emailPattern.test(email) && !selectedEmails.includes(email)) {
      setSelectedEmails((prevEmails) => [...prevEmails, email]);
      setEmailsInput(""); // Clear input
      setErrorMessage(""); // Clear any error message
    } else if (!emailPattern.test(email)) {
      setErrorMessage("Invalid email address.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailsInput(event.target.value.toLowerCase());
    setErrorMessage(""); // Clear error message on input change
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentInput = emailsInput.trim();

    // Check if the input ends with a comma or space
    if ((event.key === " " || event.key === ",") && currentInput) {
      const email = currentInput; // Keep the input as-is, no need to slice because `trim()` already removes spaces
      addEmail(email); // Add email to the list
      setEmailsInput(""); // Clear input field
    }
  };

  const handleContainerClick = () => {
    inputRef?.current?.focus();
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setSelectedEmails(
      selectedEmails.filter((email) => email !== emailToRemove)
    );
  };

  return (
    <div>
      <div
        className="flex border flex-wrap min-h-20 p-4 rounded-md mt-4 max-h-[15rem] gap-2"
        onClick={handleContainerClick}
      >
        {selectedEmails.length > 0 && (
          <>
            {selectedEmails.map((selectedEmail) => (
              <Button
                size="sm"
                className="justify-between gap-3 bg-primary group"
                key={selectedEmail}
              >
                {selectedEmail}
                <X
                  className="w-4 h-4 group-hover:text-red-500"
                  onClick={() => handleRemoveEmail(selectedEmail)}
                />
              </Button>
            ))}
          </>
        )}
        <Input
          ref={inputRef}
          id="emails"
          name="emails"
          className="border-none flex-grow w-auto focus-visible:ring-offset-0 focus-visible:ring-0"
          value={emailsInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Add keydown event listener
          placeholder="Enter emails"
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default CommaSeparatedInput;
