import { EditIcon } from "@chakra-ui/icons";
import { Divider, IconButton, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { CLOSE_ACTION_MODAL, INIT_TABLE } from "src/actions/AppContextActions";
import { createTarrif } from "src/api/Pages/Tarrifs";
import Colors from "src/Colors";
import ActionModal from "src/components/ActionModal";
import Button from "src/components/Button";
// import FieldList from "src/components/FieldList";
import FieldList from "src/components/FieldListWithGuide";
import Table from "src/components/Table";
import { AppContext } from "src/contexts";
import { isActionModalOpen, useSelector } from "src/selectors";
import { convertObjectToList } from "src/utility";
import { v4 as uuid } from "uuid"

const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj))

type CreateTarrifActionProps = {
    action: any;
    editMode?: boolean;
    editId?: boolean;
    viewOnly?: boolean;
    refresh?: () => void
}
const addNewSlabTableId = "addNewSlabTable"
const addNewFixedChargeTableId = "addNewFixedChargeTable"
const INIT_SLAB_FIELDS: any = {
    order: [
        "isFinalSlab",
        "slabType",
        "slabLimit",
        "slabRate",
        "tax1",
        "tax2",
        "tax3"
    ],
    slabType: {
        label: "Slab Type",
        columnSize: 6,
        inputType: "selectInput",
        selectOptions: [
            {
                value: '',
                description: ''
            },
            {
                value: 'dG',
                description: 'DG'
            },
            {
                value: 'grid',
                description: 'Grid'
            }
        ]
    },
    isFinalSlab: {
        label: "Is Final Slab?",
        columnSize: 6,
        isSingleLineInput: true,
        inputType: "switchInput",
        hide: true
    },
    slabLimit: {
        label: "Slab Limit",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    slabRate: {
        label: "Slab Rate",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    tax1: {
        label: "Tax 1%",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    tax2: {
        label: "Tax 2%",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    tax3: {
        label: "Tax 3%",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
}
const INIT_FIXED_CHARGE_FIELDS: any = {
    order: [
        "chargeName",
        "fixedChargeType",
        "charge",
        "tax1",
        "tax2",
        "tax3"
    ],
    chargeName: {
        label: "Charge Name",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    fixedChargeType: {
        label: "Fixed Charge Type",
        columnSize: 6,
        inputType: "selectInput",
        selectOptions: [
            {
                value: '',
                description: ''
            },
            {
                value: 'areaSqft',
                description: 'Area (Sq. ft.)'
            },
            {
                value: 'fixed',
                description: 'Fixed'
            },
            {
                value: 'sanctionedLoad',
                description: 'Sanctioned Load'
            }
        ]
    },
    charge: {
        label: "Charge",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    tax1: {
        label: "Tax 1%",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    tax2: {
        label: "Tax 2%",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
    tax3: {
        label: "Tax 3%",
        columnSize: 6,
        inputType: "textInput",
        hide: true
    },
}
const createTarrifLoadingToast = "createTarrifLoadingToast"
const CreateTarrifAction: React.FC<CreateTarrifActionProps> = ({
    action,
    editMode = false,
    viewOnly = false,
    refresh = () => {}
}) => {
    const toast = useToast()
    const { dispatch } = useContext<any>(AppContext)
    const selector = useSelector()
    const [createTarrifFieldData, setCreateTarrifFieldData] = useState<any>({})
    const [addSlabFields, setAddSlabFields] = useState<any>(INIT_SLAB_FIELDS)
    const [addSlabFieldData, setAddSlabFieldData] = useState<any>({})
    const [fixedChargeFields, setFixedChargeFields] = useState<any>(INIT_FIXED_CHARGE_FIELDS)
    const [fixedChargeFieldData, setFixedChargeFieldData] = useState<any>({})
    const [fixedCharges, setFixedCharges] = useState<any[]>([])
    const [editingFixedChargeId, setEditingFixedChargeId] = useState<any>(undefined)
    const [slabs, setSlabs] = useState<any[]>([])
    const [editingSlab, setEditingSlab] = useState<any>(undefined)
    const isCreateTarrifOpen = selector(isActionModalOpen("createTarrif"))
    const isViewTarrifOpen = selector(isActionModalOpen("viewTarrif"))
    const isDuplicateTarrifOpen = selector(isActionModalOpen("duplicateTarrif"))
    const [createTarrifAction, setCreateTarrifAction] = useState<any>(undefined)

    useEffect(() => {
        setCreateTarrifAction(action)
    }, [action])


    const handleChangeAddTarrif = (fieldId: string, value: any) => {
        if (fieldId === 'unitOrSlab') {
            setCreateTarrifAction((action: any) => {
                if (action) {
                    const hide: boolean = value !== 'unit'
                    action.slabFields.volumeUnitRate.hide = hide
                    action.slabFields.volumeUnitTax1.hide = hide
                    action.slabFields.volumeUnitTax2.hide = hide
                    action.slabFields.volumeUnitTax3.hide = hide
                }
                return action
            })
        }
        if (fieldId === 'containsFixedCharges') {
            setCreateTarrifAction((action: any) => {
                if (action) {
                    const hide: boolean = !value
                    action.fields.fixedChargeCalculationType.hide = hide
                    action.fields.fixedChargeDeductionTime.hide = hide
                }
                return action
            })
        }
        setCreateTarrifFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

    const handleChangeAddSlab = (fieldId: string, value: any) => {
        if (fieldId === 'slabType') {
            setAddSlabFields((fields: any) => {
                if (fields) {
                    const hide: boolean = !value || value === '-'
                    fields.slabRate.hide = hide
                    fields.isFinalSlab.hide = hide
                    fields.slabLimit.hide = hide
                    fields.tax1.hide = hide
                    fields.tax2.hide = hide
                    fields.tax3.hide = hide
                }
                return fields
            })
        }
        if (fieldId === 'isFinalSlab') {
            setAddSlabFields((fields: any) => {
                if (fields) {
                    fields.slabLimit.hide = value
                }
                return fields
            })
        }
        setAddSlabFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }


    const createTarrifPromise = useCallback(() => {
        console.log("payload", {
            ...createTarrifFieldData,
            slabs,
            fixedCharges
        })
        return new Promise((resolve, reject) => {
            toast({
                id: createTarrifLoadingToast,
                status: 'loading',
                title: 'Adding Tarrif ...',
                duration: null
            })

            const trimmedFieldData = {
                ...createTarrifFieldData,
                slabs,
                fixedCharges,
                tarrifName: createTarrifFieldData?.tarrifName?.trim(),
                tarrifDescription: createTarrifFieldData?.tarrifDescription?.trim(),
            };
            createTarrif(trimmedFieldData)
                .then(() => {
                    toast({
                        title: 'Success',
                        description: 'Tarrif Added Successfully',
                        status: 'success'
                    })
                    dispatch({
                        type: CLOSE_ACTION_MODAL,
                        payload: action?.id
                    })
                    dispatch({
                        type: INIT_TABLE,
                        payload: "allTarrifsTable",
                    });
                    dispatch({
                        type: INIT_TABLE,
                        payload: "allTarrifGroupsTable",
                    });
                    refresh?.()
                    resolve({})
                })
                .catch((e: any) => {
                    toast({
                        title: 'Error',
                        description: e.response.data.message,
                        status: 'error'
                    })
                    reject({})
                })
                .finally(() => {
                    toast.close(createTarrifLoadingToast)
                })
        })
    }, [createTarrifFieldData, slabs, fixedCharges, refresh])

    const handleAddTarrif = useCallback(() => {
        createTarrifPromise()
    },[createTarrifPromise])

    useEffect(() => {
        if (!editMode) {
            handleChangeAddTarrif('unitOrSlab', '')
            handleChangeAddTarrif('containsFixedCharges', false)
            handleChangeAddSlab('isFinalSlab', false)
            handleChangeAddSlab('slabType', '')
            setAddSlabFieldData({})
            setCreateTarrifFieldData({})
            setEditingSlab(false)
            setEditingFixedChargeId(undefined)
            setSlabs([])
            setFixedCharges([])
            handleChangeFixedCharge('fixedChargeType', '')
        } else {
            if (!action) return
            handleChangeAddTarrif('unitOrSlab', action.data.unitOrSlab)
            handleChangeAddTarrif('containsFixedCharges', action.data.containsFixedCharges)
            handleChangeAddSlab('isFinalSlab', false)
            handleChangeAddSlab('slabType', '')
            setAddSlabFieldData({})
            setEditingSlab(false)
            setEditingFixedChargeId(undefined)
            setSlabs(deepCopy(action.data.slabs))
            setFixedCharges(deepCopy(action.data.fixedCharges))
            setCreateTarrifFieldData({
                ...action.data
            })
            handleChangeFixedCharge('fixedChargeType', '')
        }
        dispatch({
            type: INIT_TABLE,
            payload: addNewSlabTableId
        })
        dispatch({
            type: INIT_TABLE,
            payload: addNewFixedChargeTableId
        })
    }, [isCreateTarrifOpen, isViewTarrifOpen, isDuplicateTarrifOpen, action])

    const isSlabInvalid = useCallback(() => {
        if (!addSlabFieldData.slabType) {
            return true
        }
        if (!addSlabFieldData.isFinalSlab) {
            if (!addSlabFieldData.slabLimit || isNaN(addSlabFieldData.slabLimit)) {
                return true
            }
            if (slabs.find(slab => slab.slabType === addSlabFieldData.slabType && slab.slabLimit === addSlabFieldData.slabLimit)) {
                return true
            }
        } else {
            if (slabs.find(slab => slab.slabType === addSlabFieldData.slabType && slab.slabLimit === -1)) {
                return true
            }
        }
        if (!addSlabFieldData.slabRate || !is6DigitDecimal(addSlabFieldData.slabRate)) {
            return true
        }
        if (addSlabFieldData.tax1 && !is6DigitDecimal(addSlabFieldData.tax1)) {
            return true
        }
        if (addSlabFieldData.tax2 && !is6DigitDecimal(addSlabFieldData.tax2)) {
            return true
        }
        if (addSlabFieldData.tax3 && !is6DigitDecimal(addSlabFieldData.tax3)) {
            return true
        }
        return false
    }, [addSlabFieldData, slabs])

    const handleAddNewSlab = useCallback(() => {
        console.log("num called times")
        if (isSlabInvalid()) {
            return
        }
        if (!editingSlab) {
            setSlabs((slabs: any) => {
                return [
                    ...slabs,
                    {
                        id: uuid(),
                        ...addSlabFieldData,
                        slabLimit: addSlabFieldData.isFinalSlab ? -1 : addSlabFieldData.slabLimit,
                    }
                ]
            })
            setAddSlabFieldData({slabType: addSlabFieldData.slabType})
            handleChangeAddSlab('slabType', addSlabFieldData.slabType)
            setEditingSlab(false)
        } else {
            setSlabs((slabs: any[]) => slabs.map(slab => {
                if (slab.id === editingSlab?.id) {
                    return {
                        ...addSlabFieldData
                    }
                }
                return slab
            }))
            setAddSlabFieldData({'slabType': addSlabFieldData.slabType})
            handleChangeAddSlab('slabType', addSlabFieldData.slabType)
            setEditingSlab(false)
        }
        dispatch({
            type: INIT_TABLE,
            payload: addNewSlabTableId
        })
    }, [addSlabFieldData, editingSlab, isSlabInvalid])

    const handleSlabEdit = useCallback((slab: any) => {
        const currentSlab = slabs.find(s => s.id === slab.id)
        setEditingSlab(currentSlab)
        setAddSlabFieldData(currentSlab)
        handleChangeAddSlab('slabType', currentSlab.slabType)
        dispatch({
            type: INIT_TABLE,
            payload: addNewSlabTableId
        })
    }, [slabs])

    const handleRemoveSlab = useCallback(() => {
        setSlabs((slabs: any[]) => slabs.filter(slab => slab.id !== editingSlab.id))
        setAddSlabFieldData({})
        setEditingSlab(false)
        setAddSlabFieldData({slabType: addSlabFieldData.slabType})
        handleChangeAddSlab('slabType', addSlabFieldData.slabType)
        dispatch({
            type: INIT_TABLE,
            payload: addNewSlabTableId
        })
    }, [editingSlab])

    useEffect(() => {
        console.log("slabs", slabs)
    }, [slabs])

    const apiReference = useCallback((_: any): Promise<any> => {
        let rows: any[] = JSON.parse(JSON.stringify(slabs))
        const slabType: any = {
            dG: 'DG',
            grid: 'Grid'
        }
        rows = [
            ...rows
                .filter((row: any) => row.slabType === "dG" && row.slabType !== "")
                .sort(({ slabLimit }: any, { slabLimit: slabLimit1 }: any) => slabLimit - slabLimit1)
                .filter(({ slabLimit }: any) => slabLimit !== -1),
            ...rows.filter((row: any) => row.slabType === "dG" && row.slabLimit === -1),
            ...rows
                .filter((row: any) => row.slabType === "grid" && row.slabType !== "")
                .sort(({ slabLimit }: any, { slabLimit: slabLimit1 }: any) => slabLimit - slabLimit1)
                .filter(({ slabLimit }: any) => slabLimit !== -1),
            ...rows.filter((row: any) => row.slabType === "grid" && row.slabLimit === -1),
        ]
        // const rowsCopy = JSON.parse(JSON.stringify(rows))
        rows = rows.map((row: any,) => {
            if (row.slabLimit === -1) {
                row.slabLimit = 'Final Slab'
            } else {
                // let lowerLimit = 0
                // if (rows?.[i-1]?.slabType === rows[i].slabType) {
                //     lowerLimit = rows[i-1].slabLimit
                // }
                row.slabLimit = ` ${row.slabLimit}`
            }
            row.slabType = slabType?.[row.slabType] ?? ""
            return row
        })

        return new Promise((resolve) => {
            resolve({
                columns: {
                    order: [
                        "slabType",
                        "slabLimit",
                        "slabRate",
                        "tax1",
                        "tax2",
                        "tax3",
                        "action"
                    ],
                    slabType: {
                        label: "Slab Type",
                        renderType: "text",
                    },
                    slabLimit: {
                        label: "Slab Limit",
                        renderType: "text",
                    },
                    slabRate: {
                        label: "Slab Rate",
                        renderType: "text",
                    },
                    tax1: {
                        label: "Tax-1%",
                        renderType: "text",
                    },
                    tax2: {
                        label: "Tax-2%",
                        renderType: "text",
                    },
                    tax3: {
                        label: "Tax-3%",
                        renderType: "text",
                    },
                    action: {
                        label: "Action",
                        renderType: "customComponent",
                        render: (row: any) => {
                            return (
                                <IconButton
                                    aria-label="edit-btn"
                                    onClick={() => handleSlabEdit(row)}
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
    }, [slabs])

    const fixedChargeApiReference = useCallback((_: any): Promise<any> => {
        let rows: any[] = JSON.parse(JSON.stringify(fixedCharges))
        rows = rows.map((row: any) => {
            row.fixedChargeType = INIT_FIXED_CHARGE_FIELDS
                .fixedChargeType
                .selectOptions
                .find((fc: any) => fc.value === row.fixedChargeType).description
            return row
        })

        return new Promise((resolve) => {
            resolve({
                columns: {
                    order: [
                        "chargeName",
                        "fixedChargeType",
                        "charge",
                        "tax1",
                        "tax2",
                        "tax3",
                        "action"
                    ],
                    chargeName: {
                        label: "Charge Name",
                        renderType: "text"
                    },
                    fixedChargeType: {
                        label: "Fixed Charge Type",
                        renderType: "text",
                    },
                    charge: {
                        label: "Charge",
                        renderType: "text",
                    },
                    tax1: {
                        label: "Tax-1%",
                        renderType: "text",
                    },
                    tax2: {
                        label: "Tax-2%",
                        renderType: "text",
                    },
                    tax3: {
                        label: "Tax-3%",
                        renderType: "text",
                    },
                    action: {
                        label: "Action",
                        renderType: "customComponent",
                        render: (row: any) => {
                            return (
                                <IconButton
                                    aria-label="edit-btn"
                                    onClick={() => {
                                        console.log(row)
                                        handleFixedChargeEdit(row.id)
                                    }}
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
    }, [fixedCharges])

    const handleChangeFixedCharge = (fieldId: string, value: any) => {
        if (fieldId === 'fixedChargeType') {
            setFixedChargeFields((fields: any) => {
                if (fields) {
                    const hide: boolean = !value || value === '-'
                    fields.chargeName.hide = hide
                    fields.charge.hide = hide
                    fields.tax1.hide = hide
                    fields.tax2.hide = hide
                    fields.tax3.hide = hide
                }
                return fields
            })
        }
        setFixedChargeFieldData((fieldData: any) => {
            return {
                ...fieldData,
                [fieldId]: value
            }
        })
    }

    const handleAddEditFixedCharge = useCallback(() => {
        if (!editingFixedChargeId) {
            setFixedCharges((rows: any[]) => {
                return [
                    ...rows,
                    {
                        id: uuid(),
                        ...fixedChargeFieldData
                    }
                ]     
            })
            setFixedChargeFieldData({'fixedChargeType': '-'})
            handleChangeFixedCharge('fixedChargeType', '-')
            console.log("creating")
        } else {
            setFixedCharges((rows: any[]) => {
                return rows.map(row => {
                    if (row.id === editingFixedChargeId) {
                        return {                     
                            ...fixedChargeFieldData,
                            chargeName: fixedChargeFieldData?.chargeName?.trim()
                        }
                    }
                    return row
                })
            })
            console.log("creating")
            setFixedChargeFieldData({'fixedChargeType': '-'})
            setEditingFixedChargeId(undefined)
            handleChangeFixedCharge('fixedChargeType', '-')
        }
        dispatch({
            type: INIT_TABLE,
            payload: addNewFixedChargeTableId
        })
    }, [editingFixedChargeId, fixedChargeFieldData])

    const handleFixedChargeEdit = useCallback((fixedChargeId: any) => {
        const currentFC = fixedCharges.find(s => s.id === fixedChargeId)
        setEditingFixedChargeId(fixedChargeId)
        setFixedChargeFieldData(currentFC)
        handleChangeFixedCharge('fixedChargeType', currentFC.fixedChargeType)
        dispatch({
            type: INIT_TABLE,
            payload: addNewFixedChargeTableId
        })
    }, [fixedCharges])

    const removeFixedCharge = useCallback(() => {
        setFixedCharges((rows: any[]) => {
            return rows.filter(row => row.id !== editingFixedChargeId)
        })
        setFixedChargeFieldData({'fixedChargeType': '-'})
        setEditingFixedChargeId(undefined)
        handleChangeFixedCharge('fixedChargeType', '-')
        dispatch({
            type: INIT_TABLE,
            payload: addNewFixedChargeTableId
        })
    }, [editingFixedChargeId])

    const is6DigitDecimal = (value: any) => {
        const val = String(value)
        const reg = new RegExp('^[0-9.]+$')
        if (!reg.test(val)) {
            return false
        }
        const pieces = val.split(".")
        const beforeDecimal = pieces?.[0] ?? ""
        const afterDecimal = pieces?.[1] ?? ""
        return afterDecimal.length <= 2 && beforeDecimal.length <= 6 && !isNaN(parseFloat(val))
    }

    const isInvalid = useCallback(() => {
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!createTarrifFieldData.tarrifName || re.test(createTarrifFieldData.tarrifName) || String(createTarrifFieldData?.tarrifName ?? "").length > 50) {
            return true
        }
        if (createTarrifFieldData.tarrifDescription && (re.test(createTarrifFieldData.tarrifDescription) || String(createTarrifFieldData?.tarrifDescription ?? "").length > 128)) {
            return true
        }
        if (createTarrifAction?.fields?.order?.includes("project")) {
            if (!createTarrifFieldData.project) {
                return true
            }
        }
        if (createTarrifFieldData.containsFixedCharges) {
            if (!createTarrifFieldData.fixedChargeDeductionTime) {
                return true
            }
            if (!createTarrifFieldData.fixedChargeCalculationType || createTarrifFieldData.fixedChargeCalculationType === '-') {
                return true
            }
        }
        if (!createTarrifFieldData.unitOrSlab || createTarrifFieldData.unitOrSlab === '-') {
            return true
        }
        if (createTarrifFieldData.unitOrSlab === 'unit') {
            if ((createTarrifFieldData.volumeUnitRate ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.volumeUnitRate)) {
                return true
            }
            // if ((createTarrifFieldData.gridUnitRate ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.gridUnitRate)) {
            //     return true
            // }
            if ((createTarrifFieldData.volumeUnitTax1 ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.volumeUnitTax1)) {
                return true
            }
            if ((createTarrifFieldData.volumeUnitTax2 ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.volumeUnitTax2)) {
                return true
            }
            if ((createTarrifFieldData.volumeUnitTax3 ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.volumeUnitTax3)) {
                return true
            }
            // if ((createTarrifFieldData.gridUnitTax1 ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.gridUnitTax1)) {
            //     return true
            // }
            // if ((createTarrifFieldData.gridUnitTax2 ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.gridUnitTax2)) {
            //     return true
            // }
            // if ((createTarrifFieldData.gridUnitTax3 ?? "").length === 0 || !is6DigitDecimal(createTarrifFieldData.gridUnitTax3)) {
            //     return true
            // }
        }
        return false
    }, [createTarrifFieldData, createTarrifAction?.fields])

    const validations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const re = /[^a-zA-Z0-9-_ ]/g
        const validationMap: Record<string, boolean> = {
            tarrifName: createTarrifFieldData.hasOwnProperty("tarrifName") && (re.test(createTarrifFieldData.tarrifName) || String(createTarrifFieldData?.tarrifName ?? "").length > 50),
            tarrifDescription: createTarrifFieldData.tarrifDescription && (re.test(createTarrifFieldData.tarrifDescription) || String(createTarrifFieldData?.tarrifDescription ?? "").length > 128),
            project: createTarrifFieldData.hasOwnProperty("project") && !createTarrifFieldData.project,
            unitOrSlab: createTarrifFieldData.hasOwnProperty("unitOrSlab") && createTarrifFieldData.unitOrSlab === '-',
            volumeUnitRate: createTarrifFieldData.volumeUnitRate && !is6DigitDecimal(createTarrifFieldData.volumeUnitRate),
            // gridUnitRate: createTarrifFieldData.gridUnitRate && !is6DigitDecimal(createTarrifFieldData.gridUnitRate),
            volumeUnitTax1: createTarrifFieldData.volumeUnitTax1 && !is6DigitDecimal(createTarrifFieldData.volumeUnitTax1),
            volumeUnitTax2: createTarrifFieldData.volumeUnitTax2 && !is6DigitDecimal(createTarrifFieldData.volumeUnitTax2),
            volumeUnitTax3: createTarrifFieldData.volumeUnitTax3 && !is6DigitDecimal(createTarrifFieldData.volumeUnitTax3),
            // gridUnitTax1: createTarrifFieldData.gridUnitTax1 && !is6DigitDecimal(createTarrifFieldData.gridUnitTax1),
            // gridUnitTax2: createTarrifFieldData.gridUnitTax2 && !is6DigitDecimal(createTarrifFieldData.gridUnitTax2),
            // gridUnitTax3: createTarrifFieldData.gridUnitTax3 && !is6DigitDecimal(createTarrifFieldData.gridUnitTax3),
            fixedChargeDeductionTime: createTarrifFieldData.containsFixedCharges && createTarrifFieldData.hasOwnProperty("fixedChargeDeductionTime") && !createTarrifFieldData.fixedChargeDeductionTime,
            fixedChargeCalculationType: createTarrifFieldData.containsFixedCharges && createTarrifFieldData.hasOwnProperty("fixedChargeCalculationType") && createTarrifFieldData.fixedChargeCalculationType === '-'
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
              case "tarrifName":
                errorMessage = "Only AlphaNumerics Allowed with '-' and '_' (MAX - 50 characters)";
                break;
              case "tarrifDescription":
                errorMessage = "Only AlphaNumerics Allowed with '-' and '_' (MAX - 128 characters)";
                break;
              case "project":
                errorMessage = "Invalid Project Name";
                break;
              case "unitOrSlab":
                errorMessage = "Invalid Tarriff Type";
                break;
              case "volumeUnitRate":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "volumeUnitTax1":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "volumeUnitTax2":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "volumeUnitTax3":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;

            case "gridUnitRate":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;

            case "gridUnitTax1":
            errorMessage = "Max - 6 digits required upto Two decimal places";
            break;
            case "gridUnitTax2":
            errorMessage = "Max - 6 digits required upto Two decimal places";
            break;
            case "gridUnitTax3":
            errorMessage = "Max - 6 digits required upto Two decimal places";
            break;

            case "fixedChargeDeductionTime":
            errorMessage = "Time is invalid";
            break;
            case "fixedChargeCalculationType":
            errorMessage = "Fixed Charge Calculation Type is Invalid";
            break;

              default:
                errorMessage = `Invalid input for ${fieldId}`;
                break;
            }
          }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [createTarrifFieldData])



    const slabValidations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const validationMap: Record<string, boolean> = {
            slabLimit: addSlabFieldData.slabLimit && !is6DigitDecimal(addSlabFieldData.slabLimit),
            slabRate: addSlabFieldData.slabRate && !is6DigitDecimal(addSlabFieldData.slabRate),
            tax1: addSlabFieldData.tax1 && !is6DigitDecimal(addSlabFieldData.tax1),
            tax2: addSlabFieldData.tax2 && !is6DigitDecimal(addSlabFieldData.tax2),
            tax3: addSlabFieldData.tax3 && !is6DigitDecimal(addSlabFieldData.tax3),
        }
        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
              case "slabLimit":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "slabRate":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "tax1":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "tax2":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "tax3":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              
              default:
                errorMessage = `Invalid input for ${fieldId}`;
                break;
            }
          }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [addSlabFieldData])



    const fixedChargeValidations = useCallback((fieldId: string) => {
        let isValid = true;
        let errorMessage = "";
        const re = /[^a-zA-Z0-9-_ ]/g
        const validationMap: Record<string, boolean> = {
            chargeName: fixedChargeFieldData.hasOwnProperty("chargeName") && re.test(fixedChargeFieldData.chargeName),
            charge: fixedChargeFieldData.hasOwnProperty("charge") && !is6DigitDecimal(fixedChargeFieldData.charge),
            tax1: fixedChargeFieldData.tax1 && !is6DigitDecimal(fixedChargeFieldData.tax1),
            tax2: fixedChargeFieldData.tax2 && !is6DigitDecimal(fixedChargeFieldData.tax2),
            tax3: fixedChargeFieldData.tax3 && !is6DigitDecimal(fixedChargeFieldData.tax3),
        }

        if (validationMap[fieldId]) {
            isValid = false;
            switch (fieldId) {
              case "chargeName":
                errorMessage = "Only AlphaNumerics Allowed with '-' and '_'";
                break;
              case "charge":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "tax1":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "tax2":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              case "tax3":
                errorMessage = "Max - 6 digits required upto Two decimal places";
                break;
              
              default:
                errorMessage = `Invalid input for ${fieldId}`;
                break;
            }
          }
        // return validationMap?.[fieldId] ?? false
        return { isValid, errorMessage };
    }, [fixedChargeFieldData])

    const isFixedChargeInvalid = useCallback(() => {
        const re = /[^a-zA-Z0-9-_ ]/g
        if (!fixedChargeFieldData.fixedChargeType) {
            return true
        }
        if (!fixedChargeFieldData.chargeName || re.test(fixedChargeFieldData.chargeName)) {
            return true
        }
        if (!fixedChargeFieldData.charge || !is6DigitDecimal(fixedChargeFieldData.charge)) {
            return true
        }
        if (addSlabFieldData.tax1 && !is6DigitDecimal(fixedChargeFieldData.tax1)) {
            return true
        }
        if (addSlabFieldData.tax2 && !is6DigitDecimal(fixedChargeFieldData.tax2)) {
            return true
        }
        if (fixedChargeFieldData.tax3 && !is6DigitDecimal(fixedChargeFieldData.tax3)) {
            return true
        }
        return false
    }, [fixedChargeFieldData])


    if (createTarrifAction)
        return (
            <ActionModal
                size="xl"
                key={createTarrifAction.id}
                label={createTarrifAction.label}
                onOk={handleAddTarrif}
                isOkDisabled={viewOnly || isInvalid()}
                actionModalId={action.id}>
                <FieldList
                    validations={validations}
                    onChange={handleChangeAddTarrif}
                    data={createTarrifFieldData}
                    fields={convertObjectToList(createTarrifAction.fields)} />
                {createTarrifFieldData?.containsFixedCharges &&
                    <>
                        <Divider />
                        <div className="p-3" style={{ backgroundColor: "#fafafa" }}>
                            {!viewOnly &&
                            <>
                                <FieldList
                                    validations={fixedChargeValidations}
                                    onChange={handleChangeFixedCharge}
                                    data={fixedChargeFieldData}
                                    fields={convertObjectToList(fixedChargeFields)}/>
                                <Button
                                    bgColor={Colors.primary}
                                    color={Colors.primaryNegative}
                                    size="sm"
                                    className="ms-3"
                                    disabled={isFixedChargeInvalid()}
                                    onClick={handleAddEditFixedCharge}
                                >
                                    {editingFixedChargeId ? 'Edit' : 'Add New'} Fixed Charge
                                </Button>
                                {editingFixedChargeId &&
                                    <Button
                                        bgColor="red"
                                        color={Colors.primaryNegative}
                                        size="sm"
                                        className="ms-1"
                                        onClick={removeFixedCharge}
                                    >
                                        Remove Fixed Charge
                                    </Button>
                                }
                            </>}
                            <div className="p-3">
                                {fixedCharges.length === 0 &&
                                !viewOnly &&
                                    <>
                                        <h3 className="pt-2">No Fixed Charges Added...</h3>
                                        <p>Click On "Add New Fixed Charge" Button To Create A New Slab</p>
                                    </>
                                }
                                {fixedCharges.length !== 0 &&
                                    <Table
                                        tableId={addNewFixedChargeTableId}
                                        defaultFilters={{
                                            perPage: 5,
                                            currPage: 1
                                        }}
                                        noFooter={true}
                                        apiReference={fixedChargeApiReference} />}
                            </div>
                        </div>
                        <Divider />
                    </>}
                <FieldList
                    validations={validations}
                    onChange={handleChangeAddTarrif}
                    data={createTarrifFieldData}
                    fields={convertObjectToList(createTarrifAction.slabFields)} />
                {createTarrifFieldData.unitOrSlab === 'slab' &&
                    <>
                        <Divider />
                        <div className="p-3" style={{ backgroundColor: "#fafafa" }}>
                            {!viewOnly && <>
                                <h4 className="ms-3">{editingSlab ? 'Edit' : 'Add'} Slab</h4>
                                <FieldList
                                    validations={slabValidations}
                                    onChange={handleChangeAddSlab}
                                    data={addSlabFieldData}
                                    fields={convertObjectToList(addSlabFields)}
                                />
                                <Button
                                    disabled={isSlabInvalid()}
                                    bgColor={Colors.primary}
                                    color={Colors.primaryNegative}
                                    size="sm"
                                    className="ms-3"
                                    onClick={handleAddNewSlab}
                                >
                                    {editingSlab?.id ? 'Edit' : 'Add New'} Slab
                                </Button>
                                {editingSlab &&
                                    <Button
                                        bgColor="red"
                                        color={Colors.primaryNegative}
                                        size="sm"
                                        className="ms-1"
                                        onClick={handleRemoveSlab}
                                    >
                                        Remove Slab
                                    </Button>
                                }
                            </>}
                            <div className="p-3">
                                {slabs.length === 0 &&
                                !viewOnly &&
                                    <>
                                        <h3>No Slabs Added...</h3>
                                        <p>Click On "Add New Slab" Button To Create A New Slab</p>
                                    </>
                                }
                                {slabs.length !== 0 &&
                                    <Table
                                        tableId={addNewSlabTableId}
                                        defaultFilters={{
                                            perPage: 5,
                                            currPage: 1
                                        }}
                                        noFooter={true}
                                        apiReference={apiReference} />}
                            </div>
                        </div>
                        <Divider />
                    </>}
            </ActionModal>
        )
    return <></>
}

export default CreateTarrifAction