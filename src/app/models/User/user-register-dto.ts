interface UserRegisterDTO {
    // role: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export interface StudentRegisterDTO extends UserRegisterDTO {
    birthdate: Date;
    gender: string;
    nationality: string;
    parentNationalId: string;
}

export interface ParentRegisterDTO extends UserRegisterDTO {
    address: Date;
    phonenumber: string;
    nationalId: string;
}

