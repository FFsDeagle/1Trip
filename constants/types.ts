export interface LoginProps {
    userName: string,
    password: string,
}

export interface WidgetGridItemProps {
    component: React.ElementType,
    title: string,
    icon: string,
    size: number,
    iconColor: string,
}

export interface SearchBarProp {
    componentToRender: string,
    inputValue?: string
}