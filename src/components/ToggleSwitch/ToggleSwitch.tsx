import React, { useEffect,useState } from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";

import { ReactComponent as ToggleOffIcon } from "@/assets/icons/toggle-off-icon.svg";
import { ReactComponent as ToggleOnIcon } from "@/assets/icons/toggle-on-icon.svg";

function ToggleSwitch({ onChange, checkedStatus }) {
  const [checked, setChecked] = useState(checkedStatus);

  useEffect(() => {
    setChecked(checkedStatus);
  }, [checkedStatus]);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    onChange(nextChecked);
  };

  return (
    <Switch
      onChange={handleChange}
      checked={checked}
      handleDiameter={16}
      height={19}
      width={32}
      onColor='#058b94'
      offColor='#b3b3b3'
      checkedIcon={false}
      uncheckedIcon={false}
      checkedHandleIcon={<div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
                         >
          <ToggleOnIcon />
        </div>}
      uncheckedHandleIcon={<div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
                           >
          <ToggleOffIcon />
        </div>}
      className='react-switch'
    />
  );
}

ToggleSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checkedStatus: PropTypes.bool.isRequired
};

ToggleSwitch.defaultProps = {
  onChange: () => {},
  checkedStatus: false
};

export default ToggleSwitch;
