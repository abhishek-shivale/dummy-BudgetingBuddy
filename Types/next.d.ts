import "next-auth"

declare module "next-auth/jwt" {
    interface JWT {
        isVerified: boolean
        id :string
        image :string
    }
}
declare module "next-auth" {
    interface User {
        isVerified: boolean
        image :string

    }
    interface Session {
        user: {
            isVerified: boolean
            id: string
        image :string

        }
    }

}