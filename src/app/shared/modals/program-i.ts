import { CourseI } from "./course-i";

export interface ProgramI {
    id: string,
    name: string,
    description: string,
    duration: number,
    startDate: Date,
    finishDate: Date,
    //courses: [CourseI]
}