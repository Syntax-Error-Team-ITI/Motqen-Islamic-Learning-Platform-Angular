interface UserRegisterDTO {
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

export interface AddTeacherDTO extends UserRegisterDTO {
    gender: Date;
    age: string;
}

export interface UserResetPasswordDTO {
    userId: string;
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}

