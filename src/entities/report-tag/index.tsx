import React from "react";
import { Tag } from "../../shared/tag";
import { ReportStatusCode } from "../../providers/store/api/reportsAPI";

interface Props {
  className?: string;
  statusCode: ReportStatusCode;
}

export const ReportTag: React.FC<Props> = ({ statusCode, className }) => {
  switch (statusCode) {
    case "NEW":
      return (
        <Tag className={className} background="unfilled" variant="new">
          Reviewed
        </Tag>
      );

    case "REVIEWED":
      return (
        <Tag className={className} background="filled" variant="inProgress">
          Reviewed
        </Tag>
      );

    case "WAITING_FOR_APPROVAL":
      return (
        <Tag className={className} background="unfilled" variant="waiting">
          Waiting for approval
        </Tag>
      );

    case "APPROVED":
      return (
        <Tag className={className} background="filled" variant="reviewed">
          Approved
        </Tag>
      );

    case "CLOSED":
      return (
        <Tag className={className} background="unfilled" variant="deactivate">
          Closed
        </Tag>
      );
    default:
      return null;
  }
};
