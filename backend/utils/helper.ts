export const sendError = (res: any, status: number, error: string) => {
    return res.status(status).json({ message: error, success: false });
}

