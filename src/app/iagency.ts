import { ICfrReferenceHierarchy } from "./iecfrcorrections"

export interface IAgency {
    name: string,
    short_name: string,
    display_name: string,
    sortable_name: string,
    slug: string,
    children: IAgency[],
    cfr_references: ICfrReferenceHierarchy[]
}
