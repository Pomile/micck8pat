import { Request, Response } from "express";
// import ValidationRes from "../../common/eValidatorResult";
import AuthService from "./auth.service";
const { FRONTEND_BASE_URL } = process.env;
class AuthController{

    /**
     * @description User sign up
     * @param {object} req 
     * @param {object} res 
     */
    static async signUp (req: Request, res: Response) {
         
        const data = req.body;
        const user = await AuthService.signUp(data);
        return res.status(200).json({
            success: true,
            message: 'signed up successfully',
            user
        })
    }

    /**
     * @description User sign up
     * @param {object} req 
     * @param {object} res 
     */
     static async login (req: Request, res: Response) {
        // validateResult(req, res);
        const cred = req.body;
        const data = await AuthService.login(cred);
        return res.status(200).json({
            success: true,
            data
        })
    }

    /**
     * @description Confirm Email
     * @param {object} req 
     * @param {object} res 
     */
    static async confirmEmail(req: Request, res: Response) {
        //  validateResult(req, res);
        const token = req.body.token;
        const message = await AuthService.verifyEmail(token);
        return res.status(200).json({
            success: true,
            message
        })
    }

    /**
     * @description Confirm Email
     * @param {object} req 
     * @param {object} res 
     */
     static async generatePasswordResetToken(req: Request, res: Response) {
        //  validateResult(req, res);
        const email = req.body.email;
        const message = await AuthService.generatePasswordResetToken(email);
        return res.status(200).json({
            success: true,
            message
        })
    }

    /**
     * @description Verify Password Token
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async verifyPasswordResetToken(req: Request, res: Response) {
        //  validateResult(req, res);
        const token = req.body.token;
        const message = await AuthService.verifyPasswordResetToken(token);
        return res.status(200).json({
            success: true,
            message
        })
    }

    /**
     * @description Reset Password
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async resetPassword(req: Request, res: Response) {
        //  validateResult(req, res);
        const tok = req.body.token;
        const password = req.body.password;
        const message = await AuthService.resetPassword(tok, password);
        return res.status(200).json({
            success: true,
            message
        })
    }
}

export default AuthController;