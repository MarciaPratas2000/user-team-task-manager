import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faUserGear, faSquarePersonConfined } from '@fortawesome/free-solid-svg-icons';
import { useDrag } from 'react-dnd';
import './toolbox.css';

const Toolbox = () => {
  // Array of icons with their respective indices
  const icons = [
    { icon: faExclamationCircle, index: 1 },
    { icon: faUserGear, index: 2 },
    { icon: faSquarePersonConfined, index: 3 },
    { icon: faUserGear, index: 4 }, // Duplicate
    { icon: faSquarePersonConfined, index: 5 } // Duplicate
  ];

  return (
    <div className="toolbox container">
      <div className="row">
        {icons.map(({ icon, index }) => (
          <ToolboxItem icon={icon} iconIndex={index} key={index} />
        ))}
      </div>
    </div>
  );
};

const ToolboxItem = ({ icon, iconIndex }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ICON',
    item: { icon, iconIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`col-6 col-md-4 col-lg-3 mb-2 toolbox-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <FontAwesomeIcon icon={icon} className="text-danger" />
    </div>
  );
};

export default Toolbox;
