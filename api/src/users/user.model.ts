export class User {
    constructor(
        public id: string,
        public chats: any[],
        public contacts: { id: string; name: string }[]
    ) {}
}
