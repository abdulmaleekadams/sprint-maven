import { defaultImages } from "@/constant/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-errors";

type FormPickerProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [selectedImagesId, setSelectedImagesId] = useState(null);

  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to load images feom unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image, index) => (
          <div
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending ? "opacity-50 hover:opacity-50 cursor-auto" : ""
            )}
            key={image.id}
            onClick={() => {
              if (pending) {
                return;
              }
              setSelectedImagesId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              aria-label="Select board image"
              checked={selectedImagesId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              className="object-cover rounded-sm"
              src={image.urls.thumb}
              alt="Unsplash"
            />
            {selectedImagesId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            <Link
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-xs truncate text-white hover:underline p-1 bg-black/10"
              href={image.links.html}
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};

export default FormPicker;
