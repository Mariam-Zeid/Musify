"use client";

import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormCardWrapper from "./formCardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "./formError";
import { Button } from "@/components/ui/button";
import { SocialProviders } from "@/components/auth/socialProviders";

interface FormProps {
  schema: ZodSchema;
  defaultValues: FieldValues;
  onSubmit: (values: FieldValues) => void;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    accept?: string;
  }[];
  title: string;
  description: string;
  buttonText: string;
  error?: string;
  showSocialProviders?: boolean;
  children?: React.ReactNode;
}

const FormAction = ({
  schema,
  defaultValues,
  onSubmit,
  fields,
  title,
  description,
  buttonText,
  error,
  showSocialProviders,
  children,
}: FormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (values: FieldValues) => {
    startTransition(async () => {
      await onSubmit(values);
      form.reset();
    });
  };

  return (
    <FormCardWrapper
      title={title}
      description={description}
      cardContentStyle="w-[360px] sm:w-[450px] md:w-[500px]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-5">
            {fields.map(({ name, label, type, placeholder, accept }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">{label}</FormLabel>
                    <FormControl>
                      <Input
                        type={type}
                        placeholder={placeholder}
                        accept={accept}
                        disabled={isPending}
                        {...field}
                        {...form.register(name)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (type === "file") {
                            const file = e.target.files?.[0];
                            console.log(`Selected ${name} file:`, file);
                            field.onChange(e);
                          } else {
                            field.onChange(e);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {children}
            {error && <FormError message={error} />}
            {showSocialProviders && <SocialProviders />}
            <Button type="submit" variant="musify" disabled={isPending}>
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </FormCardWrapper>
  );
};

export default FormAction;
