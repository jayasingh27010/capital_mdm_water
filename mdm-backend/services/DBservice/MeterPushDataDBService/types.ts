export type MeterPushDataDBDTO = {
    id: string; 
    meterId: string; 
    meterSerialNo: string; 
    projectId: string; 
    projectName: string; 
    powerFactor: string; 
    cumulativeWh: string; 
    cumulativeVah: string; 
    overloadStatus: string; 
    receiveTime: string; 
    consumption_type: string; 
    cumulative_vah_genset: string; 
    cumulative_vah_grid: string; 
    cumulative_wh_genset: string; 
    cumulative_wh_grid: string; 
    dg_enable_disable: string; 
    energy_source_id: string; 
    grid_enable_disable: string; 
    master_cutoff_status: string; 
    md_kva_dg_current_mth: string; 
    md_kva_grid_current_mth: string; 
    md_kw_dg_current_mth: string; 
    md_kw_grid_current_mth: string; 
    meter_consumption: string; 
    meter_balance_dg: string; 
    meter_balance_grid: string; 
    overload_status: string; 
    overload_threshold_for_dg: string; 
    overload_threshold_for_grid: string; 
    push_interval_in_minute: string; 
    total_active_power: string; 
    total_apparent_power: string;
}