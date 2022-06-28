import { ModuleI } from './module-i';

export interface CourseI {
    name: string,
    average: number,
    modules: [ModuleI | null]
}