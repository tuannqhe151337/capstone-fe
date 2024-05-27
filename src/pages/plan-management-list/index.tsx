import { useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { FaUpload } from "react-icons/fa";
import { UploadPlanModal } from "../../widgets/upload-plan-modal";

export const PlanManagementList: React.FC = () => {
  const [showUploadPlanModal, setShowUploadPlanModal] =
    useState<boolean>(false);

  return (
    <div className="px-6">
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary font-extrabold text-lg w-fit ml-7">
            Plan management
          </p>
          <div className="ml-auto">
            <Button
              onClick={() => {
                setShowUploadPlanModal((prevProps) => !prevProps);
              }}
            >
              <div className="flex flex-row flex-wrap gap-3">
                <FaUpload className="mt-0.5" />
                <p className="text-sm font-semibold">Upload plan</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      <UploadPlanModal
        show={showUploadPlanModal}
        onClose={() => {
          setShowUploadPlanModal(false);
        }}
      />
    </div>
  );
};
