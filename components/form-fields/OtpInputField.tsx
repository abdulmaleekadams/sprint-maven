// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import React from "react";
// import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

// // Omit both 'name' and 'form' from the base input props
// interface OtpInputFieldProps<T extends FieldValues> {
//   form: UseFormReturn<T>;
//   name: FieldPath<T>;
//   label?: string;
//   description?: string | React.ReactNode;
//   showDescriptionAfterLabel?: boolean;
// }

// const OtpInputField = <T extends FieldValues>({
//   form,
//   name,
//   label,
//   description,
// }: OtpInputFieldProps<T>) => {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className="w-full">
//           {label && <FormLabel className="font-medium">{label}</FormLabel>}

//           <FormControl>
//             <InputOTP maxLength={6} {...field}>
//               <InputOTPGroup>
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>
//           </FormControl>
//           {description && <FormDescription>{description}</FormDescription>}
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// OtpInputField.displayName = "OtpInputField";

// export default OtpInputField;
