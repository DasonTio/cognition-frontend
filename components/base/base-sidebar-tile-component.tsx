import clsx from "clsx";
import React from "react";

interface Props {
  Icon: React.ElementType<any>;
  title: string;
  trail?: string;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

const BaseSidebarTileComponent: React.FC<Props> = ({
  Icon,
  title,
  trail,
  isActive,
  isExpanded,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx([
        "flex px-4 rounded-xl border text-sm items-center gap-4 h-10 cursor-pointer",
        {
          "justify-center": !isExpanded,
          "justify-between": isExpanded,
          "bg-black text-white": isActive,
          "hover:bg-gray-100": !isActive,
        },
      ])}
    >
      <div className="flex gap-2 items-center justify-center">
        <div className="flex items-center justify-center">
          <Icon size={20} />
        </div>
        {isExpanded && (
          <p className="flex justify-start items-center">{title}</p>
        )}
      </div>
      {isExpanded && <p className="text-[0.8em] font-bold">{trail}</p>}
    </div>
  );
};

export default BaseSidebarTileComponent;
