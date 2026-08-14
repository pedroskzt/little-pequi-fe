interface IAlert {
    severity: 'success' | 'error' | 'info';
    message: string;
    open: boolean;
}

export default IAlert;