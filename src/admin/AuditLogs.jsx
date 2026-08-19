import { useMemo, useState } from 'react';
import './AuditLogs.css';
import {
    getAuditLogs,
    clearAuditLogs,
} from '../utils/auditLogger';

function AuditLogs() {
    const [logs, setLogs] = useState(() => getAuditLogs());

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');

    const categories = useMemo(() => {
        return [
            'All',
            ...new Set(
                logs
                    .map((log) => log.category)
                    .filter(Boolean)
            ),
        ];
    }, [logs]);

    const roles = useMemo(() => {
        return [
            'All',
            ...new Set(
                logs
                    .map((log) => log.role)
                    .filter(Boolean)
            ),
        ];
    }, [logs]);

    const filteredLogs = useMemo(() => {
        const query = search.trim().toLowerCase();

        return logs.filter((log) => {
            const matchesSearch =
                !query ||
                log.user?.toLowerCase().includes(query) ||
                log.action?.toLowerCase().includes(query) ||
                log.target?.toLowerCase().includes(query) ||
                log.description?.toLowerCase().includes(query);

            const matchesCategory =
                categoryFilter === 'All' ||
                log.category === categoryFilter;

            const matchesRole =
                roleFilter === 'All' ||
                log.role === roleFilter;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesRole
            );
        });
    }, [logs, search, categoryFilter, roleFilter]);

    const handleClearLogs = () => {
        const confirmed = window.confirm(
            'Are you sure you want to permanently clear all audit logs?'
        );

        if (!confirmed) {
            return;
        }

        clearAuditLogs();
        setLogs([]);
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) {
            return 'Unknown';
        }

        const date = new Date(timestamp);

        if (Number.isNaN(date.getTime())) {
            return 'Unknown';
        }

        return date.toLocaleString();
    };

    return (
        <div className="audit-logs">

            {/* HEADER */}

            <div className="audit-logs-header">
                <div>
                    <h1>Audit Logs</h1>
                    <p>
                        Review administrative activity and
                        system changes.
                    </p>
                </div>

                <button
                    type="button"
                    className="audit-clear-button"
                    onClick={handleClearLogs}
                    disabled={logs.length === 0}
                >
                    Clear Logs
                </button>
            </div>

            {/* FILTERS */}

            <div className="audit-filters">

                <input
                    type="text"
                    placeholder="Search audit logs..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <select
                    value={categoryFilter}
                    onChange={(event) =>
                        setCategoryFilter(event.target.value)
                    }
                >
                    {categories.map((category) => (
                        <option
                            key={category}
                            value={category}
                        >
                            {category === 'All'
                                ? 'All Categories'
                                : category}
                        </option>
                    ))}
                </select>

                <select
                    value={roleFilter}
                    onChange={(event) =>
                        setRoleFilter(event.target.value)
                    }
                >
                    {roles.map((role) => (
                        <option
                            key={role}
                            value={role}
                        >
                            {role === 'All'
                                ? 'All Roles'
                                : role}
                        </option>
                    ))}
                </select>

            </div>

            {/* SUMMARY */}

            <div className="audit-summary">
                <strong>{filteredLogs.length}</strong>
                <span>
                    {filteredLogs.length === 1
                        ? 'audit event'
                        : 'audit events'}
                </span>
            </div>

            {/* TABLE */}

            <div className="audit-table-wrapper">

                <table className="audit-table">

                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Category</th>
                            <th>Action</th>
                            <th>Target</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredLogs.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="audit-empty"
                                >
                                    No audit logs found.
                                </td>
                            </tr>
                        ) : (
                            filteredLogs.map((log) => (
                                <tr key={log.id}>

                                    <td>
                                        {formatTimestamp(
                                            log.timestamp
                                        )}
                                    </td>

                                    <td>
                                        <strong>
                                            {log.user}
                                        </strong>
                                    </td>

                                    <td>
                                        <span className="audit-role">
                                            {log.role}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="audit-category">
                                            {log.category}
                                        </span>
                                    </td>

                                    <td>
                                        <strong>
                                            {log.action}
                                        </strong>
                                    </td>

                                    <td>
                                        {log.target || '—'}
                                    </td>

                                    <td>
                                        {log.description || '—'}
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AuditLogs;