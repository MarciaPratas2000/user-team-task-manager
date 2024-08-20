import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandshake, faGear } from '@fortawesome/free-solid-svg-icons'; // Import new icons
import { useDrag } from 'react-dnd';
import './toolbox.css';

// Updated icons array with titles and new icons
const icons = [
  { icon: faHand, index: 1, title: 'Available to Help' },
  { icon: faHandshake, index: 2, title: 'Collaborating' },
  { icon: faGear, index: 3, title: 'Work Interference' }
];

const Toolbox = () => {
  return (
    <div className="toolbox container">
      <div className="row">
        {icons.map(({ icon, index, title }) => (
          <ToolboxItem icon={icon} iconIndex={title} index={index} title={title} key={`icon-${index}`} />
        ))}
      </div>
    </div>
  );
};

const isValidIcon = (icon) => typeof icon === 'object' && icon.icon;

const ToolboxItem = ({ icon, iconIndex, title }) => {
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
      title={title} // Add title as a tooltip
    >
      {isValidIcon(icon) ? (
        <>
          <FontAwesomeIcon icon={icon} className="text-danger"  size="sm"/>
          <div className="toolbox-item-title">{title}</div> {/* Display the title */}
        </>
      ) : (
        <div>Invalid icon</div>
      )}
    </div>
  );
};

export default Toolbox;
