export class Menu {
    name: string;
    actions: Action[];
}
export class Action {
    ActionType: string;
    HttpType: string;
    Definition: string;
    Code: string;
}