
class AuthService {

    /**
     * @description Create a user
     * @param {object} data
     * @returns {object}
     */

    static async signUp (data: any) {
        return data
    }

   static async login (data: any) {
    return data
   }

   static async verifyEmail(hash: string){
        return hash

   }

   static async generatePasswordResetToken(email: string) {

    return email
   }
   /**
    * Verify Password Reset Token
    * @param {*} hash 
    * @returns 
    */
   static async verifyPasswordResetToken(hash: string){
    return hash
   }

   /**
    * Verify Password Reset Token
    * @param {*} hash 
    * @returns 
    */
    static async resetPassword(hash: string, password: string){
        return 'something'
    }
}
export default AuthService
