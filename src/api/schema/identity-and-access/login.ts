export type LoginPayload = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    refresh_token: string;
};

export type RefreshTokenPayload = {
    refresh_token: string;
};

export type RefreshTokenResponse = {
    token: string;
};
