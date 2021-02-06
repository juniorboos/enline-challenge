import React from "react";
import "./styles.css";

interface Props {
  label: string;
  type: string;
  size: string;
  placeholder?: string;
  onChange(e: any): void;
}

const Input = ({ label, size, type, placeholder, onChange }: Props) => {
  return (
    <div className="input-wrapper">
      <p className="label">{label}</p>
      <input className={size} type={type} onChange={onChange} />
    </div>
  );
};

export default Input;
