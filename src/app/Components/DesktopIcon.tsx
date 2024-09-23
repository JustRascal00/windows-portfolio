import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa'; // {{ edit_1 }}

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  const iconElement = icon === 'github' ? <FaGithub /> : icon; // {{ edit_2 }}

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-24 h-24 m-2 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="text-4xl mb-2"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {iconElement}
      </motion.div>
      <motion.span
        className="text-sm text-white text-center break-words w-full"
        whileHover={{ textShadow: "0 0 8px rgb(255, 255, 255)" }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

export default DesktopIcon;