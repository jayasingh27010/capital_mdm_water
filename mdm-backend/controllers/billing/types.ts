type Tarrif = {
    tarrif_type: number;
    tarrif_group: string;
    slabs: Slab[];
}

type Slab = {
    rate: number; //applied with tax1 tax2 tax3
    range: number;
}

export type BillingRequestDTORow = {
    Meter_s_no: string
    grid_current_kwh: number
    grid_current_kvah: number
    dg_current_kwh: number
    dg_current_kvah: number

    grid_opening_month_kwh: number
    grid_opening_month_kvah: number
    dg_opening_month_kwh: number
    dg_opening_month_kvah: number

    grid_previous_calculated_kwh: number
    grid_previous_calculated_kvah: number
    dg_previous_calculated_kwh: number
    dg_previous_calculated_kvah: number

    grid_previous_reading_kwh: number
    grid_previous_reading_kvah: number
    dg_previous_reading_kwh: number
    dg_previous_reading_kvah: number

    opening_balance: number
    current_balance: number

    meter_status: string
    Current_Load: number
    DG_enable_disable: boolean

    billing_type: string
    tarrif_group: string
}