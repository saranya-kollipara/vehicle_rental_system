import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const AvailabilityBadge = ({ available }) => {
  return available ? (
    <span className="badge badge-success">
      <CheckCircle2 size={13} /> Available
    </span>
  ) : (
    <span className="badge badge-danger">
      <XCircle size={13} /> Rented Out
    </span>
  );
};
