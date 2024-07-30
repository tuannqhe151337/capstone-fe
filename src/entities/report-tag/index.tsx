import React from "react";
import { Tag } from "../../shared/tag";

interface Props {
  className?: string;
  statusCode: string;
}

export const ReportTag: React.FC<Props> = ({ statusCode, className }) => {
  switch (statusCode) {
    case "REVIEWED":
      return (
        <Tag className={className} background="filled" variant="inProgress">
          Reviewed
        </Tag>
      );
    case "WAITING_FOR_REVIEWED":
      return (
        <Tag className={className} background="unfilled" variant="waiting">
          Waiting for reviewed
        </Tag>
      );
    case "APPROVED":
      return (
        <Tag className={className} background="filled" variant="reviewed">
          Approved
        </Tag>
      );
    default:
      return null;
  }
};
