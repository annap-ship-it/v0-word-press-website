"use client"

import { ContactFormModal } from "./contact-form-modal"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  return (
    <ContactFormModal
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}
