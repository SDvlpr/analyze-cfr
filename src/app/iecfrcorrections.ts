export interface IEcfrcorrections {
    id: number,
    cfr_references: ICfrReference[],
    corrective_action: string,
    error_corrected: Date,
    error_occurred: Date,
    fr_citation: string,
    position: number,
    display_in_toc: boolean,
    title: number,
    year: number,
    last_modified: Date
}
export interface ICfrReference {
    cfr_reference: string,
    hierarchy: ICfrReferenceHierarchy
}

export interface ICfrReferenceHierarchy {
        title: number,
        subtitle: string,
        chapter: string,
        part: number,
        subpart: string,
        subject_group: string,
        section: number
}