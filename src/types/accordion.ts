export interface ProbaData {
    a: number[];
    b: number[];
    c: number[];
    [key: string]: number[];
}

export interface UserData {
    email: string;
    firstProba: ProbaData;
    name: string;
    secondProba: ProbaData;
    zeroProba: ProbaData;
    roles: string[];
    sex: string,
    picture?: string,
    isGuideComplete: boolean,
}

export interface Step {
    title: string;
    data: { section: string; items: string[] }[];
    checked: ProbaData;
    probaType: string;
}

export type Props = {
    item: {
        section: string;
        items: string[];
        checked: number[];
        probaType: string;
    };
    currentProbaEmail: string;
    currentStep: string;

};

export type ScoutProps = {
    item: {
        section: string;
        items: string[];
        checked: number[];
        probaType: string;
    };
    currentProbaEmail: string;
    currentStep: string;
};