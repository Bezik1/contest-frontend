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

export interface Response<T> {
    status: string;
    message: string;
    data: T
}

export interface ParentCompProps {
    childComp?: React.ReactNode;
  }