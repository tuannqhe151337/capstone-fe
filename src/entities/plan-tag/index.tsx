import React from "react";
import { Tag } from "../../shared/tag";

interface Props {
  className?: string;
  statusCode: string;
  statusName: string;
}

export const PlanTag: React.FC<Props> = ({
  statusCode,
  statusName,
  className,
}) => {
  switch (statusCode) {
    case "NEW":
      return (
        <Tag className={className} background="unfilled" variant="new">
          {statusName}
        </Tag>
      );
    case "REVIEWED":
      return (
        <Tag className={className} background="filled" variant="inProgress">
          {statusName}
        </Tag>
      );
    case "WAITING_FOR_REVIEWED":
      return (
        <Tag className={className} background="unfilled" variant="waiting">
          {statusName}
        </Tag>
      );
    case "APPROVED":
      return (
        <Tag className={className} background="filled" variant="reviewed">
          {statusName}
        </Tag>
      );
    default:
      return null;
  }
};
