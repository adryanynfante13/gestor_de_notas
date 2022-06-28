import { CourseI } from "./course-i";

export interface ProgramI {
    name: string,
    description: string,
    duration: number,
    startDate: Date,
    finishDate: string,
    courses: [CourseI | null]
}