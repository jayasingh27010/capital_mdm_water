import { useToast } from "@chakra-ui/react";
import { AppContext } from "src/contexts";
import { useCallback, useContext, useEffect, useState } from "react";
import { isActionModalOpen, useSelector } from "src/selectors";
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions";
import ActionModal from "src/components/ActionModal";
// import FieldList from "src/components/FieldList";
import FieldList from "src/components/FieldListWithGuide";
import { convertObjectToList } from "src/utility";
import { createDebitNote } from "src/api/MeterRecharge";
import { MeterValueResponse } from "../../pages/AdminPages/MeterRecharge/Widgets/MeterRechargeActions/MeterValueResponse";
import { getMeterSerialNo } from "src/api/Pages/meterRecharge";

type AddDebitNoteActionProps = {
  action: any;
};

const AddDebitNoteAction: React.FC<AddDebitNoteActionProps> = ({ action }) => {
  const toast = useToast();
  const { dispatch } = useContext<any>(AppContext);
  const selector = useSelector();
  const [AddDebitNoteFieldData, setAddDebitNoteFieldData] = useState<any>({});
  const isOpen = selector(isActionModalOpen(action.id));

  

  const addDebitNotePromise = useCallback(() => {
    return new Promise((resolve, reject) => {
      createDebitNote(AddDebitNoteFieldData)
        .then(() => {
          dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: action?.id,
          });
          dispatch({
            type: INIT_TABLE,
            payload: "debitNoteTableId",
          });
          setAddDebitNoteFieldData({});
          resolve({});
        })
        .catch(() => {
          reject({});
        });
    });
  }, [AddDebitNoteFieldData]);

  const handleAddDebitNote = useCallback(() => {
    toast.promise(addDebitNotePromise(), {
      success: {
        title: "Debit Note Added",
        description: " Debit Note created Successfully",
        duration: 3000,
      },
      loading: { title: "Adding Debit Note..." },
      error: {
        title: "Oops!",
        description: "Some error occured",
        duration: 3000,
      },
    });
  }, [addDebitNotePromise]);

  useEffect(() => {
    setAddDebitNoteFieldData({});
  }, [isOpen]);

  // Handle changes to form fields
  const handleFieldChangeDebit = (fieldId: string, value: any) => {
    const updatedObj = {
      [fieldId]: value,
    }
    if (fieldId === 'crnNo') {
      updatedObj.meter = action?.fields?.crnNo?.selectOptions?.find((option: any) => option.value == value)?.meterSerialNo ?? "-"
      updatedObj.consumer = value ?? "-"
    }

    if (fieldId === 'meter') {
      const consumerId = action?.fields?.meter?.selectOptions?.find((option: any) => option.value == value)?.consumerId ?? "-"
      updatedObj.crnNo = consumerId
      updatedObj.consumer = consumerId
    }

    if (fieldId === 'consumer') {
      updatedObj.meter = action?.fields?.consumer?.selectOptions?.find((option: any) => option.value == value)?.meterSerialNo ?? "-"
      updatedObj.crnNo = value ?? "-"
    }
    setAddDebitNoteFieldData((prevData: any) => ({
      ...prevData,
      ...updatedObj
    }));

    // Check if the method field is being changed and update selectedMethod
    if (fieldId === "method") {
      setAddDebitNoteFieldData(value);
    }
  };

  useEffect(() => {
    if (AddDebitNoteFieldData?.consumer && AddDebitNoteFieldData?.consumer !== "-") {
      handleConsumerSelect(AddDebitNoteFieldData?.consumer)
    }
  }, [AddDebitNoteFieldData?.consumer])

  const handleConsumerSelect = useCallback(async (consumerId: string) => {
    try {
      // Explicitly type the response as MeterResponse
      const data1: MeterValueResponse = await getMeterSerialNo(consumerId);
      console.log("Meter value fetched:", data1);
      if (data1 && data1) {
        setAddDebitNoteFieldData((prevData: any) => ({
          ...prevData,
          // meter: data1.meterSerialNo, // Ensure the meter serial number is set from meterValue.data
          availableBalance:data1.current_balance,
        }));
      }
    } catch (error) {
      console.error("Error fetching meter serial number:", error);
    }
  }, []);

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
    if (!AddDebitNoteFieldData.crnNo || AddDebitNoteFieldData.crnNo === "-") {
      return true
    }
    if (!AddDebitNoteFieldData.consumer || AddDebitNoteFieldData.consumer === "-") {
      return true
    }
    if (!AddDebitNoteFieldData.meter || AddDebitNoteFieldData.meter === "-") {
      return true
    }
    if (String(AddDebitNoteFieldData.amount ?? "").length === 0 || !isValidAmount(AddDebitNoteFieldData.amount)) {
      return true
    }
    return false
}, [AddDebitNoteFieldData])

  const validations = useCallback((fieldId: string) => {
    let isValid = true;
    let errorMessage = "";
    const validationMap: Record<string, boolean> = {
      crnNo: AddDebitNoteFieldData.hasOwnProperty("crnNo") && AddDebitNoteFieldData.crnNo === "-",
      consumer: AddDebitNoteFieldData.hasOwnProperty("consumer") && AddDebitNoteFieldData.consumer === "-",
      amount: AddDebitNoteFieldData.hasOwnProperty("amount") && (String(AddDebitNoteFieldData.amount ?? "").length === 0 || !isValidAmount(AddDebitNoteFieldData.amount))
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
        case "amount":
          errorMessage = "Amount is invalid";
          break;
        default:
          errorMessage = `Invalid input for ${fieldId}`;
          break;
      }
    }
    return { isValid, errorMessage };
    // return validationMap?.[fieldId] ?? false
}, [AddDebitNoteFieldData])

  if (action)
    return (
      <ActionModal
        key={action.id}
        label={action.label}
        onOk={handleAddDebitNote}
        isOkDisabled={isInvalid()}
        actionModalId={action.id}
      >
        <FieldList
          onChange={handleFieldChangeDebit}
          data={AddDebitNoteFieldData}
          validations={validations}
          fields={convertObjectToList(action.fields)}
        />
      </ActionModal>
    );
  return <></>;
};

export default AddDebitNoteAction;
