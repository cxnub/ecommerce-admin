interface userData {
    id? : number;
    email? : string;
    username? : string;
}

class UserEntity {
    id? : number;
    email? : string;
    username? : string;

    constructor(private data: userData) {
        this.id = data.id;
        this.email = data.email;
        this.username = data.username
    }

    toObject(): userData {
        return this.data;
    }

    isEmpty(): boolean {
        return !this.id;
    }
}

export type { userData };
export { UserEntity };
