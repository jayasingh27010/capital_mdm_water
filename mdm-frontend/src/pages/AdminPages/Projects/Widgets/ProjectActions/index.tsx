import { Divider, IconButton, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions";
import { useApi } from "src/api";
import { viewProjectActions } from "src/api/Pages/Projects";
import { createProject } from "src/api/Project";
import ActionMenu from "src/components/ActionMenu/ActionMenu";
import ActionModal from "src/components/ActionModal";
import Card from "src/components/Card";
// import FieldList from "src/components/FieldList";
import FieldList from "src/components/FieldListWithGuide";
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader";
import { AppContext } from "src/contexts";
import { isActionModalOpen, useSelector } from "src/selectors";
import { convertObjectToList } from "src/utility";
import "react-datepicker/dist/react-datepicker.css";
import Button from "src/components/Button";
import Table from "src/components/Table";
import Colors from "src/Colors";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { v4 as uuid } from 'uuid';

/*
OUTGOING DATA
{
    "userType": "OTHER",
    "selectedHolidays": [
        "2024-10-23T18:30:00.000Z"
    ],
    "startTimes": [
        "2024-10-22T05:00:00.043Z"
    ],
    "endTimes": [
        "2024-10-22T05:15:00.074Z"
    ],
    "projectAddress": "Project Add 2",
    "projectName": "P2",
    "projectCode": "PC-2",
    "billingType": "kwh"
}
*/

const INIT_ADD_HOLIDAY_FIELDS = {
  order: [
    "holiday"
  ],
  holiday: {
    label: "Holiday",
    columnSize: 6,
    inputType: "dateInput",
  }
}

const INIT_HAPPY_HOURS_FIELDS = {
  order: [
    "startTime",
    "endTime"
  ],
  startTime: {
    label: "Start Time",
    columnSize: 6,
    inputType: "timeInput"
  },
  endTime: {
    label: "End Time",
    columnSize: 6,
    inputType: "timeInput"
  }
}

const holidayTableId = "holidayTable"
const happyHoursTableId = "happyHoursTable"
const addProjectsLoadingToast = "addProjectsLoadingToastId"

const ProjectActions: React.FC = () => {
  const { data, isLoading } = useApi(viewProjectActions);
  const [actions, setActions] = useState<any[]>([]);
  const [fieldData, setFieldData] = useState<any>({});
  const [action, setAction] = useState<any>(undefined);
  const [holidays, setHolidays] = useState<string[]>([])
  const [holidayFieldData, setHolidayFieldData] = useState<any>({})
  const [addHolidayFields] = useState<any>(INIT_ADD_HOLIDAY_FIELDS)
  const [happyHours, setHappyHours] = useState<any[]>([])
  const [happyHoursFieldData, setHappyHoursFieldData] = useState<any>({})
  const [happyHoursFields] = useState<any>(INIT_HAPPY_HOURS_FIELDS)
  const [editHappyHours, setEditHappyHours] = useState<any>(undefined)

  const refreshHolidayTable = () => {
    dispatch({
      type: INIT_TABLE,
      payload: holidayTableId
    })
  }

  const refreshHappyHoursTable = () => {
    dispatch({
      type: INIT_TABLE,
      payload: happyHoursTableId
    })
  }
  const { dispatch } = useContext<any>(AppContext);
  const selector = useSelector();
  const isOpen = selector(isActionModalOpen("createProject"));

  const toast = useToast();

  useEffect(() => {
    if (!isLoading && data) {
      const actions = convertObjectToList(data?.config?.actions);
      setActions(actions);
      if (actions.length > 0) {
        setAction(actions[0]);
      }
    }
  }, [data, isLoading]);

  const handleChange = (fieldId: string, value: any) => {
    setFieldData((prevData: any) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const handleChangeHoliday = (fieldId: string, value: any) => {
    setHolidayFieldData((prevData: any) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const handleChangeHappyHours = (fieldId: string, value: any) => {
    setHappyHoursFieldData((prevData: any) => ({
      ...prevData,
      [fieldId]: value,
    }))
  }


  const createProjectPromise = useCallback(() => {
    toast({
      id: addProjectsLoadingToast,
        status: 'loading',
        title: 'Adding project ...',
        duration: null
    })
    return new Promise((resolve, reject) => {
      const trimmedFieldData = {
        ...fieldData,
        holidays,
        happyHours,
        projectName: fieldData?.projectName?.trim(),
        projectAddress: fieldData?.projectAddress?.trim(),
    };
      createProject(trimmedFieldData)
        .then(() => {
          toast({
            title: 'Success',
            description: 'Project Added Successfully',
            status: 'success'
          })
          dispatch({
            type: CLOSE_ACTION_MODAL,
            payload: action?.id,
          });
          dispatch({
            type: INIT_TABLE,
            payload: "allProjectsTable",
          });
          setFieldData({}); // Reset selected dates
          resolve({});
        })
        .catch(e => {
          console.log(e)
          toast({
              title: 'Error',
              description: e.response.data.message,
              status: 'error',
          })
          reject({});
        })
        .finally(() => {
          toast.close(addProjectsLoadingToast)
        })
    });
  }, [fieldData, holidays, happyHours]);

  const handleSubmit = useCallback(() => {
    createProjectPromise()
  }, [createProjectPromise]);

  const validations = useCallback(
    (fieldId: string) => {
      let isValid = true;
      let errorMessage = "";
      const re = /[^a-zA-Z0-9-_ ]/g;
      const reprojectName = /[^a-zA-Z0-9 ]/g;
      const validationMap: Record<string, boolean> = {
        projectAddress:
          fieldData.hasOwnProperty("projectAddress") &&
          (!fieldData.projectAddress || re.test(fieldData.projectAddress) || fieldData.projectAddress.length > 250),
        projectName:
          fieldData.hasOwnProperty("projectName") &&
          (!fieldData.projectName || reprojectName.test(fieldData.projectName) || fieldData.projectName.length > 50),
        projectCode:
          fieldData.hasOwnProperty("projectCode") &&
          (!fieldData.projectCode || re.test(fieldData.projectCode) || String(fieldData.projectCode ?? "").length < 3 || fieldData.projectCode.length > 16),
        billingType: fieldData.billingType && fieldData.billingType === "-",
      };
      if (validationMap[fieldId]) {
        isValid = false;
        switch (fieldId) {
          case "projectAddress":
            errorMessage = "Only AlphaNumerics with '-' and '_' Allowed (MAX - 250 characters)";
            break;
          case "projectName":
            errorMessage = "Only AlphaNumerics Allowed (MAX - 50 characters)";
            break;
          case "projectCode":
            errorMessage = "Project Code cannot be '-'";
            break;
          case "billingType":
            errorMessage = "Billing Type cannot be '-'";
            break;
         
          default:
            errorMessage = `Invalid input for ${fieldId}`;
            break;
        }
      }
      // return validationMap?.[fieldId] ?? false;
      return { isValid, errorMessage };
    },
    [fieldData]
  );

  const holidayValidations = useCallback(
    (fieldId: string) => {
      let isValid = true;
      let errorMessage = "";
      const validationMap: Record<string, boolean> = {
        holiday: holidayFieldData.hasOwnProperty("holiday") &&
        (
          !holidayFieldData.holiday ||
          holidays.includes(new Date(holidayFieldData.holiday).toISOString())
        )
      };
      if (validationMap[fieldId]) {
        isValid = false;
        switch (fieldId) {
          case "holiday":
            errorMessage = "This Date is Already taken, please select different date.";
            break;
                  
          default:
            errorMessage = `Invalid input for ${fieldId}`;
            break;
        }
      }
      // return validationMap?.[fieldId] ?? false;
      return { isValid, errorMessage };
    },
    [holidayFieldData, holidays]
  );

  const happyHoursValidations = useCallback(
    (fieldId: string) => {
      let isValid = true;
      let errorMessage = "";
      const validationMap: Record<string, boolean> = {
        startTime: happyHoursFieldData.hasOwnProperty("startTime") && !happyHoursFieldData.startTime,
        endTime: happyHoursFieldData.hasOwnProperty("endTime") && !happyHoursFieldData.endTime
      };
      if (validationMap[fieldId]) {
        isValid = false;
        switch (fieldId) {
          case "startTime":
            errorMessage = "StartTime cannot be '-'";
            break;
                  
            case "endTime":
            errorMessage = "EndTime can not be '-'";
            break;

          default:
            errorMessage = `Invalid input for ${fieldId}`;
            break;
        }
      }
      // return validationMap?.[fieldId] ?? false;
      return { isValid, errorMessage };
    },
    [happyHoursFieldData]
  );


  const isInvalid = useCallback(() => {
    const re = /[^a-zA-Z0-9-_ ]/g;
    const reprojectName = /[^a-zA-Z0-9 ]/g;
    if (!fieldData.projectName || reprojectName.test(fieldData.projectName) || fieldData.projectName.length > 50) {
      return true;
    }
    if (!fieldData.projectAddress || re.test(fieldData.projectAddress) || fieldData.projectAddress.length > 250) {
      return true;
    }
    if (!fieldData.billingType || fieldData.billingType === "-") {
      return true;
    }
    return false;
  }, [fieldData]);

  const isInvalidHoliday = useCallback(() => {
    if (!holidayFieldData.holiday) {
      return true
    }
    if (holidays.includes(new Date(holidayFieldData.holiday).toISOString())) {
      return true
    }
    return false;
  }, [holidayFieldData, holidays]);

  const isInvalidHappyHours = useCallback(() => {
    if (!happyHoursFieldData.startTime) {
      return true
    }
    if (!happyHoursFieldData.endTime) {
      return true
    }
    return false;
  }, [happyHoursFieldData]);

  useEffect(() => {
    if (isOpen) {
      setFieldData({});

      setHolidays([])
      setHolidayFieldData({})
      refreshHolidayTable()

      setHappyHours([])
      setHappyHoursFieldData({})
      refreshHappyHoursTable()
    }
  }, [isOpen]);

  const handleAddNewHoliday = useCallback(() => {
    setHolidays((prevHolidays) => {
      return [
        ...prevHolidays,
        new Date(holidayFieldData.holiday).toISOString()
      ]
    })
    setHolidayFieldData({})
    refreshHolidayTable()
  }, [holidayFieldData])

  const handleHolidayDelete = (row: any) => {
    setHolidays((holidays) => {
      return holidays.filter(holiday => holiday !== row.id)
    })
    refreshHolidayTable()
  }

  const setHappyHoursEditMode = (row: any) => {
    setEditHappyHours(row.id)
    setHappyHoursFieldData(row)
  }

  const handleAddHappyHours = useCallback(() => {
    if (editHappyHours) {
      setHappyHours(happyHours => {
        return happyHours.map(row => {
          if (row.id === editHappyHours) {
            return {
              ...row,
              ...happyHoursFieldData
            }
          }
          return row
        })
      })
      setEditHappyHours(undefined)
    } else {
      setHappyHours((happyHours) => {
        return [
          ...happyHours,
          {
            id: uuid(),
            ...happyHoursFieldData
          }
        ] 
      })
    }
    refreshHappyHoursTable()
    setHappyHoursFieldData({})
  }, [happyHoursFieldData, editHappyHours])

  useEffect(() => {
    refreshHappyHoursTable()
  }, [happyHours])

  const handleRemoveHappyHours = useCallback(() => {
    setHappyHours((happyHours) => {
      return happyHours.filter(row => row.id !== editHappyHours)
    })
    setEditHappyHours(undefined)
    refreshHappyHoursTable()
    setHappyHoursFieldData({})
  }, [editHappyHours])

  const apiReference = useCallback((_: any): Promise<any> => {
    let rows: any[] = JSON.parse(JSON.stringify(holidays))
    rows = rows.map(row => {
      return ({
        id: row,
        holiday: new Date(row).toLocaleDateString()
      })
    }).sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime())

    return new Promise((resolve) => {
        resolve({
            columns: {
                order: [
                    "holiday",
                    "action"
                ],
                holiday: {
                  label: "Holiday",
                  renderType: "text",
                },
                action: {
                    label: "Action",
                    renderType: "customComponent",
                    render: (row: any) => {
                        return (
                          <IconButton
                              aria-label="delete-btn"
                              onClick={() => handleHolidayDelete(row)}
                              icon={
                                  <DeleteIcon />
                              } />
                        )
                    }
                }
            },
            rowData: rows,
            totalRecords: rows.length
        })
    })
  }, [holidays])

  const apiReferenceHappyHours = useCallback((_: any): Promise<any> => {
    let rows: any[] = JSON.parse(JSON.stringify(happyHours))

    return new Promise((resolve) => {
        resolve({
            columns: {
                order: [
                    "startTime",
                    "endTime",
                    "action"
                ],
                startTime: {
                  label: "Start Time",
                  renderType: "text",
                },
                endTime: {
                  label: "End Time",
                  renderType: "text",
                },
                action: {
                    label: "Action",
                    renderType: "customComponent",
                    render: (row: any) => {
                        return (
                          <IconButton
                              aria-label="edit-btn"
                              onClick={() => setHappyHoursEditMode(row)}
                              icon={
                                <EditIcon/>
                              } />
                        )
                    }
                }
            },
            rowData: rows,
            totalRecords: rows.length
        })
    })
  }, [happyHours])

  return (
    <Card>
      <div className="widget widget-user-actions">
        {/* {isLoading && <WidgetSkeletonLoader numLines={2} />} */}
        {!isLoading && data && (
          <ActionMenu actions={actions} label={"User Actions"} />
        )}
      </div>
      {action && (
        <ActionModal
          key={action.id}
          label={action.label}
          onOk={handleSubmit}
          isOkDisabled={isInvalid()}
          actionModalId={action.id}
        >

          <FieldList
            validations={validations}
            onChange={handleChange}
            data={fieldData}
            fields={convertObjectToList(action.fields)}
          />

          <>
            <Divider />
            <div className="p-3" style={{ backgroundColor: "#fafafa" }}>
                <h4 className="ms-3">Holidays</h4>
                <FieldList
                    validations={holidayValidations}
                    onChange={handleChangeHoliday}
                    data={holidayFieldData}
                    fields={convertObjectToList(addHolidayFields)}
                />
                <Button
                    disabled={isInvalidHoliday()}
                    bgColor={Colors.primary}
                    color={Colors.primaryNegative}
                    size="sm"
                    className="ms-3"
                    onClick={handleAddNewHoliday}
                >
                    Add New Holiday
                </Button>
                <div className="p-3">
                    {holidays.length === 0 &&
                        <>
                            <h3>No Holidays Added...</h3>
                            <p>Click On "Add New Holiday" Button To Add A New Holday</p>
                        </>
                    }
                    {holidays.length !== 0 &&
                        <Table
                          customHeight="375px"
                          tableId={holidayTableId}
                          defaultFilters={{
                              perPage: 5,
                              currPage: 1
                          }}
                          noFooter={true}
                          apiReference={apiReference} />}
                </div>
            </div>
            <Divider />
          </>
          <>
            <Divider />
            <div className="p-3" style={{ backgroundColor: "#fafafa" }}>
                <h4 className="ms-3">{editHappyHours ? 'Edit': 'Add'} Happy Hours</h4>
                <FieldList
                    validations={happyHoursValidations}
                    onChange={handleChangeHappyHours}
                    data={happyHoursFieldData}
                    fields={convertObjectToList(happyHoursFields)}
                />
                <Button
                    disabled={isInvalidHappyHours()}
                    bgColor={Colors.primary}
                    color={Colors.primaryNegative}
                    size="sm"
                    className="ms-3"
                    onClick={handleAddHappyHours}
                >
                  {editHappyHours ? 'Edit': 'Add'} Happy Hours
                </Button>
                {editHappyHours &&
                    <Button
                        bgColor="red"
                        color={Colors.primaryNegative}
                        size="sm"
                        className="ms-1"
                        onClick={handleRemoveHappyHours}
                    >
                      Remove Happy Hour
                    </Button>
                }
                <div className="p-3">
                    {happyHours.length === 0 &&
                        <>
                            <h3>No Happy Hours Added...</h3>
                            <p>Click On "Add Happy Hours" Button To Add Happy Hours</p>
                        </>
                    }
                    {happyHours.length !== 0 &&
                        <Table
                          customHeight="375px"
                          tableId={happyHoursTableId}
                          defaultFilters={{
                              perPage: 5,
                              currPage: 1
                          }}
                          noFooter={true}
                          apiReference={apiReferenceHappyHours} />}
                </div>
            </div>
            <Divider />
          </>
        </ActionModal>
      )}
    </Card>
  );
};

export default ProjectActions;
