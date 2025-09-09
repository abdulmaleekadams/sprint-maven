/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetPresignedUrlMutation } from "@/services/upload.service";
import axios from "axios";
import { CloudUploadIcon, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import Dropzone from "react-dropzone";
import {
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import CropModal from "../modals/CropModal";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

async function uploadFileToS3({
  file,
  presignedUrl,
  setProgress,
}: {
  file: File;
  presignedUrl: string;
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
          console.log(`Upload Progress: ${percentCompleted}%`);
        } else {
          console.log("Upload Progress: Unable to determine total file size.");
        }
      },
    });

    if (response.status === 200) {
      console.log("Upload successful!");
    } else {
      console.error("Upload failed with status:", response.status);
    }

    return response;
  } catch (error) {
    console.error("Upload error:", error);
  }
}

interface DocumentDropzoneFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  error?: FieldError;
  label?: string;
  uploadType: "product" | "storefront" | "vendor" | "promotion";
  shouldCrop?: boolean;
  documents: {
    base64File: string;
    fileName: string;
    fileSize: number;
  }[];
  setDocuments: Dispatch<
    SetStateAction<
      {
        base64File: string;
        fileName: string;
        fileSize: number;
      }[]
    >
  >;
  isArray?: boolean;
}

const DocumentDropzoneField = <T extends FieldValues>({
  documents,
  setDocuments,
  form,
  name,
  label,
  shouldCrop = true,
  uploadType,
  isArray,
}: DocumentDropzoneFieldProps<T>) => {
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [getPresignedUrl] = useGetPresignedUrlMutation();

  const MAX_SIZE_MB = 5;
  const formatBytesToMB = (bytes: number): string =>
    `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  const handleDrop = async ({
    files,
    uploadType,
  }: {
    files: File[];
    uploadType: "product" | "storefront" | "vendor" | "promotion";
  }) => {
    const uploadedFile = files[0];

    const sizeInMB = uploadedFile.size / (1024 * 1024);
    if (sizeInMB > MAX_SIZE_MB) {
      toast.error(`File too large. Maximum size allowed is ${MAX_SIZE_MB} MB.`);
      return;
    }

    if (
      documents.some(
        (doc) => doc.fileName.toLowerCase() === uploadedFile.name.toLowerCase()
      )
    ) {
      toast.error(
        "Duplicate file detected. Please rename the file if it's different."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;

      if (shouldCrop) {
        setImageToCrop(base64);
        setCropModalOpen(true);
      } else {
        try {
          setIsUploading(true);
          setUploadError(null);

          const { responseCode, responseMessage, data } = await getPresignedUrl(
            {
              fileName: uploadedFile.name,
              type: uploadType,
            }
          ).unwrap();

          if (responseCode !== "00") {
            throw new Error(responseMessage);
          }

          const res = await uploadFileToS3({
            file: uploadedFile,
            presignedUrl: data.presignedUrl,
            setProgress: setUploadProgress,
          });

          if (res?.status !== 200) {
            throw new Error("Failed to upload file.");
          }

          if (isArray) {
            setDocuments((prev) => [
              ...prev,
              {
                base64File: base64,
                fileName: uploadedFile.name,
                fileSize: uploadedFile.size,
              },
            ]);

            const prevUrls = form.getValues(name) || [];
            form.setValue(name, [...prevUrls, data.accessUrl] as PathValue<
              T,
              Path<T>
            >);
          } else {
            setDocuments([
              {
                base64File: base64,
                fileName: uploadedFile.name,
                fileSize: uploadedFile.size,
              },
            ]);
            form.setValue(name, data.accessUrl as PathValue<T, Path<T>>);
          }

          form.trigger(name);
        } catch (error: any) {
          console.error(error);
          setUploadError(error.message || "Upload failed");
          toast.error("Upload failed");
        } finally {
          setIsUploading(false);
        }
      }
    };

    reader.readAsDataURL(uploadedFile);
  };

  const handleRemove = (idx: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(idx, 1);
    setDocuments(updatedDocuments);

    if (isArray) {
      const updatedUrls = (form.getValues(name) as string[]).filter(
        (_: any, i: number) => i !== idx
      );
      form.setValue(name, updatedUrls as PathValue<T, Path<T>>);
    } else {
      form.setValue(name, "" as PathValue<T, Path<T>>);
    }

    form.trigger(name);
    setUploadError(null);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="w-full">
          <div className="space-y-4">
            {label && <FormLabel className="mb-2">{label}</FormLabel>}

            {/* Uploaded images preview */}
            {documents.length > 0 && (
              <div className="space-y-2">
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between h-16 bg-white shadow border p-2 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.base64File}
                        alt={doc.fileName}
                        className="w-10 h-10 object-cover rounded-md shrink-0"
                      />
                      <div>
                        <p className="text-sm">{doc.fileName}</p>
                        <p className="text-xs font-medium mt-0.5 text-neutral-500">
                          {formatBytesToMB(doc.fileSize)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-destructive/40 hover:text-destructive text-destructive"
                      onClick={() => handleRemove(idx)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Always show Dropzone if isArray or if no image has been uploaded */}
            {isArray || documents.length === 0 ? (
              <Dropzone
                onDrop={(files) => handleDrop({ files, uploadType })}
                disabled={isUploading}
                onDropRejected={(fileRejected) =>
                  toast.error(fileRejected[0].errors[0].message)
                }
                maxFiles={1}
                multiple={false}
                maxSize={1024 * 5000}
                accept={{
                  "image/jpeg": [".jpg", ".jpeg"],
                  "image/png": [".png"],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="w-full border border-dashed rounded-md py-4 shadow mt-4">
                    <div
                      {...getRootProps()}
                      className={`w-full h-full flex flex-col items-center justify-center ${
                        isUploading
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="w-full flex justify-center items-center flex-col rounded-md">
                        <div className="bg-white p-2 rounded-md shadow-sm">
                          <CloudUploadIcon className="w-6 text-primary h-6 shrink-0" />
                        </div>
                        <p className="text-center text-xs font-medium text-neutral-500 mt-4">
                          <span className="text-primary font-semibold">
                            Click to upload
                          </span>{" "}
                          or Drag and drop some files here
                        </p>
                        <p className="text-center text-xs text-neutral-500">
                          Max file size: 5MB
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            ) : null}

            {isUploading && uploadProgress >= 0 && (
              <p className="text-xs text-blue-600">
                Uploading: {uploadProgress}%
              </p>
            )}
            {uploadError && (
              <p className="text-xs text-red-500">{uploadError}</p>
            )}
          </div>
          <FormMessage />
          {imageToCrop && (
            <CropModal
              open={cropModalOpen}
              image={imageToCrop}
              onClose={() => setCropModalOpen(false)}
              onCropDone={async (croppedBlob) => {
                try {
                  setIsUploading(true);
                  setUploadError(null);

                  const croppedFile = new File(
                    [croppedBlob],
                    "cropped-image.jpg",
                    {
                      type: "image/jpeg",
                    }
                  );

                  const { responseCode, responseMessage, data } =
                    await getPresignedUrl({
                      fileName: croppedFile.name,
                      type: uploadType,
                    }).unwrap();

                  if (responseCode !== "00") {
                    throw new Error(responseMessage);
                  }

                  const res = await uploadFileToS3({
                    file: croppedFile,
                    presignedUrl: data.presignedUrl,
                    setProgress: setUploadProgress,
                  });

                  if (res?.status !== 200) {
                    throw new Error("Failed to upload file.");
                  }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (isArray) {
                      setDocuments((prev) => [
                        ...prev,
                        {
                          base64File: reader.result as string,
                          fileName: croppedFile.name,
                          fileSize: croppedFile.size,
                        },
                      ]);

                      const prevUrls = form.getValues(name) || [];
                      form.setValue(name, [
                        ...prevUrls,
                        data.accessUrl,
                      ] as PathValue<T, Path<T>>);
                    } else {
                      setDocuments([
                        {
                          base64File: reader.result as string,
                          fileName: croppedFile.name,
                          fileSize: croppedFile.size,
                        },
                      ]);
                      form.setValue(
                        name,
                        data.accessUrl as PathValue<T, Path<T>>
                      );
                    }

                    form.trigger(name);
                  };
                  reader.readAsDataURL(croppedFile);
                } catch (error: any) {
                  console.error(error);
                  setUploadError(error.message || "Upload failed");
                  toast.error("Upload failed");
                } finally {
                  setIsUploading(false);
                  setCropModalOpen(false);
                }
              }}
            />
          )}
        </FormItem>
      )}
    />
  );
};

export default DocumentDropzoneField;
