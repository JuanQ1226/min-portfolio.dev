"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faDownload,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

interface ResumeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResumeModal({
  isOpen,
  onOpenChange,
}: ResumeModalProps) {
  const resumeUrl = "/JuanQuintanaCV2025.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "JuanQuintanaCV2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      className="sm:size-5xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[95vh] sm:max-h-[90vh] m-2 sm:m-6",
        body: "p-0",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFileText} className="text-primary" />
                <span className="text-lg sm:text-xl">
                  Resume - Juan Quintana
                </span>
              </div>
            </ModalHeader>
            <ModalBody className="px-2 sm:px-4">
              <div className="w-full h-[60vh] sm:h-[70vh] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-0"
                  title="Juan Quintana Resume"
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex-col sm:flex-row gap-2 sm:gap-3 px-4 sm:px-6">
              <Button
                color="primary"
                variant="flat"
                onPress={handleDownload}
                startContent={<FontAwesomeIcon icon={faDownload} />}
                className="w-full sm:w-auto text-sm sm:text-base"
                size="sm"
              >
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">Download</span>
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={handleOpenInNewTab}
                startContent={<FontAwesomeIcon icon={faExternalLinkAlt} />}
                className="w-full sm:w-auto text-sm sm:text-base"
                size="sm"
              >
                <span className="hidden sm:inline">Open in New Tab</span>
                <span className="sm:hidden">Open Tab</span>
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="w-full sm:w-auto text-sm sm:text-base"
                size="sm"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
