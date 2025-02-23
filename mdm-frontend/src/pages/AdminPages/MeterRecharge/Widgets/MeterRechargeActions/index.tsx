import { useCallback, useContext, useEffect, useState } from "react";
import { Card, useToast } from "@chakra-ui/react";
import { AppContext } from "src/contexts";
import { useApi } from "src/api";
import { convertObjectToList } from "src/utility";
import {
  
  createManualRecharge,
} from "src/api/MeterRecharge";
import {viewManualRechargeData, getMeterSerialNo} from "src/api/Pages/meterRecharge"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions";
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader";
import ActionMenu from "src/components/ActionMenu/ActionMenu";
import ActionModal from "src/components/ActionModal";
// import FieldList from "src/components/FieldList";
import FieldList from "src/components/FieldListWithGuide";
import AddCreditNoteAction from "src/actionComponents/AddCreditNote";
import AddDebitNoteAction from "src/actionComponents/AddDebitNote";

import { MeterValueResponse } from "./MeterValueResponse";

export const meterRechargeActions: React.FC = () => {
  const { data, isLoading } = useApi(viewManualRechargeData);
  
  const [actions, setActions] = useState<any[]>([]);
  const [addManualRecharge, setAddManualRecharge] = useState<any>(undefined);
  const [addCreditNote, setaddCreditNote] = useState<any>(undefined);
  const [addDebitNote, setaddDebitNote] = useState<any>(undefined);
  const [fieldData, setFieldData] = useState<any>({});
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const { dispatch } = useContext<any>(AppContext);
  const toast = useToast();
  const isOpen = true; // Ensure this is true when modal is open

  // Fetch data and initialize actions
  useEffect(() => {
    if (!isLoading && data) {
      const actions = convertObjectToList(data?.config?.actions);
      setActions(actions);
      setAddManualRecharge(
        actions.find((action) => action.id === "manualRecharge")
      );
      setaddCreditNote(actions.find((action) => action.id === "creditNote"));
      setaddDebitNote(actions.find((action) => action.id === "debitNote"));
    }
  }, [data, isLoading]);

  // Reset the form data when the modal opens
  useEffect(() => {
    setFieldData({});
    setSelectedMethod(""); // Reset selectedMethod when modal opens
  }, [isOpen]);

  // Handle changes to form fields
  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    const updatedObj = {
      [fieldId]: value,
    }
    if (fieldId === 'crnNo') {
      updatedObj.meter = addManualRecharge?.fields?.crnNo?.selectOptions?.find((option: any) => option.value == value)?.meterSerialNo ?? "-"
      updatedObj.consumer = value ?? "-"
    }

    if (fieldId === 'meter') {
      const consumerId = addManualRecharge?.fields?.meter?.selectOptions?.find((option: any) => option.value == value)?.consumerId ?? "-"
      updatedObj.crnNo = consumerId
      updatedObj.consumer = consumerId
    }

    if (fieldId === 'consumer') {
      updatedObj.meter = addManualRecharge?.fields?.consumer?.selectOptions?.find((option: any) => option.value == value)?.meterSerialNo ?? "-"
      updatedObj.crnNo = value ?? "-"
    }
    setFieldData((prevData: any) => ({
      ...prevData,
      ...updatedObj
    }));

    // Check if the method field is being changed and update selectedMethod
    if (fieldId === "method") {
      setSelectedMethod(value);
    }
  }, [addManualRecharge]);

  useEffect(() => {
    if (fieldData?.consumer && fieldData?.consumer !== "-") {
      handleConsumerSelect(fieldData?.consumer)
    }
  }, [fieldData?.consumer])

  // const handleMethodSelect = useCallback(async (methodValue: string) => {
  //   try{

  //   }catch(error){
  //     console.error("Error fetching meter serial number:", error);
  //   }
  // })

  const handleConsumerSelect = useCallback(async (consumerId: string) => {
    try {
      // Explicitly type the response as MeterResponse
      const data1: MeterValueResponse = await getMeterSerialNo(consumerId);
      console.log("Meter value fetched:", data1);
      if (data1) {
        setFieldData((prevData: any) => ({
          ...prevData,
          // meter: data1.meterSerialNo, // Ensure the meter serial number is set from meterValue.data
          availableBalance: data1.current_balance,
        }));
      }
    } catch (error) {
      console.error("Error fetching meter serial number:", error);
    }
  }, []);


  const filteredFields = addManualRecharge
    ? convertObjectToList(addManualRecharge.fields).map((field) => {
        if (field.id === "checqueNo" || field.id === "checqueDate" || field.id === "bankName") {
          field.hide = selectedMethod !== "cheque";
        }
        else {
          field.hide = false; // Show all other fields
        }
        return field;
      })
    : [];

  const handleSubmit = useCallback(() => {
    const manualRechargePromise = new Promise((resolve, reject) => {
      console.log(fieldData);
      createManualRecharge(fieldData)
        .then(() => {
          dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: addManualRecharge?.id,
          });
          dispatch({
            type: INIT_TABLE,
            payload: "manualRechargeTable",
          });
          setFieldData({});
          resolve({});
        })
        .catch(() => {
          reject({});
        });
    });

    toast.promise(manualRechargePromise, {
      success: {
        title: "Manual Recharge Added",
        description: "Manual Recharge added successfully",
        duration: 3000,
      },
      loading: { title: "Adding Manual Recharge..." },
      error: {
        title: "Oops!",
        description: "Something went wrong",
        duration: 3000,
      },
    });
  }, [fieldData]);


  const isValidAmount = (amtStr: string) => {
    const amtPieces = (amtStr ?? "").split(".")
    const beforeDecimal = amtPieces?.[0] ?? ""
    const afterDecimal = amtPieces?.[1] ?? ""
    if (beforeDecimal.length > 6 || afterDecimal.length > 2) {
      return false
    }
    if (isNaN(parseInt(amtStr)) || !/^\d+$/.test(amtStr.split(".").join("")) || amtStr.split(".").length > 2) {
      return false
    }
    if (amtStr === "0") {
      return false
    }
    return true
  }

  const isInvalid = useCallback(() => {
    if (!fieldData.crnNo || fieldData.crnNo === "-") {
      return true
    }
    if (!fieldData.consumer || fieldData.consumer === "-") {
      return true
    }
    if (!fieldData.meter || fieldData.meter === "-") {
      return true
    }
    if (!fieldData.method || fieldData.method === "-") {
      return true
    }
    if (fieldData.method === "cheque") {
      if (!fieldData.checqueNo || fieldData.checqueNo.length !== 6 || !/^\d+$/.test(fieldData.checqueNo)) {
        return true
      }
      if (!fieldData.checqueDate) {
        return true
      }
      if (!fieldData.bankName || fieldData.bankName === "-") {
        return true
      }
    }
    if (String(fieldData.amount ?? "").length === 0 || !isValidAmount(fieldData.amount)) {
      return true
    }
    return false
}, [fieldData])

  const validations = useCallback((fieldId: string) => {
    let isValid = true;
    let errorMessage = "";
    const validationMap: Record<string, boolean> = {
      crnNo: fieldData.hasOwnProperty("crnNo") && fieldData.crnNo === "-",
      consumer: fieldData.hasOwnProperty("consumer") && fieldData.consumer === "-",
      meter: fieldData.hasOwnProperty("meter") && fieldData.meter === "-",
      method: fieldData.hasOwnProperty("method") && fieldData.method === "-",
      bankName: fieldData.hasOwnProperty("bankName") && (!fieldData.bankName || fieldData.bankName === "-"),
      checqueNo: fieldData.hasOwnProperty("checqueNo") && (!fieldData.checqueNo || fieldData.checqueNo.length !== 6 || !/^\d+$/.test(fieldData.checqueNo)),
      checqueDate: fieldData.hasOwnProperty("checqueDate") && !fieldData.checqueDate,
      amount: fieldData.hasOwnProperty("amount") && (String(fieldData.amount ?? "").length === 0 || !isValidAmount(fieldData.amount))
    }
    if (validationMap[fieldId]) {
      isValid = false;
      switch (fieldId) {
        case "crnNo":
          errorMessage = "CRN cannot be '-'";
          break;
        case "consumer":
          errorMessage = "Consumer cannot be '-'";
          break;
        case "meter":
          errorMessage = "Meter cannot be '-'";
          break;
        case "method":
          errorMessage = "Method cannot be '-'";
          break;
        case "bankName":
          errorMessage = "Bank name is required";
          break;
        case "checqueNo":
          errorMessage = "Cheque number must be 6 digits";
          break;
        case "checqueDate":
          errorMessage = "Cheque date is required";
          break;
        case "amount":
          errorMessage = "Amount is invalid";
          break;
        default:
          errorMessage = `Invalid input for ${fieldId}`;
          break;
      }
    }
    // return validationMap?.[fieldId] ?? false
    return { isValid, errorMessage };
}, [fieldData])

  return (
    <Card className="p-3">
      <div className="widget widget-user-actions">
        {/* {isLoading && <WidgetSkeletonLoader numLines={3} />} */}
        {!isLoading && data && (
          <ActionMenu actions={actions} label={"Meter Recharge"} />
        )}
      </div>

      {addCreditNote && <AddCreditNoteAction action={addCreditNote} />}
      {addDebitNote && <AddDebitNoteAction action={addDebitNote} />}
      {addManualRecharge && (
        <ActionModal
          key={addManualRecharge.id}
          label={addManualRecharge.label}
          onOk={handleSubmit}
          isOkDisabled={isInvalid()}
          actionModalId={addManualRecharge.id}
        >
          <FieldList
            validations={validations}
            onChange={handleFieldChange}
            data={fieldData}
            fields={filteredFields}
          />
        </ActionModal>
      )}
    </Card>
  );
};
