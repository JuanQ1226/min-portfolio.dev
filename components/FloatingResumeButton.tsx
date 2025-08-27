"use client";
import React from "react";
import { Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import ResumeModal from "./ResumeModal";

export default function FloatingResumeButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* Fixed floating button - responsive positioning and sizing */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Tooltip content="View Resume" placement="left">
          <Button
            onPress={onOpen}
            color="primary"
            size="md"
            className="sm:size-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 w-12 h-12 sm:w-14 sm:h-14"
            isIconOnly
            aria-label="Open Resume"
          >
            <FontAwesomeIcon icon={faFileText} className="text-sm sm:text-lg" />
          </Button>
        </Tooltip>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
