import React, { useContext } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import { AlertContext } from '../../contexts/AlertContext';

const Alert = () => {
  const { alerts, removeAlert } = useContext(AlertContext);

  return (
    <div className="alert-container">
      {alerts.length > 0 &&
        alerts.map(alert => (
          <BootstrapAlert
            key={alert.id}
            variant={alert.type}
            dismissible
            onClose={() => removeAlert(alert.id)}
            className="mb-3"
          >
            {alert.msg}
          </BootstrapAlert>
        ))}
    </div>
  );
};

export default Alert;