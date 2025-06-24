export type PasswordForgottenPayload = {
    email: string;
};

export type PasswordResetPayload = {
    password: string;
    confirm: string;
};

export type PasswordUpdatePayload = {
    current: string;
    password: string;
    confirm: string;
};
