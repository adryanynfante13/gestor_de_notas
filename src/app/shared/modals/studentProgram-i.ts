import { ProgramI } from "./program-i";
import { UserI } from "./user-i";

export interface StudentProgramI {
    program: ProgramI;
    user: UserI;
    average: number;
  }