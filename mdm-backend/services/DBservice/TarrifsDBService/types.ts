export type slab = {
    id: string,
    slabType: "dG" | "grid",
    slabLimit: string,
    slabRate: string,
    tax1: string,
    tax2: string,
    tax3: string
}

export type fixedCharge = {
    id: string,
    fixedChargeType: "areaSqft" | "fixed" | "sanctionedLoad",
    chargeName: string,
    charge: Number,
    tax1: Number,
    tax2: Number,
    tax3: Number
}

export type TarrifDBDTO = {
    id: string,
    tarrifName: string,
    tarrifDescription: string,
    projectId: string,
    projectName: string,
    tarrifGroupId: string,
    tarrifGroupName: string,
    containsFixedCharges: boolean,
    unitOrSlab: string, // "unit" | "slab" 
    dGUnitRate?: string,
    dGUnitTax1?: string,
    dGUnitTax2?: string,
    dGUnitTax3?: string,
    gridUnitRate?: string,
    gridUnitTax1?: string,
    gridUnitTax2?: string,
    gridUnitTax3?: string,
    slabs: slab[],
    fixedCharges: fixedCharge[],
    createdAt: string
}

export type TarrifGroupDBDTO = {
    id: string,
    tarrifGroupName: string,
    tarrifGroupDescription: string,
    projectId: string,
    projectName: string,
    tarrifId: string,
    tarrifName: string,
    createdAt: string
}