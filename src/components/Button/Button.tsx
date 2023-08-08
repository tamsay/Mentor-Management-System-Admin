import React from "react";
import cx from "classnames";
import Image from "next/image";
import styled from "styled-components";

import imageLoader from "@/assets/icons/loading.svg";

type ButtonProps = {
  title: string;
  checked?: boolean;
  checkedBtn?: boolean;
  prefixIcon?: React.ReactElement;
  suffixIcon?: React.ReactElement;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
  btnType?: "primary" | "secondary";
  size?: "small" | "big";
};

const ButtonComponent = styled.button<ButtonProps>`
  font-size: ${(props) => (props.size === "small" ? "0.75rem" : "0.875rem")};
  font-family: ${(props) => (props.size === "small" ? "var(--muktaRegular)" : "var(--muktaSemiBold)")};
  padding: ${(props) => (props.size === "small" ? "0.5rem 0.5rem" : "0.75rem 1rem")};
  border-radius: ${(props) => (props.size === "small" ? "5px" : "10px")};
  background-color: ${(props) => (props.btnType === "primary" ? "var(--primaryBtnBg)" : "var(--secondaryBtnBg)")};
  color: ${(props) => (props.btnType === "primary" ? "var(--primaryBtnTextColor)" : "var(--secondaryBtnTextColor)")};
  border: 1px solid
    ${(props) => (props.btnType === "primary" ? "var(--primaryBtnBorderColor)" : "var(--secondaryBtnBorderColor)")};
  width: fit-content;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  outline: none;
  height: fit-content;
  line-height: 1rem;

  input {
    margin: 0 0.375rem 0 0;
  }
  a {
    width: 100%;
  }
  span {
    margin-right: 0;
    font-size: 1.25rem;
  }
  &:hover {
    background-color: ${(props) =>
      props.btnType === "primary" ? "var(--primaryBtnHoverBg)" : "var(--secondaryBtnHoverBg)"};
    color: ${(props) =>
      props.btnType === "primary" ? "var(--primaryBtnHoverTextColor)" : "var(--secondaryBtnHoverTextColor)"};
    border: 1px solid
      ${(props) =>
        props.btnType === "primary" ? "var(--primaryBtnHoverBorderColor)" : "var(--secondaryBtnHoverBorderColor)"};
  }

  @media all and (min-width: 992px) {
    font-size: ${(props) => (props.size === "small" ? "0.875rem" : "1.125rem")};
    padding: ${(props) => (props.size === "small" ? "0.5rem 0.5rem" : "1rem 1.5rem")};
  }
`;

function Button(props: ButtonProps) {
  const {
    title,
    checked,
    checkedBtn,
    prefixIcon,
    suffixIcon,
    disabled = false,
    loading,
    onClick,
    btnType = "primary",
    size = "big"
  } = props;

  return (
    <ButtonComponent
      title={title}
      size={size}
      btnType={btnType}
      onClick={onClick}
      disabled={disabled}
      className={cx("flexRow")}
    >
      {loading ? (
        <Image src={imageLoader} height='16' width='60' alt='loading' />
      ) : (
        <>
          <span style={{ marginRight: "0.5rem" }} className={cx("flexRow")}>
            {prefixIcon && prefixIcon}
          </span>
          {checkedBtn && <input checked={checked} type='checkbox' />}
          {title}{" "}
          <span style={{ marginLeft: "0.5rem" }} className={cx("flexRow")}>
            {suffixIcon && suffixIcon}
          </span>
        </>
      )}
    </ButtonComponent>
  );
}

export default Button;
