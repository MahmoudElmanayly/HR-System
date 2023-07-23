import React from "react";

import "./sidebar-button.styles.scss";
import { IconType } from "react-icons";

interface ISidebarButtonProps {
  ButtonIcon: IconType;
  buttonText: string;
  nameOfClass?: string;
}

const SidebarButton = ({ ButtonIcon, buttonText }: ISidebarButtonProps) => {
  return (
    <div className="sidebar-button-container">
      <span className="sidebar-button-icon">
        <ButtonIcon />
      </span>
      <span className="sidebar-button-text">{buttonText}</span>
    </div>
  );
};

export default SidebarButton;
