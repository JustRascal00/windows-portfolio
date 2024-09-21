import React from 'react'

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => (
  <div className="flex flex-col items-center mb-4 cursor-pointer" onClick={onClick}>
    <div className="w-16 h-16 bg-primary/20 text-primary-foreground flex items-center justify-center rounded-lg shadow-md backdrop-blur-sm">
  {icon}
</div>
    <span className="mt-2 text-sm text-white drop-shadow-md">{label}</span>
  </div>
)

export default DesktopIcon