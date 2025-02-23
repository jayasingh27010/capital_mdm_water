import { Divider, IconButton, useToast } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import Card from "src/components/Card"
// import FieldList from "src/components/FieldList"
import FieldList from "src/components/FieldListWithGuide"
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader"
import { Field } from "src/types"
import { convertObjectToList } from "src/utility"
import { SVGIcon } from "src/assets/SvgIcons/IconMap"
import { deleteProject, disableProject, editProject, enableProject, viewProjectDetails } from "src/api/Project"
import { isActionModalOpen, useSelector } from "src/selectors"
import ActionModal from "src/components/ActionModal"
import ActionMenu from "src/components/ActionMenu/ActionMenu"
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions"
import { AppContext } from "src/contexts"
import GuideMessage from "src/components/GuideMessage"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { v4 as uuid } from 'uuid';
import Table from "src/components/Table"
import Button from "src/components/Button"
import Colors from "src/Colors"


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

const holidayTableId = "editHolidayTable"
const happyHoursTableId = "editHappyHoursTable"

const ProjectDetails: React.FC = () => {
    const [id, setId] = useState<any>(undefined)
    const { dispatch } = useContext<any>(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiData, setApiData] = useState<any>({})
    const [config, setConfig] = useState<any>({})
    const [fields, setFields] = useState<Field[]>([])
    const [actions, setActions] = useState<any>({})
    const [editProjectFieldData, setEditProjectFieldData] = useState<any>({})
    const [editProjectAction, setEditProjectAction] = useState<any>(undefined)
    const [enableProjectAction, setEnableProjectAction] = useState<any>(undefined)
    const [disableProjectAction, setDisableProjectAction] = useState<any>(undefined)
    const [deleteProjectAction, setDeleteProjectAction] = useState<any>(undefined)


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


    const toast = useToast()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const data: any = useLoaderData()
    const selector = useSelector()
    const isOpenEditProject = selector(isActionModalOpen("editProject"))
    useEffect(() => {
        if (data?.config?.id) {
            setId(data?.config?.id)
        }
    }, [data])

    const loadAll = useCallback(() => {
        setIsLoading(true)
        viewProjectDetails(id)
            .then(({ data }: any) => {
                setIsLoading(false)
                setApiData(data?.data)
                const actions = convertObjectToList(data?.config?.actions)
                const editUserAction = actions.find(action => action.id === 'editUser')
                setEditProjectFieldData(editUserAction?.data)
                setFields(convertObjectToList(data.config.fields))
                setConfig(data?.config)
                setActions(actions)
                const editProjectAction = actions.find(action => action.id === 'editProject')
                setEditProjectAction(editProjectAction)
                setEditProjectFieldData(editProjectAction.data)
                setEnableProjectAction(actions.find(action => action.id === 'enableProject'))
                setDisableProjectAction(actions.find(action => action.id === 'disableProject'))
                setDeleteProjectAction(actions.find(action => action.id === 'deleteProject'))
                setIsSuccess(true)
            })
    }, [id])

    useEffect(() => {
        if (id) {
            loadAll()
        }
    }, [id])

    useEffect(() => {
        if (!isOpenEditProject) {
            setEditProjectFieldData(apiData)
        }
    }, [isOpenEditProject])


    const editProjectPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            editProject({
                id,
                ...editProjectFieldData,
                holidays,
                happyHours: happyHours.map(hh => ({
                    startTime: hh.startTime,
                    endTime: hh.endTime
                }))
            })
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: editProjectAction?.id
                    })
                    setIsLoading(true)
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [editProjectFieldData, holidays, happyHours])
    const handleSubmit = useCallback(() => {
        toast.promise(
            editProjectPromise(),
            {
                success: { title: 'Project Edited', description: 'Project Edited Successfully', duration: 3000 },
                loading: { title: 'Editing Project...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000 }
            }
        )
    }, [editProjectPromise])

    const handleChange = (fieldId: string, value: any) => {
        setEditProjectFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

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

    // const holidayValidations = useCallback(
    //     (fieldId: string) => {
    //         const validationMap: Record<string, boolean> = {
    //             holiday: holidayFieldData.hasOwnProperty("holiday") &&
    //                 (
    //                     !holidayFieldData.holiday ||
    //                     holidays.includes(new Date(holidayFieldData.holiday).toISOString())
    //                 )
    //         };
    //         return validationMap?.[fieldId] ?? false;
    //     },
    //     [holidayFieldData, holidays]
    // );

    // const happyHoursValidations = useCallback(
    //     (fieldId: string) => {
    //         const validationMap: Record<string, boolean> = {
    //             startTime: happyHoursFieldData.hasOwnProperty("startTime") && !happyHoursFieldData.startTime,
    //             endTime: happyHoursFieldData.hasOwnProperty("endTime") && !happyHoursFieldData.endTime
    //         };
    //         return validationMap?.[fieldId] ?? false;
    //     },
    //     [happyHoursFieldData]
    // );

    
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
        if (isOpenEditProject) {
            setEditProjectFieldData(editProjectAction?.data ?? {})

            setHolidays(editProjectAction?.data?.holidays?.map((h: any) => h?.holidayDate) ?? [])
            setHolidayFieldData({})
            refreshHolidayTable()

            setHappyHours(editProjectAction?.data?.happyHours ?? [])
            setHappyHoursFieldData({})
            refreshHappyHoursTable()
        }
    }, [isOpenEditProject, editProjectAction]);

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
                                        <EditIcon />
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

    const disableProjectPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            disableProject({ id })
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: disableProjectAction?.id
                    })
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id, disableProjectAction])

    const handleProjectDisableSubmit = useCallback(() => {
        toast.promise(
            disableProjectPromise(),
            {
                success: { title: 'Project Disabled', description: 'Project Disabled Successfully', duration: 3000 },
                loading: { title: 'Disabling Project...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000 }
            }
        )
    }, [disableProjectPromise])

    const enableProjectPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            enableProject({ id })
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: enableProjectAction?.id
                    })
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id, enableProjectAction])

    const handleProjectEnableSubmit = useCallback(() => {
        toast.promise(
            enableProjectPromise(),
            {
                success: { title: 'Project Enabled', description: 'Project Enabled Successfully', duration: 3000 },
                loading: { title: 'Enabling Project...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000 }
            }
        )
    }, [enableProjectPromise])

    const deleteProjectPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            deleteProject({ id })
                .then(() => {
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: deleteProjectAction?.id
                    })
                    loadAll()
                    resolve({})
                })
                .catch(() => {
                    reject({})
                })
        })
    }, [id, enableProjectAction])

    const handleProjectDeleteSubmit = () => {
        toast.promise(
            deleteProjectPromise(),
            {
                success: { title: 'Project Deleted', description: 'Project Deleted Successfully', duration: 3000 },
                loading: { title: 'Deleting Project...', },
                error: { title: 'Oops!', description: 'Some error occured', duration: 3000 }
            }
        )
    }

    const isInvalid = useCallback(() => {
        // const projectAddressRe = /[^a-zA-Z0-9,-_ ]/g
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!editProjectFieldData.projectName || re.test(editProjectFieldData.projectName)) {
            return true
        }
        if (!editProjectFieldData.projectAddress || re.test(editProjectFieldData.projectAddress)) {
            return true
        }
        if (!editProjectFieldData.projectCode || re.test(editProjectFieldData.projectCode)) {
            return true
        }
        if (!editProjectFieldData.billingType || editProjectFieldData.billingType === '-') {
            return true
        }
        return false
    }, [editProjectFieldData])

    // const validations = useCallback((fieldId: string) => {
    //     // const projectAddressRe = /[^a-zA-Z0-9,-_ ]/g
    //     const re = /[^a-zA-Z0-9-_ ]/g
    //     const validationMap: Record<string, boolean> = {
    //         projectAddress: editProjectFieldData.hasOwnProperty("projectAddress") && (!editProjectFieldData.projectAddress || re.test(editProjectFieldData.projectAddress)),
    //         projectName: editProjectFieldData.hasOwnProperty("projectName") && (!editProjectFieldData.projectName || re.test(editProjectFieldData.projectName)),
    //         projectCode: editProjectFieldData.hasOwnProperty("projectCode") && (!editProjectFieldData.projectCode || re.test(editProjectFieldData.projectCode)),
    //         billingType: editProjectFieldData.billingType && editProjectFieldData.billingType === '-',
    //     }
    //     return validationMap?.[fieldId] ?? false
    // }, [editProjectFieldData])

    const validations = useCallback(
        (fieldId: string) => {
          let isValid = true;
          let errorMessage = "";
          const re = /[^a-zA-Z0-9-_ ]/g;
          const reprojectName = /[^a-zA-Z0-9 ]/g;
          const validationMap: Record<string, boolean> = {
            projectAddress:
            editProjectFieldData.hasOwnProperty("projectAddress") &&
              (!editProjectFieldData.projectAddress || re.test(editProjectFieldData.projectAddress) || editProjectFieldData.projectAddress.length > 250),
            projectName:
            editProjectFieldData.hasOwnProperty("projectName") &&
              (!editProjectFieldData.projectName || reprojectName.test(editProjectFieldData.projectName) || editProjectFieldData.projectName.length > 50),
            projectCode:
            editProjectFieldData.hasOwnProperty("projectCode") &&
              (!editProjectFieldData.projectCode || re.test(editProjectFieldData.projectCode) || String(editProjectFieldData.projectCode ?? "").length < 3 || editProjectFieldData.projectCode.length > 16),
            billingType: editProjectFieldData.billingType && editProjectFieldData.billingType === "-",
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
        [editProjectFieldData]
      );
    

    return (
        <Card>
            <div className="widget details-widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2} />} */}
                {!isLoading && isSuccess &&
                    <>
                        <div className="d-flex flex-row justify-content-center">
                            <span className="p-1 pe-2">
                                <SVGIcon iconName="Info" />
                            </span>
                            <p className="flex-grow-1 mb-0" style={{ fontWeight: "700", fontSize: "20px" }}>
                                {config.label}
                            </p>
                            <ActionMenu actions={actions} label={"Project Actions"} />
                        </div>
                        <Divider />
                        <FieldList data={apiData} fields={fields} />
                    </>}
                {editProjectAction &&
                    <ActionModal
                        key={editProjectAction.id}
                        label={editProjectAction.label}
                        onOk={handleSubmit}
                        isOkDisabled={isInvalid()}
                        actionModalId={editProjectAction.id}>
                        <FieldList
                            validations={validations}
                            onChange={handleChange}
                            data={editProjectFieldData}
                            fields={convertObjectToList(editProjectAction.fields)} />
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
                                    {holidays?.length === 0 &&
                                        <>
                                            <h3>No Holidays Added...</h3>
                                            <p>Click On "Add New Holiday" Button To Add A New Holday</p>
                                        </>
                                    }
                                    {holidays?.length !== 0 &&
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
                                <h4 className="ms-3">{editHappyHours ? 'Edit' : 'Add'} Happy Hours</h4>
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
                                    {editHappyHours ? 'Edit' : 'Add'} Happy Hours
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
                                    {happyHours?.length === 0 &&
                                        <>
                                            <h3>No Happy Hours Added...</h3>
                                            <p>Click On "Add Happy Hours" Button To Add Happy Hours</p>
                                        </>
                                    }
                                    {happyHours?.length !== 0 &&
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
                    </ActionModal>}


                {disableProjectAction &&
                    <ActionModal
                        label={disableProjectAction.label}
                        onOk={handleProjectDisableSubmit}
                        isOkDisabled={false}
                        actionModalId={disableProjectAction.id}
                    >
                        <GuideMessage
                            messageType="warning"
                            guideMessage={`Are you sure you want to disable project, '${apiData?.projectName}'?`}
                        />
                    </ActionModal>
                }
                {enableProjectAction &&
                    <ActionModal
                        label={enableProjectAction.label}
                        onOk={handleProjectEnableSubmit}
                        isOkDisabled={false}
                        actionModalId={enableProjectAction.id}
                    >
                        <GuideMessage
                            messageType="warning"
                            guideMessage={`Are you sure you want to enable project, '${apiData?.projectName}'?`}
                        />
                    </ActionModal>
                }
                {deleteProjectAction &&
                    <ActionModal
                        label={deleteProjectAction.label}
                        onOk={handleProjectDeleteSubmit}
                        isOkDisabled={false}
                        actionModalId={deleteProjectAction.id}
                    >
                        <GuideMessage
                            messageType="warning"
                            guideMessage={`Are you sure you want to delete project, '${apiData?.projectName}'?`}
                        />
                    </ActionModal>
                }
            </div>
        </Card>
    )
}

export default ProjectDetails