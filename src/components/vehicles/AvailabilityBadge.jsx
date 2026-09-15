import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const AvailabilityBadge = ({ available }) => {
  const isAvailable = available === true || available === 1 || available === '1' || available === 'true';

  return isAvailable ? (
    <span className="badge badge-success">
      <CheckCircle2 size={13} /> Available
    </span>
  ) : (
    <span className="badge badge-danger">
      <XCircle size={13} /> Unavailable
    </span>
  );
};
