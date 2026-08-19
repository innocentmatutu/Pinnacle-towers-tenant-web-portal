const AUDIT_LOGS_KEY = 'admin_audit_logs';

export function logAudit({
    action,
    category,
    target = '',
    description = '',
}) {
    try {
        const sessionString = localStorage.getItem('user');

        let user = {};

        if (sessionString) {
            try {
                user = JSON.parse(sessionString);
            } catch {
                user = {};
            }
        }

        const existingLogs = localStorage.getItem(AUDIT_LOGS_KEY);

        let logs = [];

        if (existingLogs) {
            try {
                logs = JSON.parse(existingLogs);
            } catch {
                logs = [];
            }
        }

        const newLog = {
            id: `LOG-${Date.now()}`,
            timestamp: new Date().toISOString(),
            user: user.username || 'Unknown',
            role: user.role || 'Unknown',
            action,
            category,
            target,
            description,
        };

        localStorage.setItem(
            AUDIT_LOGS_KEY,
            JSON.stringify([newLog, ...logs])
        );

        return newLog;
    } catch (error) {
        console.error('Failed to create audit log:', error);
        return null;
    }
}

export function getAuditLogs() {
    try {
        const savedLogs = localStorage.getItem(AUDIT_LOGS_KEY);

        if (!savedLogs) {
            return [];
        }

        const logs = JSON.parse(savedLogs);

        return Array.isArray(logs) ? logs : [];
    } catch (error) {
        console.error('Failed to load audit logs:', error);
        return [];
    }
}

export function clearAuditLogs() {
    localStorage.removeItem(AUDIT_LOGS_KEY);
}