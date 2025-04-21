"use client";

import { toast as sonnerToast, Toaster } from "sonner";

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: (id?: string) => sonnerToast.dismiss(id),
    Toaster,
  };
}

export const toast = sonnerToast;