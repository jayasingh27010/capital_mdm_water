import { useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions";
import { changeTarriff } from "src/api/Pages/Tarrifs";
import ActionModal from "src/components/ActionModal";
import FieldList from "src/components/FieldList";
import { AppContext } from "src/contexts";
import { isActionModalOpen, useSelector } from "src/selectors";
import { convertObjectToList } from "src/utility";
import GuideMessage from "src/components/GuideMessage";

type ChangeTariffActionProps = {
  action: any;
  refresh?: () => void
};

const ChangeTariffAction: React.FC<ChangeTariffActionProps> = ({
  action,
  refresh = () => {}
}) => {
  const toast = useToast();
  const { dispatch } = useContext<any>(AppContext);
  const selector = useSelector();
  const [changeTariffFieldData, setChangeTariffFieldData] = useState<any>({});
  const [changingTariffActions, setChangingTariffActions] = useState<any>(action)
  
  //const [fieldData, setFieldData] = useState<any>({});
  const [originalTarrifGroupOptions, setOriginalTarrifGroupOptions] = useState<
    any[]
  >([]);
  const [originalTarrifOptions, setOriginalTarrifOptions] = useState<any[]>([]);
  const [guideMessage, setGuideMessage] = useState<any>({
    messageType: "info",
    guideMessage: "",
    isLoading: false,
  });
  const isOpen = selector(isActionModalOpen(action.id));
  useEffect(() => {
    if (action?.fields) {
        setOriginalTarrifGroupOptions(action.fields.tarrifGroup.selectOptions || []);
        setOriginalTarrifOptions(action.fields.tarrif.selectOptions || []);
    }
  }, [action]);

  useEffect(() => {
      setChangeTariffFieldData({})
  }, [isOpen])

  const handleChangetariff = useCallback(
    (fieldId: string, value: any) => {
      if (fieldId === "project") {
        const hide = !value || value === "-";
        setChangingTariffActions((action: any) => {
          const updatedAction = { ...action };
  
          // Ensure fields and tarrif exist before modifying hide property
          if (updatedAction?.fields?.tarrif) {
            updatedAction.fields.tarrif.hide = hide;
          }
  
          if (updatedAction?.fields?.tarrifGroup) {
            updatedAction.fields.tarrifGroup.hide = hide;
          }

          if (updatedAction?.fields?.applicableDate) {
            updatedAction.fields.applicableDate.hide = hide;
          }

  
          // Update select options only if they exist
          if (updatedAction?.fields?.tarrif?.selectOptions) {
            updatedAction.fields.tarrif.selectOptions = originalTarrifOptions.filter(
              (opt) => opt.value === "-" || opt.forProject === value
            );
          }
  
          if (updatedAction?.fields?.tarrifGroup?.selectOptions) {
            updatedAction.fields.tarrifGroup.selectOptions = originalTarrifGroupOptions.filter(
              (opt) => opt.value === "-" || opt.forProject === value
            );
          }
  
          return updatedAction;
        });
      }
      setChangeTariffFieldData((changeTariffFieldData: any) => {
        if (fieldId === "tarrifGroup" && changeTariffFieldData?.tarrif) {
          delete changeTariffFieldData.tarrif;
        }
        return {
          ...changeTariffFieldData,
          [fieldId]: value,
        };
      });
    },
    [changingTariffActions, originalTarrifGroupOptions, originalTarrifOptions]
  );

  const changeTariffPromise = useCallback(() => {
    return new Promise((resolve, reject) => {
      changeTarriff(changeTariffFieldData)
        .then(() => {
          dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: action?.id,
          });
          dispatch({
            type: INIT_TABLE,
            payload: "allTarrifsTable",
          });
          dispatch({
            type: INIT_TABLE,
            payload: "allTarrifGroupsTable",
          });
          dispatch({
            type: INIT_TABLE,
            payload: "allAttachTable",
          })
          setChangeTariffFieldData({})
          refresh?.()
          resolve({});
        })
        .catch(() => {
          reject({});
        });
    });
  }, [changeTariffFieldData, refresh]);

  const handleChangeTarrif = useCallback(() => {
    toast.promise(changeTariffPromise(), {
      success: {
        title: "Change Tariff Updated",
        description: "Change Tariff Updated Successfully",
        duration: 3000,
      },
      loading: { title: "Change Tariff Updated..." },
      error: {
        title: "Oops!",
        description: "Some error occured",
        duration: 3000,
      },
    });
  }, [changeTariffPromise])

  const handleGuidesForChangeTariff = useCallback(() => {
    let guideMessage = "";
  
    if (changeTariffFieldData?.tarrifGroup && changeTariffFieldData?.tarrifGroup !== "-") {
      const selectedTarrifGroup = originalTarrifGroupOptions?.find(
        (tG) => tG.value === changeTariffFieldData?.tarrifGroup
      );
      if (!selectedTarrifGroup?.tarrifName) {
        guideMessage = "No Tarrif Selected for this Tarrif Group, Select a Tarrif To Proceed!";
      } else {
        console.log("about to set data again 2")
        if (!changeTariffFieldData.hasOwnProperty("tarrif")) {
          console.log("about to set data again")
          setChangeTariffFieldData((changeTariffFieldData: any) => {
            return {
              ...changeTariffFieldData,
              tarrif: selectedTarrifGroup?.tarrifId,
            };
          });
        }
        
      }
    }
  
    // setChangingTariffActions((action: any) => {
    //   const updatedAction = { ...action };
  
    //   // Ensure fields and tarrif exist before modifying hide property
    //   if (updatedAction?.fields?.tarrif) {
    //     updatedAction.fields.tarrif.hide = hide;
    //   }
  
    //   return updatedAction;
    // });
    const selectedTarrifGroup = originalTarrifGroupOptions?.find(
      (tG) => tG.value === changeTariffFieldData?.tarrifGroup
    );
    console.log("selectedTarrifGroup 2", selectedTarrifGroup, changeTariffFieldData);
    if (selectedTarrifGroup?.tarrifId === changeTariffFieldData?.tarrif && changeTariffFieldData?.tarrifGroup) {
      guideMessage =
        "This Tarrif Group Already has a Tarrif. Select any other Tariff to assign a different value";
    }
    setGuideMessage({
      messageType: "info",
      guideMessage,
      isLoading: false,
    });
  }, [originalTarrifGroupOptions, originalTarrifOptions, changeTariffFieldData]);

  const isInvalid = useCallback(() => {
    const selectedTarrifGroup = originalTarrifGroupOptions?.find(
      (tG) => tG.value === changeTariffFieldData?.tarrifGroup
    );
    
    if (changingTariffActions?.fields?.order?.includes("project")) {
      if (!changeTariffFieldData.project || changeTariffFieldData.project === "-") {
        return true
      }
    }
    if (!selectedTarrifGroup?.tarrifName) {
      return true
    }
    if ((selectedTarrifGroup?.tarrifId === changeTariffFieldData?.tarrif && changeTariffFieldData?.tarrifGroup) ||
    (!changeTariffFieldData.tarrif || changeTariffFieldData.tarrif === "-")) {
      return true
    }
    if (!changeTariffFieldData?.applicableDate || changeTariffFieldData?.applicableDate === "") {
      return true; 
    }
    return false
  }, [changingTariffActions, originalTarrifGroupOptions, changeTariffFieldData])

  useEffect(() => {
    if (changingTariffActions?.fields?.order?.includes("project")) {
      if (!changeTariffFieldData?.project || changeTariffFieldData?.project === "-") {
        setGuideMessage({
          messageType: "info",
          guideMessage: "Select Project To Proceed",
          isLoading: false,
        });
      } else {
        handleGuidesForChangeTariff();
      }
    } else {
      handleGuidesForChangeTariff();
    }
  }, [changingTariffActions, changeTariffFieldData, handleGuidesForChangeTariff]);

  if (action)
    return (
      <ActionModal
        key={changingTariffActions.id}
        label={changingTariffActions.label}
        onOk={handleChangeTarrif}
        isOkDisabled={isInvalid()}
        actionModalId={changingTariffActions.id}
      >
        <GuideMessage
          messageType={guideMessage?.messageType}
          guideMessage={guideMessage.guideMessage}
          isLoading={guideMessage.isLoading}
        />
        <FieldList
          onChange={handleChangetariff}
          data={changeTariffFieldData}
          fields={convertObjectToList(changingTariffActions.fields)}
        />
      </ActionModal>
    );
  return <></>;
};

export default ChangeTariffAction;
