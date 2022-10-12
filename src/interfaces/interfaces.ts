export interface Data<T> {
    data: Response<T>
}

interface Comment {
    from: string;
    content: string;
    opinion: boolean;
}

export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    comments: Comment[]
}

export interface Announcement {
    from: string;
    content: string
}

export interface Response<T> {
    status: string;
    message: string;
    data: T
}

export interface ParentCompProps {
    childComp?: React.ReactNode;
}

export interface CityProps {
    logged?: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setCurrentComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export interface NavbarProps {
    componentName: string;
    logged: boolean;
    currentComponent: React.ReactNode
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setCurrentComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}