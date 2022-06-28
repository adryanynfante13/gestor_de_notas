import { ProgramI } from './program-i';
export interface FullProgramI {
    id: string | undefined,
    program: ProgramI,
    students: []
}