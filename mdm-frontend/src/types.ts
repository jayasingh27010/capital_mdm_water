export type Action = {
    type: string,
    payload?: any
}

export type TableState = {
    selections: never[];
    isLoaded: boolean;
    isLoading: boolean;
    totalRecords: number;
    filters: any;
}

export type AppContextType = {
    isLoading: boolean;
    isLoaded: boolean;
    isLoggedIn: boolean;
    isMenuRendered: boolean;
    userInfo: any;
    forceNavigate: boolean;
    forceNavigationPath: string;
    menuItems: any[];
    breadcrumbs: any[];
    openActionModals: any;
    actionModalData: any;
    breadCrumbLoaded: boolean;
    tables: Record<string, TableState>;
    appbarIcon: string,
    connection_error:Boolean,
}

export type Field = {
    id: string;
    label: string;
    columnSize?: number;
    inputType?: string;
    formatType?: string;
    required?: boolean;
    isSingleLineInput?: boolean;
    numDigits?: number;
    disabled?: boolean;
    defaultOption?: any;
    maxLength?: number;
    selectOptions?: SelectOption[];
    isAutocomplete?: boolean;
    hide?: boolean;
    // errorMessage?:string;
}

export type SelectOption = {
    value: string;
    description: string
}

export type FieldObject = {
    order: string[];
    [key: string]: any
}

export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    pageComponent?: any;
    path?: string;
    hide?: boolean;
}

export type ResendOTPTimerBtnProps = {
    isLoading: boolean,
    initTimeDiff: number,
    onClick: () => void
}
  
export type Meter = {
    id: string;
    meterSerialNo: {
        label: string;
        link: string;
    };
    project: {
        label: string;
        link: string;
    };
    consumer: {
        label: string;
        link: string;
    };
    moduleNo: string;
    phaseType: string;
    sourceType: string;
    consumptionType: string;
}

export type meterRechargeData = {
    paymentType: string;      
    transactionId: string | null; 
    checqueNo: string | null;
    checqueDate: string | null;
    bankName: string | null;  
    amount: number;         
    availableBalance: number; 
    comment: string;         
    venderCode: string;      
    createdAt: string;       
}

export type Month ={
    value: string;
    label: string;
}


export type ConsumptionData = {
    day: string;
    value: number;
}


export type yearlyConsumption = {
    month_name: string;
    dgReading: number;
    ebReading:number
}

export type monthlyConsumption = {
    week: string;
    dgReading: number;
    ebReading:number
}
export type dailyConsumption = {
    day: string;
    dgReading: number;
    ebReading:number
}

export type graphData = {
    dailyData: dailyConsumption[];
    weeklyData: monthlyConsumption[];
    monthlyData: yearlyConsumption[],  
}






  