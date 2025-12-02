export interface IAuthProvider {
    sign(payload: object): string
    verify(token: string): object | null
}