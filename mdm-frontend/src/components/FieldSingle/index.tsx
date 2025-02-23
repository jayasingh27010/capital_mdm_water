import { FormControl, FormLabel,FormErrorMessage } from "@chakra-ui/react";
import { FieldSingleProps } from "src/components/ComponentTypes";
import TextInput from "src/components/FieldComponents/TextInput";
import SwitchInput from "../FieldComponents/SwitchInput";
import PinInput from "../FieldComponents/PinInput";
import RequiredStar from "../FieldComponents/RequiredStar";
import SelectInput from "../FieldComponents/SelectInput";
import Display from "../FieldComponents/Display";
import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/contexts";
import { POPULATE_ADDITIONAL_FILTERS } from "src/actions/AppContextActions";
import { secsToDate } from "src/utility";

const FieldSingle: React.FC<FieldSingleProps> = (props) => {
  const {
    link,
    tableId,
    tableFilters,
    label,
    inputType,
    value,
    onChange,
    onEnterPress,
    columnSize = 3,
    required = false,
    isSingleLineInput = false,
    numDigits = 6,
    disabled = false,
    isInvalid = false,
    defaultOption = "NONE",
    selectOptions = [],
    maxLength = 10,
    isAutocomplete = false,
    allowMultiple = false,
    hide = false,
    onClick,
    ref,
    errorMessage,
  } = props;
  const { dispatch } = useContext<any>(AppContext);
  const navigate = useNavigate();
  const getInput = (inputType?: string) => {
    switch (inputType) {
      case "textInput":
        return (
          <TextInput
            ref={ref}
            onClick={(e) => onClick?.(e)}
            isInvalid={isInvalid}
            type="text"
            value={value}
            onEnterPress={onEnterPress}
            onChange={onChange}
            disabled={disabled}
          />
        );
      case "dateInput":
        return (
          <TextInput
            isInvalid={isInvalid}
            type="date"
            value={value}
            onChange={handleDateInputChange}
            disabled={disabled}
          />
        );
        case "dateTimeInput":
          return (
            <TextInput
              isInvalid={isInvalid}
              type="datetime-local"
              value={value}
              onChange={handleDateTimeInputChange}
              disabled={disabled}
            />
          );
      case "timeInput":
        return (
          <TextInput
            isInvalid={isInvalid}
            type="time"
            value={value}
            onChange={handleTimeInputChange}
            disabled={disabled}
          />
        );
      case "passwordInput":
        return <TextInput type="password" value={value} onChange={onChange} />;
      case "selectInput":
        return (
          <SelectInput
            allowMultiple={allowMultiple}
            isAutocomplete={isAutocomplete}
            isInvalid={isInvalid}
            onChange={onChange}
            value={value}
            disabled={disabled}
            defaultOption={defaultOption}
            selectOptions={selectOptions}
          />
        );
      case "switchInput":
        return (
          <SwitchInput
            size="sm"
            isDisabled={disabled}
            isChecked={value}
            onChange={(e) => onChange?.(e.target.checked)}
          />
        );
      case "pinInput":
        return (
          <PinInput numDigits={numDigits} value={value} onChange={onChange} />
        );
      case "text":
        return <Display type="plain" value={value} maxLength={maxLength} />;
      case "link":
        return (
          <Display
            type="link"
            link={link}
            value={value}
            maxLength={maxLength}
          />
        );
      case "linkButton":
        return (
          <Display
            type="linkButton"
            link={link}
            value={value}
            maxLength={maxLength}
          />
        );
      case "filterAndLink":
        return (
          <Display
            type="filterAndLink"
            link={link}
            value={value}
            maxLength={maxLength}
          />
        );
      case "eventButton":
        return (
          <Display type="eventButton" value={value} maxLength={maxLength} />
        );

      default:
        return <div>No Inputs Found</div>;
    }
  };

  const handleDateInputChange = (value: any) => {
    onChange?.(secsToDate(new Date(value).getTime() / 1000));
  };

  const handleTimeInputChange = (value: any) => {
    onChange?.(value);
  };

  const handleDateTimeInputChange = (value: any) => {
   onChange?.(value?.replace('T', ' '));
  };

  const getClassName = useCallback(() => {
    const buttonInputs = ["linkButton", "filterAndLink", "eventButton"];
    let clsNameStr = `field-input my-2 ${
      !isSingleLineInput ? `col-${columnSize}` : ""
    } `;
    if (buttonInputs.includes(inputType ?? "")) {
      clsNameStr = clsNameStr + " linkButton";
    }
    return clsNameStr;
  }, [columnSize, isSingleLineInput, inputType]);

  const handleLinkButtonClick = useCallback(() => {
    switch (inputType) {
      case "linkButton":
        navigate(link ?? "");
        return;
      case "filterAndLink":
        dispatch({
          type: POPULATE_ADDITIONAL_FILTERS,
          payload: {
            link: `${link}#${tableId}`,
            tableId,
            filters: tableFilters,
          },
        });
        return;
      case "eventButton":
        onChange?.("NO-VAL");
        return;
    }
  }, [link, inputType, tableId, tableFilters]);

  if (hide) {
    return <></>;
  }

  return (
    <div className={getClassName()} onClick={handleLinkButtonClick}>
      <FormControl  isInvalid={isInvalid}>
        {isSingleLineInput ? (
          <div className="d-flex flex-direction-row ">
            <FormLabel className="mb-0 py-1">
              {label}
              <RequiredStar required={required} />
            </FormLabel>
            {getInput(inputType)}
          </div>
        ) : (
          <div className="field-input">
            <FormLabel>
              {label}
              <RequiredStar required={required} />
            </FormLabel>
            {getInput(inputType)}
            {isInvalid && errorMessage && (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>  
        )}
          </div>
        )}
      </FormControl>
    </div>
  );
};

export default FieldSingle;
