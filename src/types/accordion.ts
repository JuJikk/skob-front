export interface ProbaData {
    a: number[];
    b: number[];
    c: number[];
    [key: string]: number[];
}

export interface UserData {
    __v: number;
    _id: string;
    createdAt: string;
    email: string;
    firstProba: ProbaData;
    name: string;
    ownerEmail: string;
    secondProba: ProbaData;
    zeroProba: ProbaData;
}

export interface Step {
    title: string;
    data: { section: string; items: string[] }[];
    checked: ProbaData;
}