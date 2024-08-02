import React from "react";
import { Tag } from "../../shared/tag";

interface Props {
  className?: string;
  statusCode: string;
}

export const ExpenseTag: React.FC<Props> = ({ statusCode, className }) => {
  switch (statusCode) {
    case "NEW":
      return (
        <Tag className={className} background="unfilled" variant="new">
          New
        </Tag>
      );
    case "DENIED":
      return (
        <Tag className={className} background="unfilled" variant="denied">
          Denied
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
    default:
      return null;
  }
};
